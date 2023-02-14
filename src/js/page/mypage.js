// dotenv 사용 예시
import dotenv from 'dotenv';
import Navigo from 'navigo';
import chevronrightSVG from '../../../public/chevronright.svg';
import { htmlMypage_Account, initFuncAccount } from './mypage/account.js';
import { htmlMypage_MyHeart, initFuncMyHeart } from './mypage/myheart.js';
import {
  htmlMypage_OrderHistory,
  initFuncOrderHistory,
} from './mypage/orderhistory.js';
import { htmlLogin, initFuncLogin } from './login.js';
import { htmlSingup, initFuncSignup } from './signup.js';
import { renderPage } from '../main.js';
dotenv.config();
window.localStorage.clear(); // TODO : 삭제
const $ = (selector) => document.querySelector(selector);
export const router = new Navigo('/');

let navliList;

// HTML : mypage nav 목록
const htmlMypage_Nav = /* html */ `
<div class="mypage__app">
  <div class="mypage__container">
    <div class="mypage__navbar">
      <h1>마이페이지</h1>
      <nav>
        <ul>
          <li>
            <a href="/mypage/orderHistory" data-navigo id="mpOrderHistory">주문 내역
              <img src="${chevronrightSVG}" alt="chevronright">
            </a>
          </li>
          <li>
            <a href="/mypage/account" data-navigo id="mpAccount">계좌 관리
              <img src="${chevronrightSVG}" alt="chevronright">
            </a>
          </li>
          <li>
            <a href="/mypage/myHeart" data-navigo id="mpMyHeart">찜한 상품
              <img src="${chevronrightSVG}" alt="chevronright">
            </a>
          </li>
          <li>
            <a href="/mypage/myPersonalInfoModify" data-navigo id="mpMyPersonalInfoModify">개인 정보 수정
              <img src="${chevronrightSVG}" alt="chevronright">
            </a>
          </li>
        </ul>
      </nav>
    </div>
  <div class="mypage__navigo__container"></div>
</div>
`;

export function initFunc() {
  const btnGetList = document.querySelector('.getlist'); // 삭제 예정
  const temporaryEl = document.querySelector('.temporary'); // 삭제 예정
  btnGetList.textContent = '은행 목록 가져오기'; // 삭제 예정

  // 삭제 예정
  btnGetList.addEventListener('click', () => {
    temporaryEl.style.display = 'none';
  });
}

export function renderMyPageNav(html) {
  $('.app').querySelector('.mypage__navigo__container').innerHTML = html;
  resetliActive();
  // divLoadingEl.style.display = 'block';
}

function resetliActive() {
  navliList = document.querySelectorAll('.mypage__navbar nav ul li');
  navliList.forEach((x) => x.classList.remove('active'));
}

router
  .on({
    // mypage
    '/': () => {},
    '/mypage': () => {
      console.log('route to mypage!!');
      $('.app').innerHTML = htmlMypage_Nav;
      router.navigate('mypage/orderHistory');
    },
    '/mypage/orderHistory': async () => {
      console.log('route to mypage/orderHistory!!');
      renderMyPageNav(htmlMypage_OrderHistory);
      initFuncOrderHistory();
      navliList[0].classList.add('active');
    },
    '/mypage/account': async () => {
      console.log('route to mypage/account!!');
      renderMyPageNav(htmlMypage_Account);
      initFuncAccount();
      navliList[1].classList.add('active');
    },
    '/mypage/myHeart': async () => {
      console.log('route to mypage/myHeart!!');
      renderMyPageNav(htmlMypage_MyHeart);
      initFuncMyHeart();
      navliList[2].classList.add('active');
    },
    '/mypage/myPersonalInfoModify': () => {
      console.log('route to mypage/myPersonalInfoModify!!');
      renderMyPageNav('');
      navliList[3].classList.add('active');
    },
    // login
    '/login': () => {
      console.log('route to /login!!');
      $('.app').innerHTML = htmlLogin;
      initFuncLogin();
    },
    // signup
    '/signup': () => {
      console.log('route to /signup!!');
      $('.app').innerHTML = htmlSingup;
      initFuncSignup();
    },
  })
  .resolve();

// 엑세스 토큰때문에 임시..
// const idEl = document.querySelector('.id');
// const passwordEl = document.querySelector('.password');
// const displayNameEl = document.querySelector('.display-name');
// const submitEl = document.querySelector('.signup');
// const authorizationEl = document.querySelector('.authorization');
// const loginEl = document.querySelector('.login');
// // const btnLogout = document.querySelector('.logout')

// let id = '';
// let pw = '';
// let displayName = '';

// idEl.addEventListener('input', (event) => {
//   id = event.target.value;
// });
// passwordEl.addEventListener('input', (event) => {
//   pw = event.target.value;
// });
// displayNameEl.addEventListener('input', (event) => {
//   displayName = event.target.value;
// });
// submitEl.addEventListener('click', () => {
//   request({
//     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
//     method: 'POST',
//     data: {
//       email: id,
//       password: pw,
//       displayName: displayName,
//     },
//   });
// });
// authorizationEl.addEventListener('click', async () => {
//   request({
//     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       masterKey: true,
//     },
//   });
// });
// loginEl.addEventListener('click', async () => {
//   loginEl.textContent = '로그인 시도 중...';
//   await request({
//     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
//     method: 'POST',
//     data: {
//       email: id,
//       password: pw,
//     },
//   });
//   loginEl.textContent = '로그인 완료';
// });
// // btnLogout.addEventListener('click', () => {
// //   request({
// //     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
// //     method: 'POST',
// //     headers: {
// //       ...headers,
// //       Authorization: `Bearer ${window.localStorage.getItem('token')}`
// //     }
// //   })
// // })

// async function request(options) {
//   const defaultOptions = {
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json',
//       apikey: 'FcKdtJs202301',
//       username: user_name,
//     },
//   };
//   const headers = options.headers || {};
//   const res = await fetch(options.url, {
//     method: options.method || defaultOptions.method,
//     headers: {
//       ...defaultOptions.headers,
//       ...headers,
//     },
//     body: options.data ? JSON.stringify(options.data) : undefined,
//   });
//   const json = await res.json();
//   window.localStorage.setItem('token', json.accessToken);
// }
