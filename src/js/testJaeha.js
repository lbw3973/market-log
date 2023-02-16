import Navigo from 'navigo';
const router = new Navigo('/');
const $ = (selector) => document.querySelector(selector);
import {
  air60,
  air75,
  halo65,
  halo75,
  halo96,
  halo96,
  air96,
  nufolio,
  twilight,
  xmas,
  addHeart,
  removeHeart,
  emptyHeart,
  shoppingCart,
  calendar,
  reload,
  exclamationmark,
  paginationLeft,
  paginationRight,
  chevronrightSVG,
  hearted,
} from './importIMGFiles.js';

/** Navigo innerHTML template */
const renderPage = (html) => {
  $('.app').innerHTML = html;
};

const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';
const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_Team3',
};

/** 전체 제품 가져오기api */
const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: {
        ...headers,
        masterKey: true,
      },
    });
    const data = await res.json();
    console.log('jaehaData', data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('제품 가져오기 실패');
  }
};

/*-----------------------------------*\
  #메인 페이지
\*-----------------------------------*/

/** 메인 페이지 초기 템플릿 */
const renderMainPageTemplate = `
<div class="mainPage">
  <div class="mainPage__container">
    <div class="mainPage__content">
      <div class="mainPage__hero">
        <a href="/category/keyboards">
          <img
            class="mainPage__hero--img"
            src="${halo96}"
            alt=""
          />
          <div class="mainPage__hero--info-container">
            <h2 class="mainPage__hero--title">Halo 96</h2>
            <div class="mainPage__hero--desc">Shortcut your 9 to 6</div>
            <button class="mainPage__hero--btn">BUY NOW</button>
          </div>
        </a>
      </div>
      <!-- Halo 75 -->
      <div class="mainPage__hero">
        <a href="/category/keyboards">
          <img
            class="mainPage__hero--img"
            src="${halo75}"
            alt=""
          />
          <div class="mainPage__hero--info-container">
            <h2 class="mainPage__hero--title">Halo 75</h2>
            <div class="mainPage__hero--desc">
              New heights, new lights, and new highlights
            </div>
            <button class="mainPage__hero--btn">BUY NOW</button>
          </div>
        </a>
      </div>

      <!-- Halo 65 -->
      <div class="mainPage__hero">
        <a href="/category/keyboards">
          <div class="mainPage__img-container">
            <img
              class="mainPage__hero--img"
              src="${halo65}"
              alt=""
            />
          </div>
          <div class="mainPage__hero--info-container">
            <h2 class="mainPage__hero--title">Halo 65</h2>
            <div class="mainPage__hero--desc">
              New heights, new lights, and new highlights
            </div>
            <button class="mainPage__hero--btn">BUY NOW</button>
          </div>
        </a>
      </div>

      <!-- Air 60 -->
      <div class="mainPage__hero">
        <a href="/category/keyboards">
          <div class="mainPage__img-container">
            <img
              class="mainPage__hero--img"
              src="${air60}"
              alt=""
            />
          </div>
          <div class="mainPage__hero--info-container">
            <h2 class="mainPage__hero--title">Air 60</h2>
            <div class="mainPage__hero--desc">
              Revolutionizing the laptop experience
            </div>
            <button class="mainPage__hero--btn">BUY NOW</button>
          </div>
        </a>
      </div>

      <!-- Air 75 -->
      <div class="mainPage__hero">
        <a href="/category/keyboards">
          <div class="mainPage__img-container">
            <img
              class="mainPage__hero--img"
              src="${air75}"
              alt=""
            />
          </div>
          <div class="mainPage__hero--info-container">
            <h2 class="mainPage__hero--title">Air 75</h2>
            <div class="mainPage__hero--desc">
              The world's thinnest mechanical keyboard
            </div>
            <button class="mainPage__hero--btn">BUY NOW</button>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
`;
// renderPage(renderMainPageTemplate);

/*-----------------------------------*\
  #카테고리 페이지 # category js
\*-----------------------------------*/

/** 카테고리 페이지 초기 템플릿 */
const renderInitCategoryPage = `
  <div class="categoryPage">
    <div class="categoryPage__container">
      <!-- aside -->
      <aside class="categoryPage__aside">
        <div class="categoryPage__aside--container categoryPageSwiper">
          <div class="categoryPage__aside--wrapper swiper-wrapper">
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${halo96}" alt="" />
            </div>
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${halo75}" alt="" />
            </div>
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${air96}" alt="" />
            </div>
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${nufolio}" alt="" />
            </div>
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${twilight}" alt="" />
            </div>
            <div class="categoryPage__aside--img swiper-slide">
              <img src="${xmas}" alt="" />
            </div>
          </div>
        </div>
        <div class="categoryPage-pagination"></div>
      </aside>
      <!-- category main -->
      <div class="categoryPage__main">
        <div class="categoryPage__main--container">
          <div class="categoryPage__main--filter">
            <div class="categoryPage__main--filter-totalQty"></div>
            <div class="categoryPage__main--filter-sort">
              <select class="categoryPage__main--filter-select" id="categoryPage-filterByPrice">
                <option selected value="reset">정렬</option>
                <option value="LowToHigh">낮은 가격 순</option>
                <option value="HighToLow">높은 가격 순</option>
              </select>
            </div>
          </div>
        </div>
        <ul class="categoryPage__product--lists"></ul>
      </div>
    </div>
  </div>
`;

/** 카테고리 페이지 제품 db에서 불러오기 */

const renderCategoryProductList = (items) => {
  const categoryProductListTemplate = items
    .map((item) => {
      const { id, price, thumbnail, title, tags } = item;

      return `
    <li class="categoryPage__product--list" data-product-id="${id}" data-category-tag="${tags}">
      <a href="/product/${id}">
        <div class="categoryPage__product--img">
          <img src="${thumbnail}" alt="${title}" />
        </div>
        <div class="categoryPage__product--info">
          <h3 class="categoryPage__product--info-title">
            ${title}
          </h3>
          <span class="categoryPage__product--info-price">
            ${price.toLocaleString()} 원
          </span>
        </div>
      </a>
    </li>
    `;
    })
    .join('');

  $('.categoryPage__product--lists').innerHTML = categoryProductListTemplate;
};

/** 카테고리 태그 필터링 함수 */
const getProductTags = async () => {
  const allProductArray = await getAllProducts();
  // const allTags = allProductArray.map((items) => {
  //   return items.tags;
  // });
  const filterKeyboardTag = allProductArray.filter((item) => {
    return item.tags[0] === '키보드';
  });

  const filterKeycapTag = allProductArray.filter((item) => {
    return item.tags[0] === '키캡';
  });
  const filterSwitchTag = allProductArray.filter((item) => {
    return item.tags[0] === '스위치';
  });
  const filterAccessoryTag = allProductArray.filter((item) => {
    return item.tags[0] === '액세서리';
  });
  return [
    filterKeyboardTag,
    filterKeycapTag,
    filterSwitchTag,
    filterAccessoryTag,
  ];
};

/** 가격낮은순 정렬 후 렌더링 함수 */
const getSortedLowToHighPriceProduct = async (i) => {
  const getKeyBoardCategory = await getProductTags();
  const keyboardCategoryProduct = await getKeyBoardCategory[i];
  const LowToHighPrice = keyboardCategoryProduct.sort((a, b) => {
    return a.price - b.price;
  });
  console.log('LowToHighPrice', LowToHighPrice);
  // $('.categoryPage__product--lists').innerHTML = LowToHighPrice;
  // return keyboardCategoryProduct;
  renderCategoryProductList(await LowToHighPrice);
  return;
};

