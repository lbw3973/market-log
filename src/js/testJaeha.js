import Navigo from 'navigo';
export const router = new Navigo('/');
const $ = (selector) => document.querySelector(selector);

import { handleCartPage, shoppingCartStore } from './page/cartPage/cartPage.js';
import {
  handleMainPage,
  renderMainPageTemplate,
} from './page/mainPage/mainPage.js';
import {
  renderInitCategoryPage,
  renderSkeletonUIinCategoryPage,
  renderCategoryProductList,
  getProductTags,
  getSortedLowToHighPriceProduct,
  getSortedHighToLowPriceProduct,
  renderCategoryProductBySelect,
  renderCategoryProductQty,
  handleCategoryPage,
} from './page/categoryPage/categoryPage.js';
import { handleSearchPage } from './page/searchPage/searchPage.js';
import { handleDetailProductPage } from './page/productDetail/productDetail.js';
import {
  renderInitMypageTemplate,
  handleWishListPage,
} from './page/wishListPage/wishListPage.js';
import { renderOrderedListPage } from './page/orderHistory/orderHistory.js';
import {
  renderSkeletonUIinDetailOrderHistoryPage,
  renderDetailOrderPage,
} from './page/detailOrderHistoryPage/detailOrderHistory.js';

import { handlePaymentPage } from './page/paymentPage/paymentPage.js';

/** Navigo innerHTML template */
export const renderPage = (html) => {
  $('.app').innerHTML = html;
};

/** 날짜 format 함수 */
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

/*-----------------------------------*\
  제품 상세 페이지 이벤트 #productDetail js
\*-----------------------------------*/

/*-----------------------------------*\
  찜하기 페이지 이벤트 #wishList js
\*-----------------------------------*/

/*-----------------------------------*\
  주문 내역 페이지 이벤트 #orderHistory js
\*-----------------------------------*/

// productDetail 제품 상세페이지

import cartSVG from '../../public/cart.svg';

/*-----------------------------------*\
  # 장바구니 페이지 cart js
\*-----------------------------------*/

/*-----------------------------------*\
  # 결제 페이지 # pay js
\*-----------------------------------*/

/*-----------------------------------*\
  # navigo router
\*-----------------------------------*/

router
  .on({
    '/': async () => {
      handleMainPage();
    },
    '/products/search': async () => {
      await handleSearchPage();
    },
    '/product/:id': async (params) => {
      console.log('product/:id route is working');
      await handleDetailProductPage(params.data.id);
    },
    '/cart': () => {
      handleCartPage();
    },
    '/payment': async () => {
      await handlePaymentPage();
    },
    '/category/keyboards': async () => {
      await handleCategoryPage(0);
    },
    '/category/keycaps': async () => {
      await handleCategoryPage(1);
    },
    '/category/switches': async () => {
      await handleCategoryPage(2);
    },
    '/category/accessories': async () => {
      await handleCategoryPage(3);
    },
    // 마이페이지 찜하기 목록
    '/mypage/wishlist': () => {
      // renderWishListPage();
      handleWishListPage();
    },
    // 마이페이지 주문내역 목록
    '/mypage/order': async () => {
      await renderOrderedListPage();
    },
    '/mypage/order/:id': async (params) => {
      console.log('order params', params);
      renderPage(renderInitMypageTemplate);
      renderSkeletonUIinDetailOrderHistoryPage();
      console.log(params.data.id);
      await renderDetailOrderPage(params.data.id);
    },
  })
  .resolve();
