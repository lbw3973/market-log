// productDetail 제품 상세페이지
// 라우터 라이브러리
import Navigo from 'navigo';
const router = new Navigo('/');
import heart from '../../../../public/heart.svg';
const $ = (selector) => document.querySelector(selector);

/** 장바구니 localStorage */
export const shoppingCartStore = {
  setLocalStorage(product) {
    localStorage.setItem('shoppingCart', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
  },
  removeLocalStorage() {
    localStorage.removeItem('shoppingCart')[0];
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

const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';
HEADERS = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_Team3',
};

/** 상세 제품 db에서 불러오기 */
const getDetailProduct = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '해당 제품을 불러오기 실패');
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

  // 총 금액 계산, 제품title, thumbnail
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
  <div class="main-container" data-product-id="${id}">
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
            <button>
              <img src="${heart}" alt="찜하기 버튼" />
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

  $('.main').innerHTML = detailProductTemplate;
};

const init = () => {
  if (shoppingCartStore.getLocalStorage().length > 0) {
    shoppingCartArr = shoppingCartStore.getLocalStorage();
  }
  renderDetailProduct('cMciAKoHplCj2VjRs4FA');
  // renderDetailProduct('uXaJcS1hQwq1LPZgcrkQ');
  // shoppingCartStore.setLocalStorage(shoppingCartArr);
};
init();

/** 렌더 함수 for navigo */

const renderPage = (html) => {
  $('.main').innerHTML = html;
};

/** navigo 장바구니, 계속쇼핑하기 버튼 클릭 시 이동 */
// $('.goToCart').addEventListener('click', () => {
//   router.on({
//     '/cart': () => {
//       $('.modal__addCart').style.display = 'none';
//       renderPage(renderCartPage);
//     },
//   });
// });

/** 구매수량 추가 핸들링 이벤트 */
$('.main').addEventListener('click', (e) => {
  updateInfo(e);
});

/** 구매수량 핸들링 함수 */
const updateInfo = async (e) => {
  // 구매수량 -
  if (e.target.classList.contains('minusQtyBtn')) {
    productDetailProductQty -= 1;
    if (productDetailProductQty === 0) {
      productDetailProductQty = 1;
    }

    renderDetailProduct('cMciAKoHplCj2VjRs4FA');
    // renderDetailProduct('uXaJcS1hQwq1LPZgcrkQ');
    // shoppingCartStore.setLocalStorage(shoppingCartArr);
    return;
  }
  // 구매수량 +
  if (e.target.classList.contains('addQtyBtn')) {
    productDetailProductQty += 1;

    renderDetailProduct('cMciAKoHplCj2VjRs4FA');
    // renderDetailProduct('uXaJcS1hQwq1LPZgcrkQ');
    return;
  }
  shoppingCartStore.setLocalStorage(shoppingCartArr);
};

/** 장바구니 담기 핸들 이벤트 */
$('.main').addEventListener('click', (e) => {
  pushInCart(e);
});

