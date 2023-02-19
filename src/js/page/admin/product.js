import { deleteProduct, getAllProduct } from './api.js';
import { renderPageBtn, renderProductList } from './renderDetail.js';

let products = [];

let activeIdx = 1;
let btnIdx = 1;
const itemsPerPage = 10;

/** 현재 페이지의 상품목록 가져오기 */
const getProductCurrentPage = (products, activeIdx, itemsPerPage) => {
  const start = (activeIdx - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newProducts = products.slice(start, end);
  return newProducts;
};

/** 상품 목록 페이지 초기화 */
const setUpUI = (productPageBtn, productList) => {
  renderPageBtn(productPageBtn, products, activeIdx, itemsPerPage, btnIdx);
  newProducts = getProductCurrentPage(products, activeIdx, itemsPerPage);
  renderProductList(productList, newProducts, activeIdx);
};

let newProducts = getProductCurrentPage(products, activeIdx, itemsPerPage);

/** 상품관리 페이지 핸들러 */
export const productHandler = async () => {
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

  const searchProductHandler = () => {
    const filteredProduct = products.filter((product) =>
      product.title.includes(searchedProductInput.value),
    );

    productList.innerHTML = ``;
    renderPageBtn(productPageBtn, filteredProduct, activeIdx, itemsPerPage);
    newProducts = getProductCurrentPage(
      filteredProduct,
      activeIdx,
      itemsPerPage,
    );
    renderProductList(productList, newProducts, activeIdx);
    searchedProductInput.value = '';
  };

  /** 상품 검색(enter) 이벤트 리스너 */
  searchedProductInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      searchProductHandler();
    }
  });

  /** 상품 검색(버튼 클릭) 이벤트 리스너 */
  searchedProductBtn.addEventListener('click', searchProductHandler);

  /** 페이지 버튼 클릭 이벤트 리스너 */
  productPageBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-container__btn-delete')) return;

    if (e.target.classList.contains('btn-page--number')) {
      let numberBtn = e.target;
      activeIdx = parseInt(numberBtn.textContent);

      if (activeIdx === btnIdx * itemsPerPage + 1) {
        btnIdx++;
      }

      if (activeIdx === (btnIdx - 1) * itemsPerPage) {
        btnIdx--;
      }
    }

    if (e.target.parentElement.classList.contains('btn-page--next')) {
      activeIdx++;

      if (activeIdx > Math.ceil(products.length / itemsPerPage) - 1) {
        activeIdx = Math.ceil(products.length / itemsPerPage);
      }

      if (activeIdx === btnIdx * itemsPerPage + 1) {
        btnIdx++;
      }
    }

    if (e.target.parentElement.classList.contains('btn-page--prev')) {
      activeIdx--;

      if (activeIdx < 1) {
        activeIdx = 1;
      }

      if (activeIdx === (btnIdx - 1) * itemsPerPage) {
        btnIdx--;
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

  /** 상품 목록 체크리스트 모두 선택 및 해제 이벤트 리스너 */
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

  /** 상품 목록 체크리스트 선택한 상품 삭제  이벤트 리스너 */
  deleteBtn.addEventListener('click', async () => {
    const productsEl = productList.querySelectorAll('li');

    const newProductsEl = [...productsEl].filter(
      (productEl) => productEl.querySelector('input').checked === true,
    );

    if (newProductsEl.length === 0) {
      alert('삭제할 상품을 선택해주세요.');
      return;
    }

    if (confirm('선택한 상품을 삭제하시겠습니까? ')) {
      // async function deleteProductPromise(newProductsEl) {
      //   const productsMap = newProductsEl.map(async (newProductEl) => {
      //     return await deleteProduct(newProductEl.dataset.id);
      //   });
      //   return productsMap;
      // }

      // await deleteProductPromise(newProductsEl);
      await Promise.all(
        newProductsEl.map(
          async (newProductEl) => await deleteProduct(newProductEl.dataset.id),
        ),
      );

      products = await getAllProduct();
      productList.innerHTML = '';

      alert('선택한 상품이 삭제되었습니다.');
    } else {
      return;
    }

    setUpUI(productPageBtn, productList);
  });
};
