import Navigo from 'navigo';
import { getAllProudct } from './api';
import searchPNG from '../../../../public/search.png';

let currentPage = 'dashboard';

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
    renderPageBtn(page);
  }
  currentPage = page.dataset.page;
  page.addEventListener('click', pageClickHandler);
};

const dashboardPage = ` 
    <div class='dashboard-container' data-page='dashboard'>대시보드
    </div>
`;
const orderPage = `
    <div class='order-container' data-page='order'>거래내역
    </div>
`;
const productPage = `
    <div class='product-container' data-page='product'>
        <div class ='product-container__search'>
            <h2>상품관리</h2>
            <div>
              <select>
                  <option value=''>카테고리</option>
                  <option value>키보드</option>
                  <option value>키보드</option>
                  <option value>키보드</option>
                  <option value>키보드</option>
              </select>
              <select>
                  <option value=''>품절여부</option>
                  <option value='true'>Y</option>
                  <option value='false'>N</option>
              </select>
              <div class='product-container__search-input'>
                  <input placeholder='상품명을 입력해 주세요.'>
                  <img src=${searchPNG} alt='검색'>
              </div>
            </div>
        </div>
        <ul class='product-container__list'>
            <li>
                <input type="checkbox">
                <span style='width: 5%;'>NO</span>
                <span style='width: 10%;'>카테고리</span>
                <span style='width: 10%;'>상품명</span>
                <span style='width: 15%;'>가격</span>
                <span style='width: 15%;'>품절여부</span>
            </li>
        </ul>
        <div class='product-container__btn'>
            <button class='product-container__btn-delete'>삭제</button>
            <nav class='product-container__btn-page'></nav> 
            <a href ='/admin/product/add' data-navigo class='product-container__btn-add'>등록</a> 
        </div>
    </div>
`;

const productAddPage = `
  <div class='container' data-page='add'>
    <form class='container-form'>
      <h2 class='container-form__header'>상품 등록</h2>
      <div class='container-form__content'>

          <div class='container-form__content--tags'>
            <p>카테고리<span>*</span></p>
            <select name='tags' required>
              <option value=''>선택</option>
              <option value='주식'>주식</option>
              <option value='간식'>간식</option>
              <option value='건강'>건강</option>
              <option value='케어'>케어</option>
              <option value='의류'>의류</option>
              <option value='리빙'>리빙</option>
              <option value='외출'>외출</option>
              <option value='위생'>위생</option>
            </select>
          </div>  
          <div class='container-form__content--title'>
            <p>제품명 <span>*</span></p>
            <input type='text' name='title' placeholder='제품명' required>
          </div>  
          <div class='container-form__content--price'>
            <p>가격 <span>*</span></p>
            <input type='text' name='price' placeholder='제품명' required>
          </div>  
          <div class='container-form__content--description'>
            <p>제품상세설명<span>*</span></p>
            <textarea type='text' name='description' placeholder='제품 상세 설명' required></textarea>
          </div>
          <div class='container-form__content--thumbnail'>
            <div>
              <p>썸네일 이미지 <span>*</span></p>
              <button>파일선택</button>
            </div>
            <div>
              <img alt='썸네일 이미지' src=''>
              <p>이름 미리보기<p>
            </div>
          </div>
        </div>

      </div>    
      <div class='container-form__btn'>
        <button class='container-form__btn--add'>추가</button>
        <a href ='/admin/product/' data-navigo container-form__btn--cancel'>취소</a> 
      </div>
    </form>
  </div>
`;

const pageClickHandler = (e) => {
  const page = e.target.closest(`.${currentPage}-container`);

  if (e.target.matches('.products-container__btn-delete')) {
    console.log('상품 삭제');
  }
};

renderPage(dashboardPage);

(async () => {
  const res = await getAllProudct();
  console.log(res);
})();

const renderPageBtn = (page) => {
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

const showCurrentPageNumber = (numberBtns, idx, activeIdx) => {
  for (let numberBtn of numberBtns) {
    numberBtn.classList.remove('active');
  }
  numberBtns[idx].classList.add('active');
  return (activeIdx = idx);
};
