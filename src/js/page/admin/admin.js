import Navigo from 'navigo';

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
    // renderPageBtn(page);
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
            <select>
                <option value='마우스'>마우스</option>
                <option value>키보드</option>
            </select>
            <select>
                <option value=''>품절여부</option>
                <option value='true'>Y</option>
                <option value='false'>N</option>
            </select>
            <div class='product-container__search-input'>
                <input placeholder="상품명을 입력해 주세요.">
                <button>확인</button>
            </div>
        </div>
        <ul class='product-container__list'>
            <div>
                <span>NO</span>
                <span>카테고리</span>
                <span>상품명</span>
                <span>가격</span>
                <span>품절여부</span>
            </div>
        </ul>
        <div class='product-container__btn'>
            <button class='product-container__btn-delete'>삭제</button>
            <nav class='product-container__btn-page'></nav> 
            <a href ='/admin/product/add' data-navigo class='product-container__btn-add'>등록</a> 
        </div>
    </div>
`;

const productAddPage = `
  <div class='product-add-container' data-page='add'>
    <form class='product-add-container__form'>
      <div class='product-add-container__form--header'>
        <h1>상품 등록</h1>
      </div>
      <div class='product-add-container__form--content'>
        <div class='form-container1'>
          <div class='form-container__tags'>
            <p>태그<span>*</span></p>
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
          <div class='form-container__title'>
            <p>제품명 <span>*</span></p>
            <input type='text' name='title' placeholder='제품명' required>
          </div>  
          <div class='form-container__price'>
            <p>가격 <span>*</span></p>
            <input type='text' name='price' placeholder='제품명' required>
          </div>  
          <div class='form-container__description'>
            <p>제품상세설명<span>*</span></p>
            <textarea type='text' name='description' placeholder='제품 상세 설명' required></textarea>
          </div>  
          <div class='form-container__thumbnail'></div>  
          <div class='form-container__isSoldOut'></div>  
        </div>
        <div class='form-container2'>
          <div class='form-container__thumbnail'>
            <p>썸네일 이미지 <span>*</span></p>
            <div>
              <div>
                <img alt='썸네일 이미지' src=''>
              </div>
              <div>
                <button>파일변경</button>
                <p><p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='product-add-container__form--btn'></div>
    </form>
  </div>
`;


const pageClickHandler = (e) => {

};

renderPage(dashboardPage);
