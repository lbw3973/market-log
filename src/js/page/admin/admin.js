import Navigo from 'navigo';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
} from './render.js';
import { productAddHandler } from './productAdd.js';
import { productHandler } from './product.js';
// import { dashboardHandler } from './dashboard.js';

let currentPage = 'dashboard';

const router = new Navigo('/');

const routerGate = router.on({
  '/admin': () => {
    renderPage(dashboardPage);
  },
  '/admin/product': () => {
    renderPage(productPage);
  },
  '/admin/order': () => {
    renderPage(orderPage);
  },
  '/admin/product/add': () => {
    renderPage(productAddPage);
  },
});

const renderPage = (html) => {
  const content = document.querySelector('.main-container__content');
  content.innerHTML = html;

  const page = content.querySelector('.main-container__content > div');

  if (page.className === 'product-container') {
    productHandler(page);
  } else if (page.className === 'productAdd-container') {
    productAddHandler(page);
  }
  //else if (page.className === 'dashboard-container') {
  //   dashboardHandler(page);
  // }
  currentPage = page.dataset.page;
  // page.addEventListener('click', pageClickHandler);
};

const pageClickHandler = (e) => {
  const page = e.target.closest(`.${currentPage}-container`);
};

renderPage(dashboardPage);

export { router, routerGate };
