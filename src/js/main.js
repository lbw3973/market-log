//최상단버튼
// let toTop = document.querySelector('#to-top');

// window.addEventListener('scroll', () => {
//   let scrollY = window.scrollY;
//   if (scrollY > 200) {
//     toTop.classList.add('on');
//     if (scrollY < 200) {
//       toTop.classList.add('on');
//       // 색반전 주기
//     } else {
//       toTop.classList.remove('on');
//     }
//   }
// });
// toTop.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// import * as signup from './page/signup';
// import * as productDetail from './page/productDetail/productDetail';
import { mpBestDesign, mpNewProduct, mpWeekly } from './renderMainPage.js';
import Navigo from 'navigo';
const $ = (selector) => document.querySelector(selector);

const renderInitMainPage = () => {
  // renderMainPage('');
  renderMainPage(mpWeekly);
  renderMainPage(mpNewProduct);
  renderMainPage(mpBestDesign);
};
/** 렌더 함수 for navigo */
const renderMainPage = (html) => {
  console.log(html);
  const mainPageAll = document.querySelector('.app');
  mainPageAll.innerHTML += html;
  //mainPageAll.innerHTML = '';
  //mainPageAll.append(html);
};
/** navigo router */
const router = new Navigo('/');
router
  .on({
    '/': () => {
      renderInitMainPage();
      console.log('contentsMainPage    contentsMainPage');
    },
    '/signup': () => {
      console.log('signup    signup');
    },
    '/login': () => {
      console.log('login    login');
    },
    '/cart': () => {
      console.log('cart    cart');
    },
    '/hart': () => {
      console.log('hart    hart');
    },
    '/mypage': () => {
      console.log('mypage    mypage');
    },
    '/productDetail': () => {
      console.log('productDetail    productDetail');
    },
  })
  .resolve();
