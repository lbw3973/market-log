import { $ } from '../../utils/dom.js';
import { router } from '../../main.js';
import { renderPage } from '../../utils/render.js';
import { getLoginStatus, showAlertPlzLogin } from '../login.js';
import { htmlMypage_Nav, resetNavbarActive } from '../mypage.js';

/** 개인정보 수정 페이지 html 템플릿 */
const handleeditPersonalInfoInitTemplate = () => {
  const htmlMypage_editPersonalInfo = /* html */ `
    
  `;
  $('.mypage__navigo__container').innerHTML = htmlMypage_editPersonalInfo;
};

export const handleeditPersonalInfoPage = () => {
  if (getLoginStatus() === false) {
    showAlertPlzLogin();
    router.navigate('/login');
    return;
  }
  resetNavbarActive();
  setNavbarActive();
  rendereditPersonInfoPage();
};
const rendereditPersonInfoPage = () => {
  renderPage(htmlMypage_Nav);
  handleeditPersonalInfoInitTemplate();
  initFunceditPersonalInfo();
};

function initFunceditPersonalInfo() {}

const setNavbarActive = () => {
  const active = document.querySelector('#mpEditPersonalInfo');
  active.parentElement.classList.add('active');
};
