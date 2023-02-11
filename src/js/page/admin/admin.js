import Navigo from 'navigo';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
} from './render.js';
import { productAddHandler } from './productAdd.js';
import { initProductPage } from './product.js';
import { dashboardHandler } from './dashboard.js';

let currentPage = 'dashboard';

const router = new Navigo('/');

const routerGate = router.on({
  '/admin': () => {
    renderPage(dashboardPage);
    dashboardHandler();
  },
  '/admin/product': () => {
    renderPage(productPage);
    initProductPage();
  },
  '/admin/order': () => {
    renderPage(orderPage);
    // orderPageHandler();
  },
  '/admin/product/add': () => {
    renderPage(productAddPage);
  },
});

const renderPage = (html) => {
  const content = document.querySelector('.main-container__content');
  content.innerHTML = html;
};

renderPage(dashboardPage);

export { router, routerGate };