/** 가격높은순 정렬 후 렌더링 함수 */
const getSortedHighToLowPriceProduct = async (i) => {
  const getKeyBoardCategory = await getProductTags();
  const keyboardCategoryProduct = await getKeyBoardCategory[i];
  const HighToLowPrice = keyboardCategoryProduct.sort((a, b) => {
    return b.price - a.price;
  });
  console.log('HighToLowPrice', HighToLowPrice);
  renderCategoryProductList(await HighToLowPrice);
  return;
};

/** select option에 의해 정렬 */
const renderCategoryProductBySelect = async (condition, i) => {
  const getKeyBoardCategory = await getProductTags();

  if (condition === 'reset') {
    return renderCategoryProductList(await getKeyBoardCategory[i]);
  }
  if (condition === 'LowToHigh') {
    return await getSortedLowToHighPriceProduct(i);
  } else if (condition === 'HighToLow') {
    return await getSortedHighToLowPriceProduct(i);
  }
};

/** 카테고리별 상품 개수 렌더링 */
const renderCategoryProductQty = async (i) => {
  const getKeyBoardCategory = await getProductTags();
  const categoryTotalQty = await getKeyBoardCategory[i];
  $(
    '.categoryPage__main--filter-totalQty',
  ).innerHTML = `${categoryTotalQty.length}개 상품`;
};

/*-----------------------------------*\
  검색 페이지  #search
\*-----------------------------------*/

/** 검색한 제품, 태그 가져오기 */
const getSearchedProducts = async (title = '') => {
  try {
    const res = await fetch(`${BASE_URL}/products/search`, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        searchText: title,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('제품 검색을 실패했습니다.');
  }
};

/** 제품 이름 검색 */
const renderSearchedProductList = (title = '') => {
  const categoryProductListTemplate = title
    .map((item) => {
      const { id, price, thumbnail, title } = item;

      return `
    <li class="categoryPage__product--list" data-product-id="${id}">
      <a href="/product/${id}">
        <div class="categoryPage__product--img">
          <img src="${thumbnail}" alt="${title}" />
        </div>
        <div class="categoryPage__product--info">
          <h3 class="categoryPage__product--info-title">
            ${title}
          </h3>
          <span class="categoryPage__product--info-price">
            ${price.toLocaleString()} 원
          </span>
        </div>
      </a>
    </li>
    `;
    })
    .join('');

  $('.categoryPage__product--lists').innerHTML = categoryProductListTemplate;
};

const searchPageNoSearchResultTemplate = `
  <div class="searchPage__noResult--container">
    <span class="searchPage__noResult--inputValue"></span> 관련 상품이 없습니다.
    추천 검색어: 
    <a class="searchPage__noResult--button" href="/category/keyboards">키보드</a> 
    <a class="searchPage__noResult--button" href="/category/keycaps">Nuphy</a>
    <a class="searchPage__noResult--button" href="/category/switches">Xmas</a>
    <a class="searchPage__noResult--button" href="/category/accessories">Nufolio</a>
  </div>
`;

/** input 값이 입력된 제품 찾기 함수 */
const findProduct = async () => {
  $inputValue = $('.header-main__search--input').value;
  console.log('inputValue', $inputValue);
  return await getSearchedProducts($inputValue);
};

/** 검색한 제품의 유/무 예외처리 핸들링 함수 */
const handleSearchPageResult = async () => {
  const findProductArr = await findProduct();
  if (findProductArr.length === 0) {
    renderPage(renderInitCategoryPage);
    // '검색 결과 없음'의 초기 템플릿 init
    $('.categoryPage__product--lists').innerHTML =
      searchPageNoSearchResultTemplate;
    // 검색한 단어 화면에 표시
    $('.searchPage__noResult--inputValue').innerHTML = $(
      '.header-main__search--input',
    ).value;
  } else if (findProductArr.length >= 1) {
    renderPage(renderInitCategoryPage);
    renderSearchedProductList(await findProduct());
  }
};

/*-----------------------------------*\
  제품 상세 페이지  #productDetail js
\*-----------------------------------*/

/** 찜하기 목록 localStorage */
export const wishListStore = {
  setLocalStorage(product) {
    localStorage.setItem('wishList', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('wishList')) || [];
  },
  removeLocalStorage() {
    return localStorage.removeItem('wishList');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

let wishListArr = [];
wishListArr = wishListStore.getLocalStorage();
console.log(wishListArr);

const checkWhetherAddWishList = (id) => {
  const existingItem = wishListArr.find((item) => item.id === id);
  return existingItem ? addHeart : emptyHeart;
};

/** 찜하기 목록에 저장 */
const storeWishList = (id, count, thumbnail, title, pricePerOne) => {
  const existingItem = wishListArr.find((item) => item.id === id);

  if (!existingItem) {
    wishListArr.push({ id, count, thumbnail, title, pricePerOne });
    console.log('wishListArr', wishListArr);
    wishListStore.setLocalStorage(wishListArr);
    return;
  } else if (existingItem) {
    wishListArr = wishListArr.filter((item) => item.id !== id);
    console.log('wishListArr 이미 찜', wishListArr);
    wishListStore.setLocalStorage(wishListArr);
    return;
  }
  console.log('wishListArr2', wishListArr);
};

/** 제품 상세 페이지 찜하기 버튼 핸들링 이벤트  */
$('.app').addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('aside__productDetail--info-wishlistImg')) {
    const id = e.target.closest('.section__container').dataset.productId;
    console.log(id);
    const count = productDetailProductQty;
    const title = productDetailTitle;
    const thumbnail = productDetailThumbnail;
    const pricePerOne = productDetailPricePerOne;

    storeWishList(id, count, thumbnail, title, pricePerOne);
    wishListStore.setLocalStorage(wishListArr);
    console.log('wishListArr.push', wishListArr);
    renderDetailProduct(id);
  }
});

/*-----------------------------------*\
  마이 페이지 - 찜하기 페이지 / 찜한 상품 페이지 #wishList js
\*-----------------------------------*/

const renderInitMypageTemplate = `
      <div class="mypage__app">
        <div class="mypage__container">
          <div class="mypage__navbar">
            <h1>마이페이지</h1>
            <nav>
              <ul>
                <li>
                  <a href="/mypage/order" data-navigo
                    >주문내역
                    <img src="./public/chevronright.svg" alt="chevronright" />
                  </a>
                </li>
                <li>
                  <a href="/mypage/account" data-navigo
                    >계좌 관리
                    <img src="./public/chevronright.svg" alt="chevronright" />
                  </a>
                </li>
                <li>
                  <a href="/mypage/wishlist" data-navigo
                    >찜한 상품
                    <img src="./public/chevronright.svg" alt="chevronright" />
                  </a>
                </li>
                <li>
                  <a href="/mypage/myPersonalInfoModify" data-navigo
                    >개인 정보 수정
                    <img src="./public/chevronright.svg" alt="chevronright" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="mypage__navigo__container"></div>
        </div>
      </div>
`;

const handleWishListInitTemplate = () => {
  const renderWishListPageInitTemplate = `
    <div class="mypage__wishlist">
      <div class="mypage__wishlist--container">
        <h3>찜한 상품</h3>
        <ul class="wishlist__product--lists">
        </ul>
      </div>
    </div>
`;
  $('.mypage__navigo__container').innerHTML = renderWishListPageInitTemplate;
};

