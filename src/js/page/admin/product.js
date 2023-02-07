import { getAllProduct } from './api.js';
let products = [];

export const productHandler = async (page) => {
  console.log('새로고침');
  products = await getAllProduct();
  const itemsPerPage = 10;
  let activeIdx = 1;
  let newProducts = paginate(products, activeIdx, itemsPerPage);

  const productList = page.querySelector('.product-container__list');
  displayProduct(productList, newProducts, activeIdx);

  const productPageBtn = page.querySelector('.product-container__btn-page');
  displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);

  productPageBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-container__btn')) return;

    if (e.target.classList.contains('product-container__btn-page--number')) {
      let numberBtn = e.target;
      activeIdx = parseInt(numberBtn.textContent);
    }

    if (e.target.classList.contains('product-container__btn-page--next')) {
      activeIdx++;
      if (activeIdx > Math.ceil(products.length / itemsPerPage) - 1) {
        activeIdx = Math.ceil(products.length / itemsPerPage);
      }
    }

    if (e.target.classList.contains('product-container__btn-page--prev')) {
      activeIdx--;
      if (activeIdx < 1) {
        activeIdx = 1;
      }
    }

    productList.innerHTML = `
      <li>
        <input type="checkbox">
        <span style='width: 5%;'>NO</span>
        <span style='width: 10%;'>카테고리</span>
        <span style='width: 10%;'>상품명</span>
        <span style='width: 15%;'>가격</span>
        <span style='width: 15%;'>품절여부</span>
      </li>
    `;

    displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
    newProducts = paginate(products, activeIdx, itemsPerPage);
    displayProduct(productList, newProducts, activeIdx);
  });
};

const displayPageBtn = (productPageBtn, products, activeIdx, itemsPerPage) => {
  let buttonsEl = ``;

  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    buttonsEl += `<button class='product-container__btn-page--number ${
      activeIdx === i ? 'active' : ''
    }'>${i}</button>`;
  }

  productPageBtn.innerHTML = `
            <button class='product-container__btn-page--prev'>이전</button>
            ${buttonsEl}
            <button class='product-container__btn-page--next'>다음</button>
      `;
};

const paginate = (products, activeIdx, itemsPerPage) => {
  const start = (activeIdx - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newProducts = products.slice(start, end);
  return newProducts;
};

const displayProduct = (productList, products, activeIdx) => {
  const productsEl = products.map((product, idx) => {
    const productEl = document.createElement('li');
    productEl.innerHTML = `
          <input type="checkbox">
          <span style='width: 5%;'>${idx + 1 + (activeIdx - 1) * 10}</span>
          <span style='width: 10%;'>${product.tags[0]}</span>
          <span style='width: 10%;'>${product.title}</span>
          <span style='width: 15%;'>${product.price.toLocaleString()} 원</span>
          <span style='width: 15%;'>${
            'true' === product.isSoldOut ? '품절' : '판매가능'
          }</span>
        `;

    return productEl;
  });

  productList.append(...productsEl);
};

(async () => {
  products = await getAllProduct();
})();
