import Navigo from 'navigo';
import { $ } from './utils/dom.js';
import { handleMyPage } from './page/mypage.js';
import { handleAccountPage } from './page/mypage/account';
import { handleLoginPage } from './page/login';
import { handleSignupPage } from './page/signup';
import { handleCartPage } from './page/cartPage/cartPage.js';
import { handleMainPage } from './page/mainPage/mainPage.js';
import { handleCategoryPage } from './page/categoryPage/categoryPage.js';
import { handleSearchPage } from './page/searchPage/searchPage.js';
import { handleDetailProductPage } from './page/productDetail/productDetail.js';
import { handleWishListPage } from './page/wishListPage/wishListPage.js';
import { handlePaymentPage } from './page/paymentPage/paymentPage.js';
import { handleOrderHistoryPage } from './page/mypage/orderhistory.js';
import { handleeditPersonalInfoPage } from './page/mypage/editPersonaInfo.js';

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

const $ = (selector) => document.querySelector(selector);
export const router = new Navigo('/');
const divLoadingEl = $('.loadingGif');

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
      handleMyPage();
    },
    '/mypage/wishlist': () => {
      handleWishListPage();
    },
    '/mypage/order': () => {
      handleOrderHistoryPage();
    },
    '/mypage/account': async () => {
      handleAccountPage();
    },
    '/mypage/editPersonalInfo': () => {
      handleeditPersonalInfoPage();
    },
    '/login': () => {
      handleLoginPage();
    },
    '/signup': () => {
      handleSignupPage();
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
