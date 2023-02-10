// dotenv 사용 예시
import dotenv from 'dotenv';
import Navigo from 'navigo';
import { base_url, api_key, user_name, admin_email } from '../db.js'; // 로그인 부분 지우면 필요없음
import chevronrightSVG from '../../../public/chevronright.svg';
import { htmlMypage_Account, initFuncAccount } from './mypage/account.js';
import { htmlMypage_MyHeart, initFuncMyHeart } from './mypage/myheart.js';
import {
  htmlMypage_OrderHistory,
  initFuncOrderHistory,
} from './mypage/orderhistory.js';
dotenv.config();
window.localStorage.clear(); // TODO : 삭제

let navliList;

// HTML : mypage nav 목록
export const htmlMypage_Nav = /* html */ `
<div class="mypage__container">
  <div class="mypage__navbar">
    <h1>마이페이지</h1>
    <nav>
      <ul>
        <li>
          <a href="/mypage/orderHistory" data-navigo>
            <button id="mpOrderHistory">주문 내역</button>
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/account" data-navigo id="mpAccount">
            <button id="mpAccount">계좌 관리</button>
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/myHeart" data-navigo id="mpMyHeart">
            <button id="mpMyHeart">찜한 상품</button>
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/myPersonalInfoModify" data-navigo id="mpMyPersonalInfoModify">
            <button id="mpMyPersonalInfoModify">개인 정보 수정</button>
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="mypage__navigo__container"></div>
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

export function renderPage(html) {
  document.querySelector('.mypage__navigo__container').innerHTML = html;
  resetliActive();
  // divLoadingEl.style.display = 'block';
}

function resetliActive() {
  navliList = document.querySelectorAll('.mypage__navbar nav ul li');
  navliList.forEach((x) => x.classList.remove('active'));
}

// 시작 지점
// document.querySelector('.app').innerHTML = htmlMypage_Nav;

const router = new Navigo('/');
router
  .on({
    '/mypage/orderHistory': async () => {
      renderPage(htmlMypage_OrderHistory);
      initFuncOrderHistory();
      // renderPage('');
      navliList[0].classList.add('active');

      document
        .querySelector('#mpOrderHistory')
        .addEventListener('click', () => {
          router.navigate('/mypage/orderHistory');
        });
    },
    '/mypage/account': async () => {
      renderPage(htmlMypage_Account);
      initFuncAccount();
      navliList[1].classList.add('active');

      document.querySelector('#mpAccount').addEventListener('click', () => {
        router.navigate('/mypage/account');
      });
    },
    '/mypage/myHeart': async () => {
      renderPage(htmlMypage_MyHeart);
      initFuncMyHeart();
      // renderPage('');
      navliList[2].classList.add('active');

      document.querySelector('#mpMyHeart').addEventListener('click', () => {
        router.navigate('/mypage/myHeart');
      });
    },
    '/mypage/myPersonalInfoModify': () => {
      renderPage('');
      navliList[3].classList.add('active');

      document
        .querySelector('#mpMyPersonalInfoModify')
        .addEventListener('click', () => {
          router.navigate('/mypage/myPersonalInfoModify');
        });
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
