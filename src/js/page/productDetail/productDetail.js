/*-----------------------------------*\
  제품 상세 페이지  #productDetail js
\*-----------------------------------*/

import Navigo from 'navigo';
// const router = new Navigo('/');
import { router } from '../../testJaeha.js';
const $ = (selector) => document.querySelector(selector);
import { addHeart, emptyHeart } from '../../importIMGFiles.js';
import { cartSVG } from '../../../../public/cart.svg';
import { getDetailProduct } from '../../api.js';

/** Navigo innerHTML template */
export const renderPage = (html) => {
  $('.app').innerHTML = html;
};

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

/** 찜하기 상품 유/무에 따라 다른 초기화면 렌더링 */
export const checkWhetherAddWishList = (id) => {
  let wishListArr = wishListStore.getLocalStorage();
  // console.log('wishListArr', wishListArr);
  const existingItem = wishListArr.find((item) => item.id === id);
  // console.log('existingItem', existingItem);
  return existingItem ? addHeart : emptyHeart;
};

/** 찜하기 목록에 저장 */
export const storeWishList = (id, count, thumbnail, title, pricePerOne) => {
  let wishListArr = wishListStore.getLocalStorage();
  const existingItem = wishListStore
    .getLocalStorage()
    .find((item) => item.id === id);

  if (!existingItem) {
    wishListArr.push({ id, count, thumbnail, title, pricePerOne });
    wishListStore.setLocalStorage(wishListArr);
    console.log('wishListArr', wishListArr);
  } else if (existingItem) {
    wishListArr = wishListArr.filter((item) => item.id !== id);
    console.log('wishListArr 이미 찜', wishListArr);
    wishListStore.setLocalStorage(wishListArr);
  }
  console.log('wishListArr2', wishListArr);
};

///////////////////////////

/** [제품 상세페이지] skeleton ui 초기 렌더링 */
export const renderSkeletonUIinDetailProductPage = () => {
  const skeletonUITemplate = `
    <div class="productDetail__skeleton--container">
      <div class="productDetail__skeleton--img"></div>
      <div class="productDetail__skeleton--aside">
        <div class="productDetail__skeleton--aside-desc"></div>
        <div class="productDetail__skeleton--aside-desc"></div>
        <div class="productDetail__skeleton--aside-desc"></div>
        <div class="productDetail__skeleton--aside-desc"></div>
      </div>
    </div>
`;

  const skeletonUI12 = Array(1)
    .fill(skeletonUITemplate)
    .map((v, i) => {
      return v;
    })
    .join('');

  $('.app').innerHTML = skeletonUI12;
};
/** 장바구니에 저장 */
export const storeCart = (id, price, count, thumbnail, title, pricePerOne) => {
  let shoppingCartArr = shoppingCartStore.getLocalStorage();
  // id 값을 찾고
  const existingItem = shoppingCartArr.find((item) => item.id === id);
  // 새로운 아이템이면 추가
  if (!existingItem) {
    shoppingCartArr.push({ id, price, count, thumbnail, title, pricePerOne });
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    console.log('shoppingCartArr.push', shoppingCartStore.getLocalStorage());
    console.log('shoppingCartArr.push', shoppingCartArr);
    return;
  } else if (existingItem) {
    // 이미 아이템이면 기존 수량, 가격에 누적 추가
    existingItem.count += count;
    existingItem.price += price;
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    return;
  }
  console.log(shoppingCartArr);
};

/** 구매 수량 */
let productDetailProductQty = 1;
/** 총 상품 금액 */
let productDetailTotalPrice;
let productDetailTitle;
let productDetailThumbnail;
let productDetailPricePerOne;

/** [제품 상세페이지] 렌더링 함수 */
export const renderDetailProduct = async (productId) => {
  renderSkeletonUIinDetailProductPage();
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

/** [제품 상세 페이지] 장바구니 담기 핸들 함수 */
export const pushInCart = (e) => {
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
    // shoppingCartStore.setLocalStorage(shoppingCartStore.getLocalStorage());
    console.log('shoppingCartArr.push', shoppingCartStore.getLocalStorage());
  }
};

