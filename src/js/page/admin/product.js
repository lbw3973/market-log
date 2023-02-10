import { deleteProduct, getAllProduct } from './api.js';
let products = [];

export const productHandler = async (page) => {
  // 초기화
  products = await getAllProduct();
  const itemsPerPage = 10;
  let activeIdx = 1;
  let newProducts = paginate(products, activeIdx, itemsPerPage);

  const productList = page.querySelector('.product-container__list');
  const checkProductAll = page.querySelector('.product-container__title input');

  displayProduct(productList, newProducts, activeIdx);
  const productPageBtn = page.querySelector('.product-container__btn-page');
  displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);

  //상품 검색
  const searchContainer = page.querySelector(
    '.product-container__search-container--input',
  );

  const searchedProductInput = searchContainer.querySelector('input');
  const searchedProductBtn = searchContainer.querySelector('img');

  searchedProductBtn.addEventListener('click', async () => {
    keyword = searchedProductInput.value;
    const filteredProduct = products.filter((product) =>
      product.title.includes(keyword),
    );

    productList.innerHTML = ``;
    // console.log(productList.textContent);
    displayPageBtn(productPageBtn, filteredProduct, activeIdx, itemsPerPage);
    newProducts = paginate(filteredProduct, activeIdx, itemsPerPage);
    displayProduct(productList, newProducts, activeIdx);
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

    displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
    newProducts = paginate(products, activeIdx, itemsPerPage);
    displayProduct(productList, newProducts, activeIdx);
  });

  // 체크리스트 모두 선택 및 해제
  const productContainerBtn = page.querySelector('.product-container__btn');
  const deleteBtn = productContainerBtn.querySelector(
    '.product-container__btn-delete',
  );

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

    displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
    newProducts = paginate(products, activeIdx, itemsPerPage);
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
            product.isSoldOut ? '품절' : '판매가능'
          }</span>
        `;

    return productEl;
  });

  productList.append(...productsEl);
};

const setUpUI = () => {
  displayPageBtn(productPageBtn, products, activeIdx, itemsPerPage);
  newProducts = paginate(products, activeIdx, itemsPerPage);
  displayProduct(productList, newProducts, activeIdx);
};

(async () => {
  products = await getAllProduct();
})();
