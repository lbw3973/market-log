export const htmlLogin = /* html */ `
  <div class="login__container">
    <h1 class="title">로그인</h1>
    <ul>
      <li>
        <input type="text" placeholder="아이디" />
      </li>
      <li>
        <input type="password" placeholder="비밀번호" />
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