const renderWishListProductList = (store) => {
  console.log(store);
  const wishListProductListTemplate = store
    .map((item) => {
      const { id, pricePerOne, thumbnail, title } = item;

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

$('.app').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;
  console.log(e.target);
  if (e.target.classList.contains('removeFromWishListBtn')) {
    wishListArr = wishListArr.filter((item) => item.id !== id);
    console.log('removeEvent', wishListArr);
    wishListStore.setLocalStorage(wishListArr);
    renderWishListPage();
  }
});

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

/** 찜한 상품이 (없을 때 / 있을 때) 예외처리 */
const renderWishListPage = () => {
  if (wishListArr.length === 0) {
    // renderWishListProductList(wishListArr);
    renderPage(renderInitMypageTemplate);
    handleWishListInitTemplate();
    handleEmptyWishlistInit();
    return;
  } else if (wishListArr.length >= 1) {
    // 장바구니에 넣은 상품 렌더링
    renderPage(renderInitMypageTemplate);
    handleWishListInitTemplate();
    renderWishListProductList(wishListArr);
    return;
  }
};

/** [찜하기 페이지]에서 '카트에 담기' 버튼 클릭 시, 해당 제품을 장바구니에 저장  */
$('.app').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;
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
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    console.log(shoppingCartArr);
  }
});

/*-----------------------------------*\
  마이 페이지 - 주문내역 페이지  # mypage/order
\*-----------------------------------*/

const handleOrderHistoryInitTemplate = () => {
  const renderOrderHistoryPageInitTemplate = `
  <div class="mypage__orderhistory">
    <h2>주문 내역</h2>
    <div class="calendar-box">
      <input class="calendar-date"></input>
      <img class="calendar-icon icon icon-tabler icon-tabler-calendar-event" src="${calendar}"
        alt="calendar icon">
      <button><img src="${reload}" alt="reload icon"></button>
      <div class="calendar nodisplay">
        <div class="wrapper">
          <div class="curr-date ">
            <span></span>
            <span class="material-symbols-outlined" id="prev">
              chevron_left
            </span>
            <span class="material-symbols-outlined" id="next">
              chevron_right
            </span>
          </div>
          <div class="curr-dates">
            <ul class="weeks">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul class="days">
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="products-container">
      <div class="nocontent-box nodisplay">
        <p>
          <img src="${exclamationmark}" alt="exclamationmark">
          <span>주문내역이 존재하지 않습니다.</span>
        </p>
      </div>
      <ul class="products orderHistory__lists"></ul>
    </div>
    <div class="order-history--pagination">
      <img src="${paginationLeft}" alt="pagination-left">
      <span>1</span>
      <img src="${paginationRight}" alt="pagination-right">
    </div>
  </div>
  </div>
  `;
  $('.mypage__navigo__container').innerHTML =
    renderOrderHistoryPageInitTemplate;
};

const getAllTransactions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/transactions/details`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    console.log('거래내역', data);
    return data;
  } catch (err) {
    console.log('거래내역 가져오기 실패', err);
  }
};

const confirmTransactionAPI = async (detailId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/ok`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('구매 확정 실패', err);
  }
};

const cancelTransactionAPI = async (detailId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/cancel`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
    // return data;
  } catch (err) {
    console.log('구매 취소 실패', err);
  }
};

export const formatDate = (target) => {
  const date = new Date(target);
  const year = String(date.getFullYear()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const today = String(date.getDate()).padStart(2, 0);
  const hour = String(date.getHours()).padStart(2, 0);
  const min = String(date.getMinutes()).padStart(2, 0);
  return `${year}.${month}.${today} | ${hour}:${min}`;
};
export const formatPrice = (target) => {
  if (target) {
    let result = target.toLocaleString('ko-KR');
    return result;
  }
};

/** 제품 구매 내역 */
const renderOrderedProductList = (orderedItems) => {
  const orderedProductListTemplate = orderedItems
    .map((item) => {
      const { detailId, product, timePaid, done, isCanceled } = item;
      console.log(item);
      const { productId, title, price, thumbnail } = product;
      console.log('product', product);

      return `
      <li class="product orderHistory__list" data-product-id="${productId}" data-detail-id="${detailId}">
        <img src="${thumbnail}" alt="${title}" class="product--img orderHistory__list--img" />
        <div class="product--info">
          <a href="/mypage/order/${detailId}" class="product--name orderHistory__list--name">${
        title.length > 30 ? title.substring(0, 30).concat(' ...') : title
      }</a>
          <div class="product--info-numbers orderHistory__list--info">
            <div class="product--price orderHistory__list--info-price">${price.toLocaleString()} 원</div>
            <div class="product--order-date orderHistory__list--info-date">${formatDate(
              timePaid,
            )}</div>
          </div>
          <span class="order-status orderHistory__list--orderStatus">${
            done ? '구매 확정' : isCanceled ? '구매 취소' : ''
          }</span>
          <span>구매 확정 이후에는 주문 취소가 불가능합니다.</span>
          <span class="orderHistory__list--confirmed-order"></span>
        </div>
        <div class="buttons orderHistory__list--buttons">
          ${checkWhetherTransactionIsDone(done, isCanceled)}
        </div>
      </li>
    `;
    })
    .join('');

  $('.orderHistory__lists').innerHTML = orderedProductListTemplate;
};

/** 구매내역이 없을 경우 render 핸들링 함수, 빈 구매내역 template */
const emptyOrderHistory = () => {
  const emptyOrderHistoryTemplate = `
    <div class="cart__empty">
      <img src="${cartSVG}" alt="빈 구매내역" />
      <h3>구매내역이 없습니다.</h3>
      <a href="/category/keyboards">쇼핑하러 가기</a>
    </div>
  `;
  $('.orderHistory__lists').innerHTML = emptyOrderHistoryTemplate;
};

/** 제품 구매 내역 유/무 예외처리 */
const renderOrderedListPage = async () => {
  const transactionArr = await getAllTransactions();
  console.log('transactionArr', transactionArr);
  if (transactionArr.length === 0) {
    renderPage(renderInitMypageTemplate);
    handleOrderHistoryInitTemplate();
    emptyOrderHistory();

    return;
  } else if (transactionArr.length >= 1) {
    // 장바구니에 넣은 상품 렌더링
    renderPage(renderInitMypageTemplate);
    handleOrderHistoryInitTemplate();
    renderOrderedProductList(transactionArr);
    return;
  }
};

/** [주문 내역 페이지] 구매확정/취소 버튼 클릭 이벤트 */
$('.app').addEventListener('click', (e) => {
  console.log(e.target);
  const detailId = e.target.closest('li')?.dataset.detailId;
  console.log('detailId', detailId);
  if (e.target.classList.contains('orderHistory__list--confirmBtn')) {
    confirmTransactionAPI(detailId);
    e.target
      .closest('li')
      .querySelector('.orderHistory__list--confirmed-order').innerHTML =
      '구매가 확정되었습니다.';
    $('.app').querySelector(
      '.orderHistory__list--confirmed-order',
    ).style.display = 'none';
    return;
  }

  if (e.target.classList.contains('orderHistory__list--cancelBtn')) {
    cancelTransactionAPI(detailId);
    e.target
      .closest('li')
      .querySelector('.orderHistory__list--confirmed-order').innerHTML =
      '구매가 취소되었습니다.';
    $('.app').querySelector('.orderHistory__list--buttons').style.display =
      'none';
    return;
  }
});

/** 거래 완료/취소 확인 함수 */
const checkWhetherTransactionIsDone = (done, isCanceled) => {
  const buttons = `<button class="button cancel-btn orderHistory__list--cancelBtn">주문 취소</button>
                  <button class="button orderfix-btn orderHistory__list--confirmBtn">구매 확정</button>`;
  const emptyButtons = ``;
  if (done || isCanceled) {
    return emptyButtons;
  } else if (!done || !isCanceled) {
    return buttons;
  }
};

/*-----------------------------------*\
  마이 페이지 - 주문내역 상세 페이지  # mypage/order/:id
\*-----------------------------------*/
/** 주문 상세정보 구매확정/취소/완료 체크 함수 */
const checkWhetherDetailOrderTransactionIsDone = (done, isCanceled) => {
  if (done) {
    return '구매 확정';
  } else if (isCanceled) {
    return '구매 취소';
  } else if (!done && !isCanceled) {
    return '구매 완료';
  }
};

/** 주문 상세정보 조회 API */
const getDetailOrderProduct = async (detailId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/transactions/detail`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('상세 거래내역 가져오기 실패', err);
  }
};

