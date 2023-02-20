import Navigo from 'navigo';
import { $ } from './utils/dom.js';
import { htmlMypage_Nav, renderMyPageNav } from './page/mypage.js';
import { htmlMypage_Account, initFuncAccount } from './page/mypage/account';
// import { htmlMypage_MyHeart, initFuncMyHeart } from './page/mypage/wishlist';
import {
  htmlMypage_OrderHistory,
  initFuncOrderHistory,
} from './page/mypage/orderhistory';
import { htmlLogin, renderInitHeaderLogin, initFuncLogin } from './page/login';
import { htmlSignup, initFuncSignup } from './page/signup';
import { handleCartPage } from './page/cartPage/cartPage.js';
import { handleMainPage } from './page/mainPage/mainPage.js';
import { handleCategoryPage } from './page/categoryPage/categoryPage.js';
import { handleSearchPage } from './page/searchPage/searchPage.js';
import { handleDetailProductPage } from './page/productDetail/productDetail.js';
import { handleWishListPage } from './page/wishListPage/wishListPage.js';
import { handleDetailOrderHistoryPage } from './page/detailOrderHistoryPage/detailOrderHistory.js';
import { handlePaymentPage } from './page/paymentPage/paymentPage.js';
import { handleOrderHistoryPage } from './page/mypage/orderhistory.js';
import { renderPage } from './utils/render.js';

import { productHandler } from './page/admin/product.js';
import { dashboardHandler } from './page/admin/dashboard.js';
import { orderHandler } from './page/admin/order.js';
import { productAddHandler } from './page/admin/productAdd.js';
import { productDetailHandler } from './page/admin/productDetail.js';
import { productEditHandler } from './page/admin/productEdit.js';
import { orderDetailHandler } from './page/admin/orderDetail.js';

import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
  productDetailPage,
  productEditPage,
  sideBar,
  orderDetailPage,
} from './page/admin/renderTemplate';

export const router = new Navigo('/');
export const divLoadingEl = $('.loadingGif');

function getLoginStatus() {
  return localStorage.getItem('token') ? true : false;
}
function showAlertPlzLogin() {
  alert('로그인해라');
  router.navigate('/login');
}

const renderContainer = () => {
  $('.app').innerHTML = `<div class="container"></div>`;
};

const render = (html) => {
  $('.container').innerHTML = html;
};

const initPage = (page) => {
  renderContainer();
  render(sideBar);
  $('.container').insertAdjacentHTML('beforeend', page);
};

/** navigo router */
router
  .on({
    '/': () => {
      handleMainPage();
    },
    '/products/search': () => {
      handleSearchPage();
    },
    '/product/:id': (params) => {
      handleDetailProductPage(params.data.id);
    },
    '/cart': () => {
      handleCartPage();
    },
    '/payment': () => {
      handlePaymentPage();
    },
    '/category/keyboards': () => {
      handleCategoryPage(0);
    },
    '/category/keycaps': () => {
      handleCategoryPage(1);
    },
    '/category/switches': () => {
      handleCategoryPage(2);
    },
    '/category/accessories': () => {
      handleCategoryPage(3);
    },
    '/mypage': () => {
      if (getLoginStatus() === false) {
        showAlertPlzLogin();
        return;
      }
      renderPage(htmlMypage_Nav);
      router.navigate('mypage/order');
    },
    '/mypage/wishlist': () => {
      handleWishListPage();
    },
    '/mypage/order': () => {
      handleOrderHistoryPage();
    },
    '/mypage/account': async () => {
      if (getLoginStatus() === false) {
        showAlertPlzLogin();
        return;
      }

      renderMyPageNav(htmlMypage_Account);
      await initFuncAccount();
    },
    '/mypage/myPersonalInfoModify': () => {
      if (getLoginStatus() === false) {
        showAlertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      renderMyPageNav('');
    },
    '/login': () => {
      $('.app').innerHTML = htmlLogin;
      initFuncLogin();
    },
    '/signup': () => {
      $('.app').innerHTML = htmlSignup;
      initFuncSignup();
    },
    '/admin': () => {
      initPage(dashboardPage);
      dashboardHandler();
    },
    '/admin/product': () => {
      initPage(productPage);
      productHandler();
    },
    '/admin/order': () => {
      initPage(orderPage);
      orderHandler();
    },
    '/admin/order/:id': (params) => {
      initPage(orderDetailPage);
      orderDetailHandler(params.data.id);
    },
    '/admin/product/add': () => {
      initPage(productAddPage);
      productAddHandler();
    },
    '/admin/product/:id': (params) => {
      initPage(productDetailPage);
      productDetailHandler(params.data.id);
    },
    '/admin/product/edit/:id': (params) => {
      initPage(productEditPage);
      productEditHandler(params.data.id);
    },
  })
  .resolve();
