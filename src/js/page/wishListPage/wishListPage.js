/*-----------------------------------*\
  마이 페이지 - 찜하기 페이지 / 찜한 상품 페이지 #wishList js
\*-----------------------------------*/

import { $ } from '../../utils/dom.js';
import { renderPage } from '../../utils/render.js';
import { shoppingCart, hearted } from '../../importIMGFiles.js';
import { storeCart } from '../productDetail/productDetail.js';
import { wishListStore } from '../../store/wishListStore.js';
import { shoppingCartStore } from '../../store/shoppingCartStore.js';
import { htmlMypage_Nav, resetNavbarActive } from '../mypage.js';
import { router } from '../../main.js';
import { countQtyInCart } from '../mainPage/mainPage.js';

/** 찜한상품 제목, ul 태그 템플릿 삽입 */
const handleWishListInitTemplate = () => {
  const renderWishListPageInitTemplate = `
    <div class="mypage__wishlist">
      <div class="mypage__wishlist--container">
        <h3>찜한 상품</h3>
        <ul class="wishlist__product--lists"></ul>
        <div class="wishList__pagination--btnsContainer"></div>
      </div>
    </div>
`;

  $('.mypage__navigo__container').innerHTML = renderWishListPageInitTemplate;
};

/** ul 태그에 찜한 제품 li 삽입, */
const renderWishListProductList = (store) => {
  console.log(store);
  const wishListProductListTemplate = store
    .map((item) => {
      const { id, pricePerOne, thumbnail, title } = item;
      console.log(pricePerOne);

      return `
    <li class="wishlist__product--list" data-product-id="${id}">
      <div class="wishlist__product--list-container">
        <img src="${thumbnail}" alt="${title}" />
        <div class="wishlist__product--info">
          <h4 class="wishlist__product--info-desc">
            <a
              href="/product/${id}"
              data-navigo
              class="wishlist__product--info-title"
            >
              ${title}
            </a>
            <div class="wishlist__product--info-price">
              ${pricePerOne.toLocaleString()} 원
            </div>
          </h4>
        </div>
      </div>
      <div class="wishlist__product--list-AddRemoveBtn">
        <button
          class="wishlist__product--list-removeFromWishListBtn removeFromWishListBtn"
        >
          삭제
        </button>
        <button class="wishlist__product--list-AddToCartBtn wishList-AddToCartBtn">
          <img src="${shoppingCart}" alt="shopping cart" />
          담기
        </button>
      </div>
    </li>
    `;
    })
    .join('');

  $('.wishlist__product--lists').innerHTML = wishListProductListTemplate;
};

/** 찜하기 목록이 비어있을 때 템플릿 */
const handleEmptyWishlistInit = () => {
  const emptyWishlistTemplate = `
  <div class="cart__empty">
    <img src="${hearted}" alt="빈 장바구니" />
    <h3>찜하기 목록이 비었습니다.</h3>
    <a href="/category/keyboards">쇼핑하러 가기</a>
  </div>
  `;
  $('.app').querySelector('.wishlist__product--lists').innerHTML =
    emptyWishlistTemplate;
};

/** 찜한 상품이 (없을 때 / 있을 때) 예외처리 후 렌더링 */
const renderWishListPage = () => {
  renderPage(htmlMypage_Nav);
  handleWishListInitTemplate();
  resetNavbarActive();
  setNavbacActive();
  if (wishListStore.getLocalStorage().length === 0) {
    handleEmptyWishlistInit();
    return;
  } else if (wishListStore.getLocalStorage().length >= 1) {
    // 장바구니에 넣은 상품 렌더링
    wishListUtilInit();
    // renderWishListProductList(wishListStore.getLocalStorage());
    return;
  }
};
const setNavbacActive = () => {
  const active = document.querySelector('#mpWishList');
  active.parentElement.classList.add('active');
};

