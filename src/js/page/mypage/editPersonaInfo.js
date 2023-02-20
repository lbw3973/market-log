import { router } from '../../main.js';
import { getLoginStatus, showAlertPlzLogin } from '../login.js';
import { resetNavbarActive } from '../mypage.js';

export const handleeditPersonalInfoPage = () => {
  resetNavbarActive();
  setNavbarActive();
  if (getLoginStatus() === false) {
    showAlertPlzLogin();
    router.navigate('/login');
    return;
  }
};

const setNavbarActive = () => {
  const active = document.querySelector('#mpMyPersonalInfoModify');
  active.parentElement.classList.add('active');
};
