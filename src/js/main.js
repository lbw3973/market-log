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
import Navigo from 'navigo';
import { initFunc } from './page/mypage.js';
import { base_url, api_key, user_name, admin_email } from '../js/db.js'; // 로그인 부분 지우면 필요없음
const $ = (selector) => document.querySelector(selector);
const router = new Navigo('/');
const ulEl = $('.header__user-login--ul');
// ulEl.innerHTML = /* html */ `
//   <li class="header__user-login--li">
//     <a href="/login" data-navigo id="btnlogin"> 로그인 </a>
//   </li>
// `;

async function renderInitMainPage() {
  const author = await authorization();
  if (author == '유효한 사용자가 아닙니다.') {
    ulEl.innerHTML = /* html */ `
      <li class="header__user-login--li">
        <a href="/login" data-navigo id="btnlogin"> 로그인 </a>
      </li>
    `;
  } else {
    ulEl.innerHTML = /* html */ `
      <li class="header__user-login--li">
        <a href="/mypage" data-navigo>
          <strong strong id="header__user-login-name">${author.displayName}</strong>님 환영합니다
        </a>
      </li>
      <li class="header__user-login--li">
        <button id="btnlogout"> 로그아웃 </button>
      </li>
    `;
    $('#btnlogout').addEventListener('click', async () => {
      const logoutJSON = await logout();
      if (logoutJSON === true) {
        localStorage.removeItem('token');
        ulEl.innerHTML = /* html */ `
          <li class="header__user-login--li">
            <a href="/login" data-navigo id="btnlogin"> 로그인 </a>
          </li>
        `;
      }
    });
  }
}
/** 렌더 함수 for navigo */
const renderMainPage = (html) => {
  console.log(html);
  const mainPageAll = document.querySelector('.app');
  mainPageAll.innerHTML += html;
  //mainPageAll.innerHTML = '';
  //mainPageAll.append(html);
};
export const renderPage = (html) => {
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
  console.log(json.accessToken);
}

async function authorization() {
  const res = await fetch(`${base_url}/auth/me`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();
  return json;
}
async function logout() {
  const res = await fetch(`${base_url}/auth/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();
  return json;
}

/** navigo router */

router
  .on({
    '/': () => {
      console.log();
      renderInitMainPage();
      console.log('contentsMainPage    contentsMainPage');
    },
    '/login': () => {
      console.log('route to login!!');
      router.navigate('/login');
    },
    // '/mypage': () => {
    //   console.log('go to mypage!!');
    //   $('.app').innerHTML = htmlMypage_Nav;
    // },
  })
  .resolve();
