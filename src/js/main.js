import Navigo from 'navigo';
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
const $ = (selector) => document.querySelector(selector);
export const router = new Navigo('/');
const divLoadingEl = $('.loadingGif');

function getLoginStatus() {
  return localStorage.getItem('token') ? true : false;
}
function showAlertPlzLogin() {
  alert('로그인해라');
  router.navigate('/login');
}

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
      // divLoadingEl.style.display = 'none';
    },
    // '/mypage/myHeart': async () => {
    //   console.log('route to mypage/myHeart!!');

    //   if (getLoginStatus() === false) {
    //     showAlertPlzLogin();
    //     return;
    //   }
    //   renderInitHeaderLogin();
    //   renderMyPageNav(htmlMypage_MyHeart);
    //   initFuncMyHeart();
    // },
    '/mypage/myPersonalInfoModify': () => {
      console.log('route to mypage/myPersonalInfoModify!!');

      if (getLoginStatus() === false) {
        showAlertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      renderMyPageNav('');
    },
    '/login': () => {
      console.log('route to /login!!');

      $('.app').innerHTML = htmlLogin;
      initFuncLogin();
    },
    '/signup': () => {
      console.log('route to /signup!!');

      $('.app').innerHTML = htmlSignup;
      initFuncSignup();
    },
  })
  .resolve();
