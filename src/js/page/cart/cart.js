/*-----------------------------------*\
  # 장바구니 페이지 cart js
\*-----------------------------------*/

import Navigo from 'navigo';
import { router } from '../../testJaeha.js';
import {
  pushInCart,
  renderDetailProduct,
  updateInfo,
} from '../productDetail/productDetail.js';
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
    return localStorage.removeItem('shoppingCart');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

/** 버튼 요소 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  // [장바구니 페이지]에서 장바구니에 상품이 없을 때, '계속 쇼핑하기' 버튼 클릭 -> [메인페이지]로 이동
  if (e.target.classList.contains('cartEmpty-goToShoppingBtn')) {
    console.log(e.target);
    router.navigate('/category/keyboards');
    return;
  }

  // [장바구니]에서 '구매하기' 버튼 클릭 클릭 -> [결제 페이지]로 이동
  if (e.target.classList.contains('cartPaymentBtn')) {
    console.log(e.target);
    if (localStorage.getItem('token')) {
      router.navigate('/payment');
    } else {
      alert('로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다.');
      // 로그인 페이지로 이동
      router.navigate('/');
    }
    return;
  }
});

/** 구매수량 추가 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  const detailProductId = e.target.closest('.section__container')?.dataset
    .productId;
  updateInfo(e, detailProductId);
});

/** 장바구니 담기 핸들링 이벤트 */
$('.app').addEventListener('click', (e) => {
  pushInCart(e);
});