/** 주문 상세정보 렌더링 함수 */
const renderDetailOrderProduct = async (id) => {
  const detailOrderProduct = await getDetailOrderProduct(id);
  const { detailId, product, account, timePaid, isCanceled, done } =
    detailOrderProduct;
  const { bankName, bankCode, accountNumber } = account;
  const { productId, title, price, thumbnail } = product;

  const detailOrderTemplate = `
  <section class="mypage__detailorderhistory">
    <h2>주문 상세정보</h2>
    <div class="detailorderhistory__order--info">
      <span class="detailorderhistory__order--info-date">
        주문 날짜: ${formatDate(timePaid)}</span
      >
      <span class="detailorderhistory__order--info-id"
        >주문 번호: ${detailId}</span
      >
    </div>
    <div class="detailorderhistory__product" data-product-id=${productId}>
      <div class="detailorderhistory__product--container">
        <img
          class="detailorderhistory__product--image"
          src="${thumbnail}"
          alt="${title}"
        />
        <div class="detailorderhistory__product--info">
          <a
            href="/product/${productId}"
            data-navigo
            class="detailorderhistory__product--name"
          >
            ${title}
          </a>
          <div>
            <span class="detailorderhistory__product--price"
              >${price.toLocaleString()} 원</span
            >
            <span class="detailorderhistory__product--count"
              >(1개)</span
            >
          </div>
        </div>
      </div>
      <div class="detailorderhistory__product--order-status">
        ${checkWhetherDetailOrderTransactionIsDone()}
      </div>
    </div>
    <h2 class="detailorderhistory__product--payment-info-title">
      결제 정보
    </h2>
    <div class="detailorderhistory__payment--detail-container">
      <div class="detailorderhistory__payment--detail">
        <span class="detailorderhistory__payment--detail-type"
          >결제수단</span
        >
        <span class="detailorderhistory__payment--detail-bank"
          >${bankName}(${accountNumber})</span
        >
      </div>
      <div
        class="detailorderhistory__payment--detail-price-container"
      >
        <span class="detailorderhistory__payment--detail-price-title"
          >결제 금액</span
        >
        <span class="detailorderhistory__payment--detail-price"
          >${price} 원</span
        >
      </div>
    </div>
  </section>
  `;
  $('.mypage__navigo__container').innerHTML = detailOrderTemplate;
};

const renderDetailOrderPage = async (id) => {
  renderPage(renderInitMypageTemplate);
  await renderDetailOrderProduct(id);
};

// $('.app').addEventListener('click', (e) => {
//   const detailId = e.target.contains('li')?.dataset.detailId;
//   console.log(detailId);
//   renderDetailOrderProduct(detailId);
// });

/*-----------------------------------*\
  제품 상세 페이지  #productDetail js
\*-----------------------------------*/

// productDetail 제품 상세페이지
// 라우터 라이브러리
import cartSVG from '../../public/cart.svg';

/** 장바구니 localStorage */
export const shoppingCartStore = {
  setLocalStorage(product) {
    localStorage.setItem('shoppingCart', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
  },
  removeLocalStorage() {
    return localStorage.removeItem('shoppingCart');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

let shoppingCartArr = [];
shoppingCartArr = shoppingCartStore.getLocalStorage();
console.log(shoppingCartArr);

/** 장바구니에 저장 */
const storeCart = (id, price, count, thumbnail, title, pricePerOne) => {
  // id 값을 찾고
  const existingItem = shoppingCartArr.find((item) => item.id === id);
  // 새로운 아이템이면 추가
  if (!existingItem) {
    shoppingCartArr.push({ id, price, count, thumbnail, title, pricePerOne });
    console.log('shoppingCartArr.push', shoppingCartArr);
    return;
  } else if (existingItem) {
    // 이미 아이템이면 기존 수량, 가격에 누적 추가
    existingItem.count += count;
    existingItem.price += price;
    return;
  }
  // shoppingCartStore.setLocalStorage(shoppingCartArr);
  console.log(shoppingCartArr);
};

/** 상세 제품 db에서 불러오기 */
const getDetailProduct = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '해당 제품을 불러오기 실패');
  }
};

/** 계좌 목록 및 잔액 조회 db에서 불러오기 */

