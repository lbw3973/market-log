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
import chevronrightSVG from '../../public/chevronright.svg';
import { mpBestDesign, mpNewProduct, mpWeekly } from './renderMainPage.js';
import Navigo from 'navigo';
import { initFunc } from './page/mypage.js';
import { base_url, api_key, user_name, admin_email } from '../js/db.js'; // 로그인 부분 지우면 필요없음
const $ = (selector) => document.querySelector(selector);

const renderInitMainPage = () => {
  // renderMainPage('');
  // renderMainPage(mpWeekly);
  // renderMainPage(mpNewProduct);
  // renderMainPage(mpBestDesign);
};
/** 렌더 함수 for navigo */
const renderMainPage = (html) => {
  console.log(html);
  const mainPageAll = document.querySelector('.app');
  mainPageAll.innerHTML += html;
  //mainPageAll.innerHTML = '';
  //mainPageAll.append(html);
};
const renderPage = (html) => {
  console.log(html);
  const mainPageAll = document.querySelector('.app');
  mainPageAll.innerHTML = html;
};
const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};
const idEl = document.querySelector('.id');
const passwordEl = document.querySelector('.password');
const displayNameEl = document.querySelector('.display-name');
const submitEl = document.querySelector('.signup');
const authorizationEl = document.querySelector('.authorization');
const loginEl = document.querySelector('.login');
// const btnLogout = document.querySelector('.logout')

let id = '';
let pw = '';
let displayName = '';

idEl.addEventListener('input', (event) => {
  id = event.target.value;
});
passwordEl.addEventListener('input', (event) => {
  pw = event.target.value;
});
displayNameEl.addEventListener('input', (event) => {
  displayName = event.target.value;
});
submitEl.addEventListener('click', () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    method: 'POST',
    data: {
      email: id,
      password: pw,
      displayName: displayName,
    },
  });
});
authorizationEl.addEventListener('click', async () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      masterKey: true,
    },
  });
});
loginEl.addEventListener('click', async () => {
  loginEl.textContent = '로그인 시도 중...';
  await request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    method: 'POST',
    data: {
      email: id,
      password: pw,
    },
  });
  loginEl.textContent = '로그인 완료';
});
// btnLogout.addEventListener('click', () => {
//   request({
//     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
//     method: 'POST',
//     headers: {
//       ...headers,
//       Authorization: `Bearer ${window.localStorage.getItem('token')}`
//     }
//   })
// })

async function request(options) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      apikey: 'FcKdtJs202301',
      username: user_name,
    },
  };
  const headers = options.headers || {};
  const res = await fetch(options.url, {
    method: options.method || defaultOptions.method,
    headers: {
      ...defaultOptions.headers,
      ...headers,
    },
    body: options.data ? JSON.stringify(options.data) : undefined,
  });
  const json = await res.json();
  window.localStorage.setItem('token', json.accessToken);
}
const htmlMypage_Nav = /* html */ `
<div class="mypage__container">
  <div class="mypage__navbar">
    <h1>마이페이지</h1>
    <nav>
      <ul>
        <li>
          <a href="/mypage/orderHistory" data-navigo>주문 내역
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/account" data-navigo>계좌 관리
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/myHeart" data-navigo>찜한 상품
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
        <li>
          <a href="/mypage/myPersonalInfoModify" data-navigo>개인 정보 수정
            <img src="${chevronrightSVG}" alt="chevronright">
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="mypage__navigo__container"></div>
`;

$('#mypageNavigo').addEventListener('click', () => {
  router.navigate('/mypage');
});

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
    '/mypage': () => {
      console.log('innerHTML');
      $('.app').innerHTML = htmlMypage_Nav;
      initFunc();
    },
    '/hart': () => {
      console.log('hart    hart');
    },
    '/productDetail': () => {
      console.log('productDetail    productDetail');
    },
  })
  .resolve();
