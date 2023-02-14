import { base_url, api_key, user_name, admin_email } from '../db.js';
import { router } from './mypage.js';
const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};
const $ = (selector) => document.querySelector(selector);

export const htmlLogin = /* html */ `
  <div class="login__container">
    <h1 class="title">로그인</h1>
    <ul>
      <li>
        <input id="inputID" type="text" placeholder="아이디" />
      </li>
      <li>
        <input id="inputPW" type="password" placeholder="비밀번호" />
      </li>
    </ul>
    <div class="buttons">
      <button class="login-btn">로그인</button>
      <button class="signup-btn">
        <a href="/signup" data-navigo>회원가입</a>
      </button>
    </div>
  </div>
`;

export function initFuncLogin() {
  const btnLogin = $('.login-btn');
  btnLogin.addEventListener('click', async () => {
    const loginJSON = await login();
    localStorage.setItem('token', loginJSON.accessToken);
    router.navigate('/');
  });
}

async function login() {
  console.log('로그인 시작', $('#inputID').value, $('#inputPW').value);
  const res = await fetch(`${base_url}/auth/login`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      email: $('#inputID').value,
      password: $('#inputPW').value,
    }),
  });
  const json = await res.json();

  return json;
}