/** [찜하기 페이지]에서 제품 제거 버튼 이벤트, 함수 */
$('.app').addEventListener('click', (e) => {
  let wishListArr = wishListStore.getLocalStorage();
  const id = e.target.closest('li')?.dataset.productId;
  if (e.target.classList.contains('removeFromWishListBtn')) {
    wishListArr = wishListArr.filter((item) => item.id !== id);
    console.log('removeItem from wishListArr', wishListArr);
    wishListStore.setLocalStorage(wishListArr);
    wishListUtilInit();
  }
});

/** [찜하기 페이지]에서 '카트에 담기' 버튼 클릭 시, 해당 제품을 장바구니에 저장  */
$('.app').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;
  let wishListArr = wishListStore.getLocalStorage();
  let shoppingCartArr = shoppingCartStore.getLocalStorage();
  if (e.target.classList.contains('wishList-AddToCartBtn')) {
    const wishListAddToCart = wishListArr.filter((item) => item.id === id);

    const wishListInfo = wishListAddToCart[0];
    storeCart(
      wishListInfo.id,
      wishListInfo.pricePerOne,
      wishListInfo.count,
      wishListInfo.thumbnail,
      wishListInfo.title,
      wishListInfo.pricePerOne,
    );
    shoppingCartStore.setLocalStorage(shoppingCartStore.getLocalStorage());
    countQtyInCart();
    console.log(shoppingCartStore.getLocalStorage());
  }
});

/** /mypage/wishlist 핸들링 함수 */
export const handleWishListPage = () => {
  renderWishListPage();
  // wishListUtilInit();
};

/*-----------------------------------*\
  #pagination
\*-----------------------------------*/

/** 처음 index = 0 */
let wishListUtilIndex = 0;
/** 페이지네이션 배열 초기화 = 0 */
let wishListUtilPages = [];

/** 주문내역 페이지 제품, 버튼 초기 렌더링 */
const wishListUtilSetupUI = () => {
  renderWishListProductList(wishListUtilPages[wishListUtilIndex]);
  wishListUtilDisplayButtons(
    $('.wishList__pagination--btnsContainer'),
    wishListUtilPages,
    wishListUtilIndex,
  );
};

/** 주문내역 페이지 초기 렌더링 시 ui, api 불러오는 함수 */
const wishListUtilInit = async () => {
  const wishListArr = wishListStore.getLocalStorage();
  wishListUtilPages = wishListUtilPaginate(wishListArr);

  wishListUtilSetupUI();
};

/** 주문내역 페이지 페이지네이션 1페이지 당 10개, slice 메서드로 배열에 삽입 */
const wishListUtilPaginate = (list) => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  const newList = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;

    return list.slice(start, start + itemsPerPage);
  });

  return newList;
};

/** 주문내역 페이지 페이지네이션 버튼 */
const wishListUtilDisplayButtons = (container, pages, activeIndex) => {
  let utilBtns = pages.map((_, pageIndex) => {
    return `
    <button class="wishList__pagination--btn ${
      activeIndex === pageIndex ? 'active-btn' : 'null'
    }" data-index="${pageIndex}">
      ${pageIndex + 1}
    </button>`;
  });

  utilBtns.push(`<button class="wishList__pagination--btn-next">다음</button>`);
  utilBtns.unshift(
    `<button class="wishList__pagination--btn-prev">이전</button>`,
  );
  container.innerHTML = utilBtns.join('');
};

/** prev, next, 페이지네이션 버튼 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  if (e.target.classList.contains('wishList__pagination--btnsContainer'))
    return;

  if (e.target.classList.contains('wishList__pagination--btn')) {
    wishListUtilIndex = Number(e.target.dataset.index);
    wishListUtilSetupUI();
  }

  if (e.target.classList.contains('wishList__pagination--btn-next')) {
    wishListUtilIndex++;
    if (wishListUtilIndex > wishListUtilPages.length - 1) {
      wishListUtilIndex = 0;
    }
    wishListUtilSetupUI();
  }
  if (e.target.classList.contains('wishList__pagination--btn-prev')) {
    wishListUtilIndex--;
    if (wishListUtilIndex < 0) {
      wishListUtilIndex = wishListUtilPages.length - 1;
    }
    wishListUtilSetupUI();
  }
});