const getAccountDetail = async () => {
  try {
    const res = await fetch(`${BASE_URL}/account`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    const { accounts, totalBalance } = data;

    return accounts;
  } catch (err) {
    console.log(err);
    console.log('err: ', '계좌목록 조회 실패');
  }
};

/** 구매 수량 */
let productDetailProductQty = 1;
/** 총 상품 금액 */
let productDetailTotalPrice;
let productDetailTitle;
let productDetailThumbnail;
let productDetailPricePerOne;

const renderDetailProduct = async (productId) => {
  const productDetail = await getDetailProduct(productId);
  const { description, id, isSoldOut, photo, price, tags, title, thumbnail } =
    productDetail;
  console.log('productDetail', productDetail);

  // 총 금액 계산, 제품title, thumbnail, 상품 개당 가격
  productDetailTotalPrice = price * productDetailProductQty;
  productDetailTitle = title;
  productDetailThumbnail = thumbnail;
  productDetailPricePerOne = price;

  const productTags = tags
    .map((tag) => {
      return `<li class="aside__productDetail--info-tagLists-tag">${tag}</li>`;
    })
    .join('');

  /** 상세 제품 레이아웃 html */
  const detailProductTemplate = /* html */ `
  <div class="section__container" data-product-id="${id}">
    <section class="section__productDetail">
      <img
        src="${thumbnail}"
        alt="${title}"
      />
    </section>
    <aside class="aside__productDetail-menu">
      <div class="aside__productDetail--info">
        <h2 class="aside__productDetail--info-title" id="productDetail-title">
          ${title}
        </h2>
        <div class="aside__productDetail--info-sec">
          <div class="aside__productDetail--info-sec-price">
            ${price.toLocaleString()} 원
          </div>
          <div class="aside__productDetail--info-sec-wishlist">
            <button class="aside__productDetail--info-wishlistBtn">
              <img class="aside__productDetail--info-wishlistImg" 
                src="${checkWhetherAddWishList(id)}" alt="찜하기 버튼" />
            </button>
          </div>
        </div>
        <p class="aside__productDetail--info-desc">
          ${description}
        </p>
        <ul class="aside__productDetail--info-tagLists">
          ${productTags}
        </ul>
      </div>

      <div class="aside__productDetail--count">
        <p class="aside__productDetail--count-buy">구매 수량</p>
        <div class="aside__productDetail--count-btns">
          <button class="aside__productDetail--count-btn minusQtyBtn">-</button>
          <span class="aside__productDetail--count-qty Qty" id="productDetailProductQty">${productDetailProductQty}</span>
          <button class="aside__productDetail--count-btn addQtyBtn">+</button>
        </div>
      </div>
      <div class="aside__productDetail--totalPrice">
        <p>총 상품 금액</p>
        <p id="productDetail-totalPrice">${productDetailTotalPrice.toLocaleString()}</p>
      </div>
      <div class="aside__productDetail--btns">
        ${
          !isSoldOut
            ? `<button class="aside__productDetail--btns-cart addCartBtn">장바구니에 담기</button>
        <button class="aside__productDetail--btns-buy buyBtn">구매하기</button>`
            : ` <button class="aside__productDetail--btns-soldOut">해당 상품은 품절입니다.</button>`
        }
      </div>
    </aside>
  </div>
  `;

  $('.app').innerHTML = detailProductTemplate;
};

/** 구매수량 추가 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  const detailProductId = e.target.closest('.section__container')?.dataset
    .productId;
  updateInfo(e, detailProductId);
});

/** 구매수량 핸들링 함수 */
const updateInfo = async (e, productId) => {
  // 구매 수량 -
  if (e.target.classList.contains('minusQtyBtn')) {
    productDetailProductQty -= 1;
    if (productDetailProductQty === 0) {
      productDetailProductQty = 1;
    }
    renderDetailProduct(productId);
    // renderCartPage();
    return;
  }
  // 구매 수량 +
  if (e.target.classList.contains('addQtyBtn')) {
    productDetailProductQty += 1;

    renderDetailProduct(productId);
    // renderCartPage();
    return;
  }
  shoppingCartStore.setLocalStorage(shoppingCartArr);
};

/** 장바구니 담기 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  pushInCart(e);
});

/** 장바구니 담기 핸들 함수 */
const pushInCart = (e) => {
  if (
    e.target.classList.contains('addCartBtn') ||
    e.target.classList.contains('buyBtn')
  ) {
    const id = e.target.closest('.section__container').dataset.productId;
    console.log(id);
    const price = productDetailTotalPrice;
    const count = productDetailProductQty;
    const title = productDetailTitle;
    const thumbnail = productDetailThumbnail;
    const pricePerOne = productDetailPricePerOne;

    storeCart(id, price, count, thumbnail, title, pricePerOne);
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    console.log('shoppingCartArr.push', shoppingCartArr);
  }
};

/** 모달 핸들 이벤트 */
document.body.addEventListener('click', (e) => {
  handleModal(e);
});

/** 모달 핸들 함수 */
const handleModal = (e) => {
  // '장바구니에 담기' 버튼 클릭 시, 모달 오픈
  if (
    e.target.classList.contains('addCartBtn') ||
    e.target.classList.contains('wishList-AddToCartBtn')
  ) {
    $('.modal__addCart').style.display = 'block';
    return;
  }

  // '모달 창 밖에 클릭 시 닫기'
  if (e.target !== $('.modal__addCart')) {
    $('.modal__addCart').style.display = 'none';
    return;
  }

  // 모달 '장바구니로 바로가기' or '계속 쇼핑하기' 클릭 시 모달 닫기
  if (e.target === $('.goToCart') || e.target === $('.modal-keepShopping')) {
    $('.modal__addCart').style.display = 'none';
    return;
  }
};

/*-----------------------------------*\
  # 장바구니 페이지 cart js
\*-----------------------------------*/

let cartProductTotalPrice;

let cartTotalPaymentPrice; // [장바구니] 총 결제 금액
let cartTotalOrderPrice; // [장바구니] 총 주문 금액
let cartDiscountPrice = 0; // [장바구니] 할인 금액
let cartDeliveryPrice = 0; // [장바구니] 배송비

/** 장바구니 총 가격 렌더링 */
const renderCartTotalPrice = () => {
  const cartTotalPrice = shoppingCartArr.map((items) => items.price);
  const cartTotalPriceReduce = cartTotalPrice.reduce((acc, val) => {
    return acc + val;
  }, 0);

  cartTotalOrderPrice = cartTotalPriceReduce;
  return cartTotalOrderPrice;
};

// 장바구니 페이지 초기 렌더링
const renderInitCartPage = `
<section class="cart">
  <div class="cart__header"><h2>장바구니</h2></div>
  <div class="cart__container">
    <ul class="cart__list">
      <div class="cart__empty">
        <img src="${cartSVG}" alt="빈 장바구니" />
        <h3>장바구니가 비었습니다.</h3>
        <button class="cartEmpty-goToShoppingBtn">쇼핑하러 가기</button>
      </div>
    </ul>
    
    <!-- 총 주문 금액 -->
    <aside class="cart__price">
      <div class="cart__price--border">
        <div class="cart__price--calc">
          <div class="cart__price--calc-orderPrice">
            <span class="cartOrderPrice">총 주문 금액</span>
            <p class="cartOrderPrice">0 원</p>
          </div>
          <div class="cart__price--calc-discountPrice">
            <span>할인 금액</span>
            <p class="cartDiscountPrice">0 원</p>
          </div>
          <div class="cart__price--calc-deliveryPrice">
            <span>배송비</span>
            <p class="cartDeliveryPrice">0 원</p>
          </div>
        </div>
        <div class="cart__price--total">
          <span>총 결제 금액</span>
          <p class="cartTotalPaymentPrice">0 원</p>
        </div>
      </div>
      <a href="/payment" data-navigo
        ><button class="cart__price--paymentBtn cartPaymentBtn">
          결제하기
        </button></a
      >
    </aside>
  </div>
</section>
`;

/** 장바구니 결제금액 렌더링 */
const renderCartOrderPrice = () => {
  // [장바구니] 총 결제 금액
  cartTotalPaymentPrice =
    cartTotalOrderPrice + cartDiscountPrice + cartDeliveryPrice;
  const cartOrderPriceTemplate = `
  <div class="cart__price--border">
    <div class="cart__price--calc">
      <div class="cart__price--calc-orderPrice">
        <span class="cartOrderPrice">총 주문 금액</span>
        <p class="cartOrderPrice">${cartTotalOrderPrice.toLocaleString()} 원</p>
      </div>
      <div class="cart__price--calc-discountPrice">
        <span>할인 금액</span>
        <p class="cartDiscountPrice">0 원</p>
      </div>
      <div class="cart__price--calc-deliveryPrice">
        <span>배송비</span>
        <p class="cartDeliveryPrice">0 원</p>
      </div>
    </div>
    <div class="cart__price--total">
      <span>총 결제 금액</span>
      <p class="cartTotalPaymentPrice">${cartTotalPaymentPrice.toLocaleString()} 원</p>
    </div>
  </div>
  <button class="cart__price--paymentBtn cartPaymentBtn">
    결제하기
  </button>
`;

  $('.app').querySelector('.cart__price').innerHTML = cartOrderPriceTemplate;
};

const renderCartList = (storage) => {
  const cartListTemplate = storage
    .map((item) => {
      const { id, price, count, thumbnail, title } = item;
      cartProductTotalPrice = price;
      return `
    <li class="cart__item" data-product-id="${id}">
      <div class="cart__item-info">
        <div class="cart__item-info--checkbox">
          <input type="checkbox" checked />
        </div>
        <a href="#" data-navigo
          ><div class="cart__item-info--img">
            <img
              src="${thumbnail}"
              alt="${title}"
            /></div
        ></a>
        <a href="/product/${id}" data-navigo
          ><span class="cart__item-info--title">
            ${title}
          </span></a
        >
      </div>
      <div class="cart__item--calc">
        <div class="cart__item--calc-count">
          <button class="cart-minusQtyBtn">-</button>
          <p class="cartProductQty">${count} 개</p>
          <button class="cart-addQtyBtn">+</button>
        </div>
        <span class="cart__item--price cartProductTotalPrice">${price.toLocaleString()} 원</span>
        <button class="cart__item--deleteBtn cartProductDeleteBtn">X</button>
      </div>
    </li>
    `;
    })
    .join('');

  renderCartTotalPrice();
  renderCartOrderPrice();
  $('.app').querySelector('.cart__list').innerHTML = cartListTemplate;
};

/** 장바구니 localStorage에 저장하는 함수 - 찜하기 페이지에서 재활용 */
const storeLocalStorage = (id) => {
  const existingItem = shoppingCartArr.find((item) => item.id === id);
  console.log('existingItem', existingItem);

  if (existingItem) {
    existingItem.price += existingItem.pricePerOne;
    existingItem.qty += 1;
    existingItem.count += 1;
    return;
  }
  // shoppingCartArr
  shoppingCartStore.setLocalStorage(shoppingCartArr);
  console.log('장바구니', shoppingCartArr);
};

/** 장바구니 페이지에서 수량 핸들링 */
$('.app').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;

  // 구매 수량 +
  if (e.target.classList.contains('cart-addQtyBtn')) {
    storeLocalStorage(id);
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    // 카트 페이지 렌더
    renderCartPage();
    return;
  }

  // 구매 수량 -
  if (e.target.classList.contains('cart-minusQtyBtn')) {
    const existingItem = shoppingCartArr.find((item) => item.id === id);
    console.log('existingItem', existingItem);

    if (existingItem) {
      if (existingItem.price > existingItem.pricePerOne) {
        existingItem.price -= existingItem.pricePerOne;
        // return;
      }
      if (existingItem.qty > 1) {
        existingItem.qty -= 1;
        // return;
      }
      if (existingItem.count > 1) {
        existingItem.count -= 1;
        // return;
      }

      shoppingCartStore.setLocalStorage(shoppingCartArr);
      // 카트 페이지 렌더
      renderCartPage();
      // return;
    }
    return;
  }

  // 장바구니에서 삭제
  if (e.target.classList.contains('cartProductDeleteBtn')) {
    shoppingCartArr = shoppingCartArr.filter((item) => item.id !== id);
    console.log(shoppingCartArr);
    storeLocalStorage(id);
    renderCartPage();
    return;
  }
});

