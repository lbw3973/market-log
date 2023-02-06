// import { shoppingCartStore } from '../productDetail/productDetail.js';
import cartSVG from '../../../../public/cart.svg';
const $ = (selector) => document.querySelector(selector);

export const shoppingCartStore = {
  setLocalStorage(product) {
    localStorage.setItem('shoppingCart', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
  },
};

const cartIdLocalStorage = shoppingCartStore.getLocalStorage();
console.log(cartIdLocalStorage);

/** 장바구니에 상품이 있을 떄 화면 렌더링 */
const renderCartList = (cartIdLocalStorage) => {
  const cartListTemplate = cartIdLocalStorage
    .map((item) => {
      return `
    <li class="cart__item" data-productId="${item.id}">
      <div class="cart__item-info">
        <div class="cart__item-info--checkbox">
          <input type="checkbox" checked />
        </div>
        <a href="#"
          ><div class="cart__item-info--img">
            <img
              src="${item.thumbnail}"
              alt="${item.title}"
            /></div
        ></a>
        <a href="#"
          ><span class="cart__item-info--title">
            ${item.title}
          </span></a
        >
      </div>
      <div class="cart__item--calc">
        <div class="cart__item--calc-count">
          <button>-</button>
          <p>1</p>
          <button>+</button>
        </div>
        <span class="cart__item--price">${item.price.toLocaleString()}원</span>
        <button class="cart__item--deleteBtn">X</button>
      </div>
    </li>
    `;
    })
    .join('');

  $('.cart__list').innerHTML = cartListTemplate;
};

/** 빈 장바구니일 떄 화면에 표시 */
const renderEmptyCart = () => {
  const cartListEmptyTemplate = `
    <div class="cart__empty">
      <img src="${cartSVG}" alt="빈 장바구니" />
      <h3>장바구니가 비었습니다.</h3>
      <a href="/" data-navigo><button>쇼핑하러 가기</button></a>
    </div>
  `;

  $('.cart__list').innerHTML = cartListEmptyTemplate;
};

/** 장바구니 localStorage length가 0일 때 '장바구니 비었다는 표시'
 * 아니면 localStorage 상품 렌더링 */
shoppingCartStore.getLocalStorage().length === 0
  ? renderEmptyCart()
  : renderCartList(cartIdLocalStorage);

/** 장바구니 총 가격 렌더링 */
const renderCartPrice = () => {
  // const cartPriceTemplate =
};
