import { $ } from '../../utils/dom.js';
import { router } from '../../main.js';
import { renderPage } from '../../utils/render.js';
import { getLoginStatus, showAlertPlzLogin } from '../login.js';
import { htmlMypage_Nav, resetNavbarActive } from '../mypage.js';

/** 개인정보 수정 페이지 html 템플릿 */
const handleeditPersonalInfoInitTemplate = (success) => {
  const htmlMypage_editPersonalInfo_input = /* html */ `
  <h2>개인 정보 수정</h2>
  <div class="mypage__editPersonalInfo">
    <div class="mypage__editPersonalInfo__notice">
      <h4>비밀번호 재확인</h4>
      <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
    </div>
    <div class="mypage__editPersonalInfo__inputPassWord">
      <input type="password" id="inputPW" />
      <button id="btnSubmit">확인</button>
    </div>
  </div>
  `;

  const htmlMypage_editPersonalInfo_edit = /* html */ `
    <h2>개인 정보 수정</h2>
    <div class="edit_PersonalInfo">
      <div class="edit_PersonalInfo_grid">
        <label>아이디</label>
        <p id="user-id">예시! 지우고 변수로 받으셔야합니다</p>
        <label>비밀번호</label>
        <input id="user-pw" placeholder="비밀번호"/>
        <label>비밀번호 확인</label>
        <input id="user-pwConfirm" placeholder="비밀번호 확인"/>
        <label>닉네임 변경</label>
        <input id="user-name" placeholder="닉네임, 여기는 페이지 렌더될때 value속성으로 기존 닉네임 가져오기"/>
      </div>
      <div class="buttonBox">
        <button id="btnEditComplete">정보 수정</button>
        <button id="btnEditCancel">취소</button>
      </div>
    </div>
  `;
  // 밑에 주석은 테스트용
  $('.mypage__navigo__container').innerHTML = htmlMypage_editPersonalInfo_edit;

  // $('.mypage__navigo__container').innerHTML = success
  //   ? htmlMypage_editPersonalInfo_edit
  //   : htmlMypage_editPersonalInfo_input;
};

/** 처음 진입점 */
export const handleeditPersonalInfoPage = () => {
  if (getLoginStatus() === false) {
    showAlertPlzLogin();
    router.navigate('/login');
    return;
  }
  rendereditPersonInfoPage();
  resetNavbarActive();
  setNavbarActive();
};
/** 페이지 렌더 및 기능 부여 */
const rendereditPersonInfoPage = () => {
  renderPage(htmlMypage_Nav);
  handleeditPersonalInfoInitTemplate(false);
  initFunceditPersonalInfo();
};

/** 기능 부여 */
function initFunceditPersonalInfo() {}

const setNavbarActive = () => {
  const active = document.querySelector('#mpEditPersonalInfo');
  active.parentElement.classList.add('active');
};

/*
1. 비밀번호를 입력하면 edit page를 렌더
  - 현재 로그인 되어있는 아이디를 불러와서 다시 로그인
  - 로그인이 성공하면 edit page를 렌더
2. edit page에서 
*/
