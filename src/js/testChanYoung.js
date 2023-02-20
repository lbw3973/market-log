import Navigo from 'navigo';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
  productDetailPage,
  productEditPage,
  sideBar,
  orderDetailPage,
} from './page/admin/renderTemplate';

import { productHandler } from './page/admin/product.js';
import { dashboardHandler } from './page/admin/dashboard.js';
import { orderHandler } from './page/admin/order.js';
import { productAddHandler } from './page/admin/productAdd.js';
import { productDetailHandler } from './page/admin/productDetail.js';
import { productEditHandler } from './page/admin/productEdit.js';
import { orderDetailHandler } from './page/admin/orderDetail.js';

const $ = (selector) => document.querySelector(selector);

export const router = new Navigo('/');

const renderContainer = () => {
  $('.app').innerHTML = `<div class="container"></div>`;
};

const render = (html) => {
  $('.container').innerHTML = html;
};

/** 페이지 이동 시 초기화 함수 */
const initPage = (page) => {
  renderContainer();
  render(sideBar);
  $('.container').insertAdjacentHTML('beforeend', page);
};

router
  .on({
    '/': () => {
      initPage(dashboardPage);
    },
    '/admin': () => {
      initPage(dashboardPage);
      dashboardHandler();
    },
    '/admin/product': () => {
      initPage(productPage);
      productHandler();
    },
    '/admin/order': () => {
      initPage(orderPage);
      orderHandler();
    },
    '/admin/order/:id': (params) => {
      initPage(orderDetailPage);
      orderDetailHandler(params.data.id);
    },
    '/admin/product/add': () => {
      initPage(productAddPage);
      productAddHandler();
    },
    '/admin/product/:id': (params) => {
      initPage(productDetailPage);
      productDetailHandler(params.data.id);
    },
    '/admin/product/edit/:id': (params) => {
      initPage(productEditPage);
      productEditHandler(params.data.id);
    },
  })
  .resolve();
