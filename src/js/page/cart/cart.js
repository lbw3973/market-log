// import { shoppingCartStore } from '../productDetail/productDetail.js';

export const shoppingCartStore = {
  setLocalStorage(product) {
    localStorage.setItem('shoppingCart', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart') || []);
  },
};
const $ = (selector) => document.querySelector(selector);

/** 장바구니 렌더링 */
const renderCartList = (cartItem) => {
  const cartListTemplate = cartItem
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
              src="../../public/IMGproductDetail/bluetooth_keyboard.jpeg"
              alt="thumbnail"
            /></div
        ></a>
        <a href="#"
          ><span class="cart__item-info--title">
            엑토 마인 무선 저소음 광마우스(+리시버) AWM-03
          </span></a
        >
      </div>
      <div class="cart__item--calc">
        <div class="cart__item--calc-count">
          <button>-</button>
          <p>1</p>
          <button>+</button>
        </div>
        <span class="cart__item--price">30000 원</span>
        <button class="cart__item--deleteBtn">X</button>
      </div>
    </li>
    `;
    })
    .join('');

  $('.cart__list').innerHTML = cartListTemplate;
};
const cartIdLocalStorage = shoppingCartStore.getLocalStorage();
console.log(cartIdLocalStorage);
renderCartList(cartIdLocalStorage);

/** 장바구니 총 가격 렌더링 */
const renderCartPrice = () => {
  // const cartPriceTemplate =
};