/** 모달 핸들 함수 */
export const handleModal = (e) => {
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

/** 모달 핸들 이벤트 */
document.body.addEventListener('click', (e) => {
  handleModal(e);
});

/** 장바구니 총 가격 렌더링 */
export const renderCartTotalPrice = () => {
  const cartTotalPrice = shoppingCartStore
    .getLocalStorage()
    .map((items) => items.price);
  const cartTotalPriceReduce = cartTotalPrice.reduce((acc, val) => {
    return acc + val;
  }, 0);

  // cartTotalOrderPrice = cartTotalPriceReduce;
  return cartTotalPriceReduce;
};

// 장바구니 페이지 초기 렌더링
export const renderInitCartPage = `
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
export const renderCartOrderPrice = () => {
  // [장바구니] 총 결제 금액
  // cartTotalPaymentPrice =
  //   cartTotalOrderPrice + cartDiscountPrice + cartDeliveryPrice;
  const cartOrderPriceTemplate = `
  <div class="cart__price--border">
    <div class="cart__price--calc">
      <div class="cart__price--calc-orderPrice">
        <span class="cartOrderPrice">총 주문 금액</span>
        <p class="cartOrderPrice">${renderCartTotalPrice().toLocaleString()} 원</p>
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
      <p class="cartTotalPaymentPrice">${renderCartTotalPrice().toLocaleString()} 원</p>
    </div>
  </div>
  <button class="cart__price--paymentBtn cartPaymentBtn">
    결제하기
  </button>
`;

  $('.app').querySelector('.cart__price').innerHTML = cartOrderPriceTemplate;
};

export const renderCartList = (storage) => {
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
        <button class="cart__item--deleteBtn cartProductDeleteBtn">삭제</button>
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
export const storeLocalStorage = (id) => {
  let shoppingCartArr = shoppingCartStore.getLocalStorage();
  const existingItem = shoppingCartArr.find((item) => item.id === id);
  console.log('existingItem', existingItem);

  if (existingItem) {
    existingItem.price += existingItem.pricePerOne;
    existingItem.qty += 1;
    existingItem.count += 1;
    shoppingCartStore.setLocalStorage(shoppingCartArr);
  }
  // shoppingCartArr
  console.log('장바구니에서 ++', shoppingCartArr);
};

/** 빈 장바구니일 때, 상품이 있는 장바구니일 때 */
export const renderCartPage = () => {
  if (shoppingCartStore.getLocalStorage().length === 0) {
    renderCartList(shoppingCartStore.getLocalStorage());
    renderPage(renderInitCartPage);
    return;
  } else if (shoppingCartStore.getLocalStorage().length >= 1) {
    // 장바구니에 넣은 상품 렌더링
    renderCartList(shoppingCartStore.getLocalStorage());
    // 결제금액 렌더링
    renderCartTotalPrice();
    return;
  }
};

/** 구매수량 핸들링 함수 */
export const updateInfo = async (e, productId) => {
  let shoppingCartArr = shoppingCartStore.getLocalStorage();
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
    console.log('저장+');
    productDetailProductQty += 1;

    renderDetailProduct(productId);
    // renderCartPage();
    return;
  }

  shoppingCartStore.setLocalStorage(shoppingCartArr);
};

/** 제품 상세 페이지 찜하기 버튼 핸들링 이벤트  */
$('.app').addEventListener('click', (e) => {
  if (e.target.classList.contains('aside__productDetail--info-wishlistImg')) {
    const id = e.target.closest('.section__container')?.dataset.productId;
    console.log('id', id);
    const count = 1;
    const title = productDetailTitle;
    const thumbnail = productDetailThumbnail;
    const pricePerOne = productDetailPricePerOne;

    storeWishList(id, count, thumbnail, title, pricePerOne);
    wishListStore.setLocalStorage(wishListStore.getLocalStorage());
    renderDetailProduct(id);
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
    if (window.localStorage.getItem('token')) {
      router.navigate('/payment');
    } else {
      alert('로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다.');
      // 로그인 페이지로 이동
      router.navigate('/');
    }
    return;
  }
});
