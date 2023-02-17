import Navigo from 'navigo';
import { htmlMypage_Nav, renderMyPageNav } from './page/mypage.js';
import { htmlMypage_Account, initFuncAccount } from './page/mypage/account';
import { htmlMypage_MyHeart, initFuncMyHeart } from './page/mypage/myheart';
import {
  htmlMypage_OrderHistory,
  initFuncOrderHistory,
} from './page/mypage/orderhistory';
import { htmlLogin, renderInitHeaderLogin, initFuncLogin } from './page/login';
import { htmlSignup, initFuncSignup } from './page/signup';
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
      console.log('route to ////////');

      renderInitHeaderLogin();
    },
    '/mypage': () => {
      console.log('route to mypage!!');

      if (getLoginStatus() === false) {
        alertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      $('.app').innerHTML = htmlMypage_Nav;
      router.navigate('mypage/orderHistory');
    },
    '/mypage/orderHistory': async () => {
      console.log('route to mypage/orderHistory!!');

      if (getLoginStatus() === false) {
        alertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      renderMyPageNav(htmlMypage_OrderHistory);
      initFuncOrderHistory();
    },
    '/mypage/account': async () => {
      console.log('route to mypage/account!!');

      if (getLoginStatus() === false) {
        alertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      // divLoadingEl.style.display = 'block';
      renderMyPageNav(htmlMypage_Account);
      await initFuncAccount();
      // divLoadingEl.style.display = 'none';
    },
    '/mypage/myHeart': async () => {
      console.log('route to mypage/myHeart!!');

      if (getLoginStatus() === false) {
        alertPlzLogin();
        return;
      }
      renderInitHeaderLogin();
      renderMyPageNav(htmlMypage_MyHeart);
      initFuncMyHeart();
    },
    '/mypage/myPersonalInfoModify': () => {
      console.log('route to mypage/myPersonalInfoModify!!');

      if (getLoginStatus() === false) {
        alertPlzLogin();
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