/** 빈 장바구니일 때 화면에 표시 */
const renderInitEmptyCartPage = `
    <div class="cart__empty">
      <img src="${cartSVG}" alt="빈 장바구니" />
      <h3>장바구니가 비었습니다.</h3>
      <a><button class="cartEmpty-goToShoppingBtn">쇼핑하러 가기</button></a>
    </div>
  `;

/** 빈 장바구니일 때, 상품이 있는 장바구니일 때 */
const renderCartPage = () => {
  if (shoppingCartArr.length === 0) {
    renderCartList(shoppingCartArr);
    renderPage(renderInitCartPage);
    return;
  } else if (shoppingCartArr.length >= 1) {
    // 장바구니에 넣은 상품 렌더링
    renderCartList(shoppingCartArr);
    // 결제금액 렌더링
    renderCartTotalPrice();
    return;
  }
};

/*-----------------------------------*\
  # 결제 페이지 # pay js
\*-----------------------------------*/
import {
  hanaBank,
  kakaoBank,
  kbBank,
  nhBank,
  shinhanBank,
  wooriBank,
} from '../js/page/pay/payIMG.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import { render } from 'sass';
Swiper.use([Navigation, Pagination]);

const buyItemAPI = async (productId, accountId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/buy`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId,
        accountId,
      }),
    });
    const data = await res.json();
    console.log('제품 결제', data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('결제 실패');
  }
};

/** 제품 총 개수 렌더링 함수 */
const renderProductTotalQty = () => {
  const paymentItemCount = shoppingCartArr.map((items) => items.count);
  const renderProductTotalQty = paymentItemCount.reduce((acc, val) => {
    return acc + val;
  }, 0);

  return renderProductTotalQty;
};

/** 결제 페이지 처음 렌더링 */
const renderInitPaymentPage = `
<section class="pay">
  <div class="pay__container">
    <div class="pay__header"><h2>결제하기</h2></div>
    <div class="pay__info">
      <form class="paymentPage__submitForm">
        <div class="pay__info--header"><h3>주문정보</h3></div>
        <div class="pay__info--orderItem pay__info--order-item">
          <h4>주문상품 <span class="paymentProductQty"></span>개</h4>
          <ul class="pay__info--orderItem-lists"></ul>
        </div>
        <div class="pay__info--orderItem pay__info--address-info">
          <h4>배송지</h4>
          <div class="pay__info--address-container">
            <div class="pay__info--address-form">
              <div class="pay__info-zipcode">
                <h6>우편번호</h6>
                <div class="pay__info-zipcode--data">
                  <input
                    class="pay__info-zipcode--data-input"
                    placeholder="우편번호 찾기를 버튼을 클릭하세요"
                    id="sample5_address"
                    readonly
                    required
                  />
                  <button class="pay__info-zipcode--data-searchBtn">
                    우편번호 찾기
                  </button>
                </div>
              </div>

              <div class="pay__info--order">
                <h6>주소지</h6>
                <div class="pay__info--order-data">
                  <input
                    placeholder="상세 주소"
                    class="pay__info--order-data-address"
                    required
                  />
                </div>
              </div>

              <div class="pay__info--delivery">
                <h6>배송메모</h6>
                <div>
                  <select>
                    <option value="default">
                      배송 메세지를 선택해주세요.
                    </option>
                    <option value="purchase-item">
                      배송 전에 미리 연락 바랍니다.
                    </option>
                    <option value="purchase-item">
                      부재시 경비실에 맡겨 주세요.
                    </option>
                    <option value="purchase-item">
                      부재시 전화 주시거나 문자 남겨 주세요.
                    </option>
                  </select>
                </div>
              </div>
              <div id="map" style="width:300px;height:300px;margin-top:10px;display:none"></div>
            </div>
          </div>
        </div>
        <div class="pay__info--orderItem pay__info--payer-info">
          <h4>주문자 정보</h4>
          <div class="pay__info--payer--container">
            <form class="pay__info--payer--form">
              <div class="pay__info--payer--name">
                <h6>주문자</h6>
                <input
                  class="pay__info--payer--name-input"
                  placeholder="이름을 입력해주세요"
                  required
                />
              </div>
              <div class="pay__info--payer--email">
                <h6>이메일</h6>
                <input
                  class="pay__info--payer--email-input"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <div class="pay__info--payer--phoneNum">
                <h6>휴대폰</h6>
                <input
                  class="pay__info--payer--phoneNum-input"
                  type="tel"
                  placeholder="휴대폰 번호를 입력해주세요"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="pay__info--orderItem pay__info--price-sum">
          <div class="pay__info--width400px">
            <h4>결제 금액</h4>
            <div class="pay__info--payment--container">
              <div class="pay__info--container-totalOrderPrice">
                <h6>총 주문 금액</h6>
                <span class="payTotalOrderPrice">${renderCartTotalPrice().toLocaleString()} 원</span>
              </div>
              <div class="pay__info--container-discountPrice">
                <h6>할인 금액</h6>
                <span class="payDiscountPrice">${cartDiscountPrice.toLocaleString()} 원</span>
              </div>
              <div class="pay__info--container-deliveryPrice">
                <h6>배송비</h6>
                <span class="payDeliveryPrice">${cartDiscountPrice.toLocaleString()} 원</span>
              </div>
              <div class="pay__info--container-totalPaymentPrice">
                <h6>총 결제 금액</h6>
                <span class="payTotalAccountBalance"></span>
                <span class="payTotalPaymentPrice">${renderCartTotalPrice().toLocaleString()} 원</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pay__info--orderItem pay__info--payment-method">
          <div class="payment-method">
            <h4>결제수단</h4>
            선택된 계좌: <span class="payment-method__account-selected"></span>
          </div>
          <div class="payment-method__select-card">
            <div class="swiper payment-method__swiper-wrapper">
              <ul class="swiper-wrapper payment-method__card-lists"></ul>
              <div class="swiper-pagination"></div>
              
            </div>
          </div>
          <div class="payment-method__final">
            <ul class="payment-method__final-alert">
              <li>
                - 최소 결제 가능 금액은 총 결제 금액에서 배송비를 제외한
                금액입니다.
              </li>
              <li>
                - 소액 결제의 경우 정책에 따라 결제 금액 제한이 있을 수
                있습니다.
              </li>
            </ul>
            <div class="payment-method__final-confirm--container">
              <button class="payment-method__final-confirm--btn">
                총 ${renderCartTotalPrice().toLocaleString()}원 결제하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
`;

/** 결제페이지 구매할 제품 리스트 렌더링 */
const renderPaymentProductList = (storage) => {
  const paymentProductListTemplate = storage
    .map((item) => {
      const { id, price, count, thumbnail, title } = item;

      return `
    <li class="pay__info--orderItem-list" data-product-id="${id}">
      <img
        src="${thumbnail}"
        alt="${title}"
      />
      <div class="pay__info--orderItem-desc">
        <h5 class="pay__info--orderItem-title">${title}</h5>
        <div class="pay__info--orderItem-qty">${count} 개</div>
        <div class="pay__info--orderItem-totalprice">${price.toLocaleString()}원</div>
      </div>
    </li>
    `;
    })
    .join('');

  $('.app').querySelector('.pay__info--orderItem-lists').innerHTML =
    paymentProductListTemplate;
};

/** 계좌목록 및 잔액 조회 */
const renderPaymentAccount = async (items) => {
  console.log(items);

  const paymentAccountListTemplate = items
    .map((item) => {
      console.log(item);
      // const { totalBalance, accounts } = item;
      const { id, bankName, bankCode, accountNumber, balance } = item;

      return `
    <li class="swiper-slide payment-method__card-list" data-account-id="${id}">
      <img
        src="${
          bankCode === '081'
            ? hanaBank
            : bankCode === '089'
            ? kbBank
            : bankCode === '090'
            ? kakaoBank
            : bankCode === '011'
            ? nhBank
            : bankCode === '088'
            ? shinhanBank
            : bankCode === '020'
            ? wooriBank
            : bankCode === '004'
            ? kbBank
            : ''
        }"
        width="210"
        height="140"
        alt="${bankName}"
      />
      <p class="payment-method__card-name">${bankName}</p>
      
      <p>${bankCode}</p>
      <p>${accountNumber}</p>
      <p>${balance.toLocaleString()} 원</p>
    </li>
    `;
    })
    .join('');
  $('.app').querySelector('.payment-method__card-lists').innerHTML =
    paymentAccountListTemplate;
};

/** 연결된 계좌가 없을 때 예외처리 */
const renderNoPaymentAccount = () => {
  const NoPaymentAccountTemplate = `
  <li class="swiper-slide payment-method__card-list">
    <img class="payment-method__card-list--noPaymentBankAccount"
      src="${kakaoBank}"
      width="210"
      height="140"
      alt="결제 정보 없음"
    />
    <a href="/" data-navigo>
      <button class="payment-method__card-list--goToLinkBankAccount-button">
        계좌 연결하러 가기
      </button>
    </a>
  </li>
  `;

  $('.app').querySelector('.payment-method__card-lists').innerHTML =
    NoPaymentAccountTemplate;
};

/** 카카오 맵 렌더링 */
const renderKakaoMap = () => {
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

  //지도를 미리 생성
  var map = new daum.maps.Map(mapContainer, mapOption);
  //주소-좌표 변환 객체를 생성
  var geocoder = new daum.maps.services.Geocoder();
  //마커를 미리 생성
  var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map,
  });
  function sample5_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        var addr = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        document.getElementById('sample5_address').value = addr;
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function (results, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            var result = results[0]; //첫번째 결과의 값을 활용

            // 해당 주소에 대한 좌표를 받아서
            var coords = new daum.maps.LatLng(result.y, result.x);
            // 지도를 보여준다.
            mapContainer.style.display = 'block';
            map.relayout();
            // 지도 중심을 변경한다.
            map.setCenter(coords);
            // 마커를 결과값으로 받은 위치로 옮긴다.
            marker.setPosition(coords);
          }
        });
      },
    }).open();
  }
  $('.app')
    .querySelector('.pay__info-zipcode--data-searchBtn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      sample5_execDaumPostcode();
    });
};

/** 결제하기 버튼 활성화/비활성화 */
const activePaymentBtn = async () => {
  const finalPaymentBtn = $('.app').querySelector(
    '.payment-method__final-confirm--btn',
  );
  const selectedPaymentAccount = $('.app').querySelector(
    '.payment-method__account-selected',
  );
  console.log(selectedPaymentAccount.textContent);
  const accountList = await getAccountDetail();
  if (accountList.length >= 1) {
    finalPaymentBtn.style.backgroundColor = 'var(--logo-color)';
    finalPaymentBtn.style.cursor = 'pointer';
  } else if (accountList.length === 0) {
    finalPaymentBtn.style.backgroundColor = 'gray';
    finalPaymentBtn.setAttribute('disabled', true);
  }
};

/** swiper 결제 페이지 선택된 계좌 이름 렌더링 */
const renderSelectedPayment = (e) => {
  const availableBankAccount = $('.app')
    .querySelectorAll('.payment-method__card-list')
    [e.realIndex]?.querySelector('.payment-method__card-name')?.textContent;
  console.log(availableBankAccount);

  if (availableBankAccount === undefined) {
    $('.app').querySelector('.payment-method__account-selected').innerHTML =
      '등록된 계좌가 없습니다.';
  } else {
    $('.app').querySelector('.payment-method__account-selected').innerHTML =
      availableBankAccount;
  }
};

/** 결제페이지에서 작동하는 함수들 */
const paymentPageFunction = async (e) => {
  // 1. 결제가격 재렌더링
  renderCartTotalPrice();
  // 2. 결제할 제품들 렌더링
  renderPaymentProductList(shoppingCartArr);
  // 3. 제품 개수
  $('.app').querySelector('.paymentProductQty').innerHTML =
    renderProductTotalQty();
  // 4. 주소찾기 카카오api
  renderKakaoMap();
  // 5. 결제수단 불러오기
  // 예외처리: 불러올 결제수단이 없으면 '계좌 연결하러 가기 버튼 생성'
  const accountList = await getAccountDetail();
  console.log(accountList);
  accountList.length === 0
    ? renderNoPaymentAccount()
    : await renderPaymentAccount(await getAccountDetail());

  // 5. swiper
  var paymentCardSwiper = new Swiper('.payment-method__swiper-wrapper', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    grabCursor: true,
    spaceBetween: 30,
    on: {
      afterInit: (e) => {
        console.log('afterInit 결제수단 realIndex', e.realIndex);
        renderSelectedPayment(e);
        activePaymentBtn();
      },
      slideChange: (e) => {
        console.log('slideChange 결제수단 realIndex', e.realIndex);
        renderSelectedPayment(e);
        activePaymentBtn();
      },
    },
  });
};

/** 결제 페이지 최종 결제 버튼의 결제 가격 재렌더링 함수 */
const renderFinalPaymentPrice = () => {
  $(
    '.payment-method__final-confirm--btn',
  ).innerHTML = `총 ${renderCartTotalPrice().toLocaleString()}원 결제하기`;
  $(
    '.payTotalOrderPrice',
  ).innerHTML = `${renderCartTotalPrice().toLocaleString()}원`;
  $(
    '.payTotalPaymentPrice',
  ).innerHTML = `${renderCartTotalPrice().toLocaleString()}원`;
};

/*-----------------------------------*\
  # navigo router
\*-----------------------------------*/

router
  .on({
    '/': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/ route is working');
      renderPage(renderMainPageTemplate);
    },
    '/products/search': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/products/search route is working');
      // 제품 검색
      // renderPage(renderInitCategoryPage);
      // renderSearchedProductList(await findProduct());
      // renderSearchedProductLength();
      await handleSearchPageResult();
    },
    '/product/:id': async (params) => {
      console.log('product/:id route is working');
      console.log('params', params);
      await renderDetailProduct(params.data.id);

      $('.app')
        .querySelector('.buyBtn')
        ?.addEventListener('click', (e) => {
          console.log(e.target);
          router.navigate('/payment');
        });
    },
    '/cart': () => {
      $('.modal__addCart').style.display = 'none';
      // 초기 템플릿, ul태그 삽입
      renderPage(renderInitCartPage);
      console.log('/cart');
      console.log('shoppingCartArr', shoppingCartArr);

      // 카트 페이지 렌더
      renderCartPage();
    },
    '/payment': async () => {
      $('.modal__addCart').style.display = 'none';
      // 초기 결제 페이지 렌더
      renderPage(renderInitPaymentPage);
      renderFinalPaymentPrice();
      // 결제 페이지 렌더 후 실행할 함수들
      await paymentPageFunction();

      /** 결제 버튼 클릭시 결제 진행 (리팩토링 예정)*/
      $('.app')
        .querySelector('.payment-method__final-confirm--btn')
        .addEventListener('click', async (e) => {
          e.preventDefault();
          if ($('.pay__info-zipcode--data-input').value === '') {
            $('.pay__info-zipcode--data-input').focus();
            alert('우편번호를 입력해주세요');
            return;
          }
          if ($('.pay__info--payer--name-input').value === '') {
            $('.pay__info--payer--name-input').focus();
            alert('주문자 이름을 입력해주세요.');
            return;
          }
          // 결제가 성공하면 구매내역 페이지로 라우팅 (지금은 홈으로 이동)
          await handlePaymentBtnLogic(e);
        });
    },
    '/category/keyboards': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/keyboards');
      renderPage(renderInitCategoryPage);
      const getKeyBoardCategory = await getProductTags();
      renderCategoryProductList(await getKeyBoardCategory[0]);
      await renderCategoryProductQty(0);
      console.log(await getKeyBoardCategory[0]);
      console.log(
        $('#categoryPage-filterByPrice').options[
          $('#categoryPage-filterByPrice').selectedIndex
        ].value,
      );

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            0,
          );
        });
    },
    '/category/keycaps': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/keycaps');
      const getKeyBoardCategory = await getProductTags();
      renderPage(renderInitCategoryPage);
      renderCategoryProductList(await getKeyBoardCategory[1]);
      await renderCategoryProductQty(1);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            1,
          );
        });

      // swiper
      // const categorySwiper = new Swiper('.categoryPageSwiper', {
      //   direction: 'vertical',
      //   effect: 'slide',
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   },
      //   grabCursor: true,
      //   slidesPerView: 5,
      //   autoplay: {
      //     delay: 3000,
      //   },
      //   spaceBetween: 1,
      //   loop: true,
      // });
    },
    '/category/switches': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/switches');
      const getKeyBoardCategory = await getProductTags();
      renderPage(renderInitCategoryPage);
      renderCategoryProductList(await getKeyBoardCategory[2]);
      await renderCategoryProductQty(2);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            2,
          );
        });
    },
    '/category/accessories': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/accessories');
      const getKeyBoardCategory = await getProductTags();
      renderPage(renderInitCategoryPage);
      renderCategoryProductList(await getKeyBoardCategory[3]);
      await renderCategoryProductQty(3);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            3,
          );
        });
    },
    // 마이페이지 찜하기 목록
    '/mypage/wishlist': () => {
      renderWishListPage();
    },
    // 마이페이지 주문내역 목록
    '/mypage/order': async () => {
      await renderOrderedListPage();
    },
    '/mypage/order/:id': async (params) => {
      console.log('order params', params);
      // await renderDetailOrderProduct(params.data.id);
      await renderDetailOrderPage(params.data.id);
    },
  })
  .resolve();

/** 버튼 요소 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  // [장바구니 페이지]에서 장바구니에 상품이 없을 때, '계속 쇼핑하기' 버튼 클릭 -> [메인페이지]로 이동
  if (e.target.classList.contains('cartEmpty-goToShoppingBtn')) {
    console.log(e.target);
    router.navigate('/category/keyboards');
    return;
  }

  // [제품 상세 페이지]에서 '장바구니로 바로가기' 버튼 클릭 클릭 -> [장바구니 페이지]로 이동
  if (e.target.classList.contains('goToCart')) {
    console.log(e.target);
    router.navigate('/cart');
    return;
  }

  // [제품 상세 페이지]에서 '구매하기' 버튼 클릭 클릭 -> [결제 페이지]로 이동
  if (e.target.classList.contains('buyBtn')) {
    console.log(e.target);
    router.navigate('/payment');
    return;
  }

  // [장바구니]에서 '구매하기' 버튼 클릭 클릭 -> [결제 페이지]로 이동
  if (e.target.classList.contains('cartPaymentBtn')) {
    console.log(e.target);
    router.navigate('/payment');
    return;
  }
});

/** 검색창 폼 태그 새로고침 방지 */
$('.header-main__search--form').addEventListener('submit', (e) => {
  e.preventDefault();
});

/** [모든 페이지]에서 제품 검색 버튼 'click' 이벤트 */
$('.header-main__search--button').addEventListener('click', async (e) => {
  e.preventDefault();
  router.navigate('/products/search');
  // renderPage(renderInitCategoryPage);
  // renderSearchedProductList(await findProduct());
  await handleSearchPageResult();
  return;
});

/** [모든 페이지]에서 제품 검색 버튼 'Enter'이벤트 */
$('.header-main__search--button').addEventListener('keypress', async (e) => {
  // if (e.key !== 'Enter') return;
  if (e.key === 'Enter') {
    router.navigate('/products/search');
    // findProduct();
    // renderPage(renderInitCategoryPage);
    // renderSearchedProductList(await findProduct());
    await handleSearchPageResult();
  }
});

/** 현재 선택한 은행계좌의 잔액 확인해주는 함수 */
const checkBalanceOfselectedBankAccount = async (id) => {
  const availableAccount = await getAccountDetail();
  console.log(availableAccount);
  const checkCurrentSelectedBankId = availableAccount.filter((item) => {
    return item.id === id;
  });
  return checkCurrentSelectedBankId;
};

/** [결제 페이지] 결제버튼 로직 */
const handlePaymentBtnLogic = async (e) => {
  const currentSelectedBankId = $('.swiper-slide-active').dataset.accountId;
  const productIds = shoppingCartArr.map((items) => {
    return items.id;
  });
  const totalProductPrice = renderCartTotalPrice();
  console.log(totalProductPrice);
  console.log('현재 선택한 계좌 id', currentSelectedBankId);
  console.log('결제할 제품 id', ...productIds);
  const getCurrentSelectedAccount = await checkBalanceOfselectedBankAccount(
    currentSelectedBankId,
  );
  console.log('getCurrentSelectedAccount', getCurrentSelectedAccount);
  const getCurrentSelectedAccountBalance =
    getCurrentSelectedAccount[0]['balance'];

  // 결제 성공 했을 때
  if (getCurrentSelectedAccountBalance >= totalProductPrice) {
    productIds.map(async (productId) => {
      await buyItemAPI(productId, currentSelectedBankId);
      // localStorage shoppingCart 비워주기
      shoppingCartStore.removeLocalStorage();
      return;
    });
    // 결제 성공 alert
    alert('결제가 성공적으로 되었습니다. 구매내역으로 이동합니다.');
    router.navigate('/mypage/order');
  } else if (getCurrentSelectedAccountBalance < totalProductPrice) {
    // 결제 실패 했을 때
    alert('해당 계좌의 잔액이 부족합니다.');
    return;
  }
};
