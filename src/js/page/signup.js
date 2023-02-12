export const htmlSingup = /* html */ `
  <div class="signup__container">
    <h1 class="title">회원가입</h1>
    <div class="signup__container__input">
      <ul>
        <li>
          <input class="deleteCookie" type="text" placeholder="아이디 (이메일 형식)" />
        </li>
        <li>
          <input class="deleteCookie" type="password" placeholder="비밀번호 (영문 대/소문자, 숫자, 특수문자 중 2가지 조합, 8~20자)" />
          <input type="password" placeholder="비밀번호확인" />
        </li>
        <li>
          <input type="text" placeholder="이름" />
        </li>
      </ul>
    </div>
    <div class="signup__container__checkbox">
      <div class="box">
        <input type="checkbox" class="input_chk" />
        <span class="pilsu" for=""><span>(필수)</span> 이용약관</span>
        <a id="asd" href="">보기</a>
      </div>
      <div class="box">
        <input type="checkbox" class="input_chk" />
        <span class="pilsu" for=""><span>(필수)</span> 개인정보 수집 및 이용</span>
        <a id="asd" href="">보기</a>
      </div>
      <div class="box">
        <input type="checkbox" class="input_chk" />
        <span class="pilsu" for=""><span>(선택)</span> 전체 약관 및 마케팅 수신에 동의합니다.</span>
      </div>
      <button type="button" class="submit-btn">가입하기</button>
    </div>
  </div>

`;

export function initFuncSignup() {
  const testEl = document.querySelectorAll(
    '.signup__container__input .deleteCookie',
  );
  // 회원가입 페이지인데 쿠키때문에 채워지는거 처음에만 지우기.. 테스트
  testEl.forEach((x) =>
    x.addEventListener(
      'input',
      (e) => {
        console.log('ssad');
        e.target.value = null;
        // e.target.style.backgroundColor = 'white';
      },
      { once: true },
    ),
  );
  // const btnEl = document.querySelector('.btn');
  // const idEl = document.querySelector('input[type=text]').value;
  // const pwdEl = document.querySelector('input[type=password]').value;
  // const emailEl = document.querySelector('input[type=email]').value;
  // emailEl.addEventListener('input', function() {
  //   console.log(idEl)
  // })

  // btnEl.addEventListener('click', function () {
  //   const idEl = document.querySelector('input[type=text]').value;
  //   const pwdEl = document.querySelectorAll('input[type=password]')[0].value;
  //   const pwdsEl = document.querySelectorAll('input[type=password]')[1].value;
  //   const emailEl = document.querySelector('input[type=email]').value;

  //   if (idEl === '' || idEl === '' || emailEl === '') {
  //     console.log('공백 ㄴㄴ');
  //   }
  //   if (pwdEl !== pwdsEl) {
  //     console.log('비번다름');
  //   }
  // });
}
