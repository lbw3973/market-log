import { addProduct, deleteProduct, getAllProduct } from './api.js';
let products = [];

export const productHandler = async (page) => {
  products = await getAllProduct();
  const itemsPerPage = 10;
  let activeIdx = 1;
  let newProducts = paginate(products, activeIdx, itemsPerPage);

  const productList = page.querySelector('.product-container__list');
  displayProduct(productList, newProducts, activeIdx);

  const productPageBtn = page.querySelector('.product-container__btn-page');
  displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);

  productPageBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-container__btn-delete')) return;

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

  // 상품 삭제
  const productContainerBtn = page.querySelector('.product-container__btn');
  const deleteBtn = productContainerBtn.querySelector(
    '.product-container__btn-delete',
  );

  const productsEl = productList.querySelectorAll('li + li');

  const checkProuductAll = productList.querySelector('li:first-child input');
  checkProuductAll.addEventListener('change', () => {
    checkProuductAll.checked
      ? [...productsEl].forEach(
          (productEl) => (productEl.querySelector('input').checked = true),
        )
      : [...productsEl].forEach(
          (productEl) => (productEl.querySelector('input').checked = false),
        );
  });

  deleteBtn.addEventListener('click', async () => {
    const newProductsEl = [...productsEl].filter(
      (productEl) => productEl.querySelector('input').checked === true,
    );

    if (newProductsEl.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    if (confirm('선택한 상품을 삭제하시겠습니까? ')) {
      await Promise.all(
        newProductsEl.map(
          async (newProductEl) => await deleteProduct(newProductEl.dataset.id),
        ),
      );

      products = await getAllProduct();
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

      alert('선택한 상품이 삭제되었습니다.');
    } else {
      return;
    }
    displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
    newProducts = paginate(products, activeIdx, itemsPerPage);
    console.log(newProducts);
    displayProduct(productList, newProducts, activeIdx);
  });
};

//함수 정의
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
    productEl.dataset.id = `${product.id}`;
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
