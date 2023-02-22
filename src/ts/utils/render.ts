import { renderInitHeaderLogin } from '../page/login.js';
import { $ } from './dom.js';

/** Navigo innerHTML template */
export const renderPage = (html) => {
  renderInitHeaderLogin();
  $('.app').innerHTML = html;
};
