import Navigo from 'navigo';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
} from './render.js';
import { productAddHandler } from './productAdd.js';
import { productHandler } from './product.js';

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
  currentPage = page.dataset.page;
  // page.addEventListener('click', pageClickHandler);
};

const pageClickHandler = (e) => {
  const page = e.target.closest(`.${currentPage}-container`);

  if (e.target.matches('.products-container__btn-delete')) {
    console.log('상품 삭제');
  }
};

renderPage(dashboardPage);

export { router, routerGate };
