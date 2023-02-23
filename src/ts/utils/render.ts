import { renderInitHeaderLogin } from '../page/login.js';
import { $ } from './dom.js';

/** Navigo innerHTML template */
export const renderPage = (html: string): void => {
  renderInitHeaderLogin();
  $('.app').innerHTML = html;
};
