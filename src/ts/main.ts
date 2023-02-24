import Navigo from 'navigo';
import { $ } from './utils/dom';
import { handleMyPage } from './page/mypage';
import { handleAccountPage } from './page/mypage/account';
import { handleLoginPage } from './page/login';
import { handleSignupPage } from './page/signup';
import { handleCartPage } from './page/cartPage/cartPage';
import { handleMainPage } from './page/mainPage/mainPage';
import { handleCategoryPage } from './page/categoryPage/categoryPage';
import { handleSearchPage } from './page/searchPage/searchPage';
import { handleDetailProductPage } from './page/productDetail/productDetail';
import { handleWishListPage } from './page/wishListPage/wishListPage';
import { handlePaymentPage } from './page/paymentPage/paymentPage';
import { handleOrderHistoryPage } from './page/mypage/orderhistory';
import { handleeditPersonalInfoPage } from './page/mypage/editPersonalInfo';

import { productHandler } from './page/admin/product';
import { dashboardHandler } from './page/admin/dashboard';
import { orderHandler } from './page/admin/order';
import { productAddHandler } from './page/admin/productAdd';
import { productDetailHandler } from './page/admin/productDetail';
import { productEditHandler } from './page/admin/productEdit';
import { orderDetailHandler } from './page/admin/orderDetail';
import { handleDetailOrderHistoryPage } from './page/detailOrderHistoryPage/detailOrderHistory';
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
import { Params } from './interface/params';

export const router = new Navigo('/');
export const divLoadingEl = $('.loadingGif');

const renderContainer = () => {
  $('.app').innerHTML = `<div class="container"></div>`;
};

const render = (html: string) => {
  $('.container').innerHTML = html;
};

const initPage = (page: string) => {
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
    '/product/:id': (params: Params) => {
      // renderSkeletonUIinDetailProductPage();
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
    '/mypage/order/:id': (params: Params) => {
      handleDetailOrderHistoryPage(params.data.id);
    },
    '/mypage/account': () => {
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
    '/admin/order/:id': (params: Params) => {
      initPage(orderDetailPage);
      orderDetailHandler(params.data.id);
    },
    '/admin/product/add': () => {
      initPage(productAddPage);
      productAddHandler();
    },
    '/admin/product/:id': (params: Params) => {
      initPage(productDetailPage);
      productDetailHandler(params.data.id);
    },
    '/admin/product/edit/:id': (params: Params) => {
      initPage(productEditPage);
      productEditHandler(params.data.id);
    },
  })
  .resolve();
