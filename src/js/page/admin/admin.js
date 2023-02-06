import Navigo from 'navigo';
import { getAllProduct } from './api.js';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
} from './render.js';
import { productAddHandler } from './productAdd.js';

let currentPage = 'dashboard';
let products = [];

const router = new Navigo('/');

router.on({
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
  page.addEventListener('click', pageClickHandler);
};

const pageClickHandler = (e) => {
  const page = e.target.closest(`.${currentPage}-container`);

  if (e.target.matches('.products-container__btn-delete')) {
    console.log('상품 삭제');
  }
};

renderPage(dashboardPage);

(async () => {
  products = await getAllProduct();
  console.log(products);
})();

const productHandler = (page) => {
  const productList = page.querySelector('.product-container__list');

  const productsEl = products.map((product, idx) => {
    const productEl = document.createElement('li');
    productEl.innerHTML = `
          <input type="checkbox">
          <span style='width: 5%;'>${idx}</span>
          <span style='width: 10%;'>${product.tags[0]}</span>
          <span style='width: 10%;'>${product.title}</span>
          <span style='width: 15%;'>${product.price}</span>
          <span style='width: 15%;'>${
            'true' === product.isSoldOut ? '품절' : '판매가능'
          }</span>
        `;
    return productEl;
  });
  console.log(...productsEl);
  productList.append(...productsEl);
  // productEl.forEach((el, idx) => productList.append(el[idx]));

  const numberOfProduct = 52; // 제품 배열의 length
  const itemsPerPage = 10; // 한 페이지에 출력할 제품 수
  const numberOfPages = Math.ceil(numberOfProduct / itemsPerPage);
  let pageBtnEl = ``;
  let activeIdx = 0;

  for (i = 1; i <= numberOfPages; i++) {
    pageBtnEl += `<button class='product-container__btn-page--number'>${i}</button>`;
  }

  const productPageBtn = page.querySelector('.product-container__btn-page');
  productPageBtn.innerHTML = `
            <button class='product-container__btn-page--prev'>이전</button>
            ${pageBtnEl}
            <button class='product-container__btn-page--next'>다음</button>
      `;
  const numberBtns = productPageBtn.querySelectorAll(
    '.product-container__btn-page--number',
  );

  showCurrentPageNumber(numberBtns, 0, activeIdx);

  numberBtns.forEach((numberBtn, idx) => {
    numberBtn.addEventListener('click', () => {
      activeIdx = showCurrentPageNumber(numberBtns, idx);
    });
  });

  const prevPageBtn = productPageBtn.querySelector(
    '.product-container__btn-page--prev',
  );

  prevPageBtn.addEventListener('click', () => {
    --activeIdx;
    if (activeIdx < 0) {
      activeIdx = 0;
    }
    showCurrentPageNumber(numberBtns, activeIdx);
  });

  const nextPageBtn = productPageBtn.querySelector(
    '.product-container__btn-page--next',
  );

  nextPageBtn.addEventListener('click', () => {
    ++activeIdx;

    if (activeIdx > numberBtns.length - 1) {
      activeIdx = numberBtns.length - 1;
    }

    showCurrentPageNumber(numberBtns, activeIdx);
  });
};

const showCurrentPageNumber = (numberBtns, idx) => {
  for (let numberBtn of numberBtns) {
    numberBtn.classList.remove('active');
  }
  numberBtns[idx].classList.add('active');
  return (activeIdx = idx);
};
