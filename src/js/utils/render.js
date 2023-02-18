import { $ } from './dom.js';

/** Navigo innerHTML template */
export const renderPage = (html) => {
  $('.app').innerHTML = html;
};
