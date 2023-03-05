import { renderInitHeaderLogin } from '../page/loginPage';
import { $ } from './dom';

/** Navigo innerHTML template */
export const renderPage = (html: string): void => {
  renderInitHeaderLogin();
  $('.app').innerHTML = html;
};
