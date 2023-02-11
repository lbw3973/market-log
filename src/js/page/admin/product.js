import { deleteProduct, getAllProduct } from './api.js';

let products = [];

let activeIdx = 1;
const itemsPerPage = 10;

// 페이지네이션 버튼 렌더
const renderPageBtn = (productPageBtn, products, activeIdx, itemsPerPage) => {
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

// 현재 페이지의 상품 목록 렌더
const renderProduct = (productList, products, activeIdx) => {
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
            product.isSoldOut ? '품절' : '판매가능'
          }</span>
        `;

    return productEl;
  });

  productList.append(...productsEl);
};

// 현재 페이지의 상품목록 가져오기
const getProductCurrentPage = (products, activeIdx, itemsPerPage) => {
  const start = (activeIdx - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newProducts = products.slice(start, end);
  return newProducts;
};

// 상품 목록 페이지 초기화
const setUpUI = (productPageBtn, productList) => {
  renderPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
  newProducts = getProductCurrentPage(products, activeIdx, itemsPerPage);
  renderProduct(productList, newProducts, activeIdx);
};

let newProducts = getProductCurrentPage(products, activeIdx, itemsPerPage);

// 상품관리 페이지 초기화
export const initProductPage = async () => {
  const productContainer = document.querySelector('.product-container');
  const productList = productContainer.querySelector(
    '.product-container__list',
  );
  const checkProductAll = productContainer.querySelector(
    '.product-container__title input',
  );
  const productPageBtn = productContainer.querySelector(
    '.product-container__btn-page',
  );

  products = await getAllProduct();

  setUpUI(productPageBtn, productList);

  const searchContainer = productContainer.querySelector(
    '.product-container__search-container--input',
  );

  const searchedProductInput = searchContainer.querySelector('input');
  const searchedProductBtn = searchContainer.querySelector('img');

  // 상품 검색
  searchedProductBtn.addEventListener('click', async () => {
    keyword = searchedProductInput.value;
    const filteredProduct = products.filter((product) =>
      product.title.includes(keyword),
    );

    productList.innerHTML = ``;
    // console.log(productList.textContent);
    renderPageBtn(productPageBtn, filteredProduct, activeIdx, itemsPerPage);
    newProducts = getProductCurrentPage(
      filteredProduct,
      activeIdx,
      itemsPerPage,
    );
    renderProduct(productList, newProducts, activeIdx);
  });

  //버튼 클릭 페이지 이동
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

    productList.innerHTML = ``;

    setUpUI(productPageBtn, productList);
  });

  const productContainerBtn = productContainer.querySelector(
    '.product-container__btn',
  );
  const deleteBtn = productContainerBtn.querySelector(
    '.product-container__btn-delete',
  );

  // 체크리스트 모두 선택 및 해제
  checkProductAll.addEventListener('change', () => {
    const productsEl = productList.querySelectorAll('li');

    checkProductAll.checked
      ? [...productsEl].forEach(
          (productEl) => (productEl.querySelector('input').checked = true),
        )
      : [...productsEl].forEach(
          (productEl) => (productEl.querySelector('input').checked = false),
        );
  });

  // 체크리스트 선택한 상품 삭제
  deleteBtn.addEventListener('click', async () => {
    const productsEl = productList.querySelectorAll('li');

    const newProductsEl = [...productsEl].filter(
      (productEl) => productEl.querySelector('input').checked === true,
    );

    if (newProductsEl.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    if (confirm('선택한 상품을 삭제하시겠습니까? ')) {
      async function deleteProductPromise(newProductsEl) {
        const productsMap = newProductsEl.map(async (newProductEl) => {
          return await deleteProduct(newProductEl.dataset.id);
        });
        return productsMap;
      }

      await deleteProductPromise(newProductsEl);

      products = await getAllProduct();
      productList.innerHTML = '';

      alert('선택한 상품이 삭제되었습니다.');
    } else {
      return;
    }

    setUpUI(productPageBtn, productList);
  });
};