/** 장바구니 담기 핸들 함수 */
const pushInCart = (e) => {
  if (e.target.classList.contains('addCartBtn')) {
    const id = e.target.closest('.main-container').dataset.productId;
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
  if (e.target.classList.contains('addCartBtn')) {
    $('.modal__addCart').style.display = 'block';
    return;
  }

  // '모달 창 밖에 클릭 시 닫기'
  if (e.target !== $('.modal__addCart')) {
    $('.modal__addCart').style.display = 'none';
    return;
  }

  // '장바구니 바로가기' 버튼 클릭 시, navigo 장바구니로 가기
  if (e.target === $('.goToCart')) {
    $('.modal__addCart').style.display = 'none';
    return;
  }
};

/*-----------------------------------*\
  #cart js
\*-----------------------------------*/

let cartProductTotalPrice;

// 장바구니 페이지 초기 렌더링
const renderInitCartPage = `
<section class="cart">
  <div class="cart__header"><h2>장바구니</h2></div>
  <div class="cart__container">
    <ul class="cart__list"></ul>

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
            <span>베송비</span>
            <p class="cartDeliveryPrice">0 원</p>
          </div>
        </div>
        <div class="cart__price--total">
          <span>총 결제 금액</span>
          <p class="cartTotalPrice">0 원</p>
        </div>
      </div>
      <a href="#" data-navigo
        ><button class="cart__price--paymentBtn carPaymentBtn">
          결제하기
        </button></a
      >
    </aside>
  </div>
</section>
`;

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
        <a href="#" data-navigo
          ><span class="cart__item-info--title">
            ${title}
          </span></a
        >
      </div>
      <div class="cart__item--calc">
        <div class="cart__item--calc-count">
          <button class="cart-minusQtyBtn">-</button>
          <p class="cartProductQty">${count}</p>
          <button class="cart-addQtyBtn">+</button>
        </div>
        <span class="cart__item--price cartProductTotalPrice">${price}</span>
        <button class="cart__item--deleteBtn cartProductDeleteBtn">X</button>
      </div>
    </li>
    `;
    })
    .join('');

  $('.main').querySelector('.cart__list').innerHTML = cartListTemplate;
};

router.on({
  '/cart': () => {
    $('.modal__addCart').style.display = 'none';
    // ul태그 삽입
    renderPage(renderInitCartPage);
    console.log('/cart');

    console.log('347', shoppingCartArr);
    // $('.main').querySelector('.cart__list').innerHTML = cartListTemplate;
    renderCartList(shoppingCartArr);
  },
});

// const cartListTemplate = shoppingCartArr
//   .map((item) => {
//     const { id, price, count, thumbnail, title } = item;
//     cartProductTotalPrice = price;
//     console.log('cartListTemplate', shoppingCartArr);
//     return `
//     <li class="cart__item" data-product-id="${id}">
//       <div class="cart__item-info">
//         <div class="cart__item-info--checkbox">
//           <input type="checkbox" checked />
//         </div>
//         <a href="#" data-navigo
//           ><div class="cart__item-info--img">
//             <img
//               src="${thumbnail}"
//               alt="${title}"
//             /></div
//         ></a>
//         <a href="#" data-navigo
//           ><span class="cart__item-info--title">
//             ${title}
//           </span></a
//         >
//       </div>
//       <div class="cart__item--calc">
//         <div class="cart__item--calc-count">
//           <button class="cart-minusQtyBtn">-</button>
//           <p class="cartProductQty">${count}</p>
//           <button class="cart-addQtyBtn">+</button>
//         </div>
//         <span class="cart__item--price cartProductTotalPrice">${price.toLocaleString()} 원</span>
//         <button class="cart__item--deleteBtn cartProductDeleteBtn">X</button>
//       </div>
//     </li>
//     `;
//   })
//   .join('');

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
$('.main').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;
  if (e.target.classList.contains('cart-addQtyBtn')) {
    storeLocalStorage(id);
    console.log(e.target);
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    renderCartList(shoppingCartArr);
    // return;
  }

  // 구매수량 -
  if (e.target.classList.contains('cart-minusQtyBtn')) {
    const existingItem = shoppingCartArr.find((item) => item.id === id);
    console.log('existingItem', existingItem);

    if (existingItem) {
      if (existingItem.price > existingItem.pricePerOne) {
        existingItem.price -= existingItem.pricePerOne;
      }
      if (existingItem.qty > 1) {
        existingItem.qty -= 1;
        return;
      }
      if (existingItem.count > 1) {
        existingItem.count -= 1;
      }

      shoppingCartStore.setLocalStorage(shoppingCartArr);
      renderCartList(shoppingCartArr);
      // return;
    }
    // return;
  }
});

/** 빈 장바구니일 때 화면에 표시 */
const cartListEmptyTemplate = `
    <div class="cart__empty">
      <img src="${cartSVG}" alt="빈 장바구니" />
      <h3>장바구니가 비었습니다.</h3>
      <a href="/" data-navigo><button>쇼핑하러 가기</button></a>
    </div>
  `;

//   $('.cart__list').innerHTML = cartListEmptyTemplate;
// };

// /** 장바구니 localStorage length가 0일 때 '장바구니 비었다는 표시'
//  * 아니면 localStorage 상품 렌더링 */
// shoppingCartStore.getLocalStorage().length === 0
//   ? renderEmptyCart()
//   : renderCartList();

// /** 장바구니 총 가격 렌더링 */
// const renderCartPrice = () => {
//   // const cartPriceTemplate =
// };
