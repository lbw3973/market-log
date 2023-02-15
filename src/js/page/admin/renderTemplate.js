import searchPNG from '../../../../public/search.png';
import reloadSVG from '../../../../public/reload.svg';

export const sideBar = `
      <aside class="aside-container">
        <ul>
          <li class="aside-container__list">
            <a href="/admin" data-navigo>대시보드</a>
          </li>
          <li class="aside-container__list">
            <a href="/admin/product" data-navigo>상품관리</a>
          </li>
          <li class="aside-container__list">
            <a href="/admin/order" data-navigo>거래내역</a>
          </li>
        </ul>
      </aside>
  `;

export const dashboardPage = ` 
    <div class='dashboard-container' data-page='dashboard'>

      <div class='dashboard-container__current'>
        
      </div>

      <div class='dashboard-container__chart'>
       
      </div>

  </div>
`;

export const orderPage = `
    <div class='order-container' data-page='order'>
      <div class ='order-container__search'>
          <h2>거래 내역 관리</h2>
          <div class='order-container__search-container--input'>
              <input placeholder='거래자명을 입력해 주세요.'>
              <img class="button" src=${searchPNG} alt='검색'>
              <img class="initailize" src=${reloadSVG} alt='검색'>
          </div>
      </div>
      <li class='order-container__title'>
        <span style='width: 5%;'>NO</span>
        <span style='width: 10%;'>상품명</span>
        <span style='width: 15%;'>가격</span>
        <span style='width: 10%;'>거래자</span>
        <span style='width: 15%;'>거래은행</span>
        <span style='width: 15%;'>거래일시</span>
        <span style='width: 15%;'>취소여부</span>
        <span style='width: 15%;'>완료여부</span>
      </li>
      <ul class='order-container__list'>
        
      </ul>
      <div class='order-container__btn'>
        <nav class='order-container__btn-page'></nav> 
      </div>
    </div>
      `;

export const productPage = `
    <div class='product-container' data-page='product'>
        <div class ='product-container__search'>
            <h2>상품 관리</h2>
            <div class='product-container__search-container--input'>
                <input placeholder='상품명을 입력해 주세요.'>
                <img class="button" src=${searchPNG} alt='검색'>
                <img class="initailize" src=${reloadSVG} alt='검색'>
            </div>
        </div>
        <li class='product-container__title'>
          <input type="checkbox">
          <span style='width: 5%;'>NO</span>
          <span style='width: 10%;'>카테고리</span>
          <span style='width: 10%;'>상품명</span>
          <span style='width: 15%;'>가격</span>
          <span style='width: 15%;'>품절여부</span>
        </li>
        <ul class='product-container__list'>
          
        </ul>
        <div class='product-container__btn'>
            <button class='product-container__btn-delete'>삭제</button>
            <nav class='product-container__btn-page'></nav> 
            <a href ='/admin/product/add' data-navigo class='product-container__btn-add'>등록</a> 
        </div>
    </div>
`;

export const productAddPage = `
  <div class='productAdd-container' data-page='productAdd'>
    <form class='container-form'>
      <h2 class='container-form__header'>상품 등록</h2>
      <div class='container-form__content'>

          <div class='container-form__content--tags'>
            <p>카테고리<span>*</span></p>
            <select name='tags' required>
              <option value=''>선택</option>
              <option value='키보드'>키보드</option>
              <option value='키캡'>키캡</option>
              <option value='스위치'>스위치</option>
              <option value='액세서리'>액세서리</option>
            </select>
          </div>  
          <div class='container-form__content--title'>
            <p>제품명 <span>*</span></p>
            <input type='text' name='title' placeholder='제품명' required>
          </div>  
          <div class='container-form__content--price'>
            <p>가격 <span>*</span></p>
            <input type='number' name='price' placeholder='가격' required>
          </div>  
          <div class='container-form__content--description'>
            <p>제품상세설명<span>*</span></p>
            <textarea type='text' name='description' placeholder='제품 상세 설명' required></textarea>
          </div>
          <div class='container-form__content--thumbnail'>
            <div class='container-form__content--thumbnail--box'>
              <p>썸네일 이미지 <span>*</span></p>
              <input type="file" required>
            </div>
            <div class='container-form__content--thumbnail--preview'>
              <img src=''>
            </div>
          </div>
        </div>
        <div class='container-form__btn'>
          <button type='submit' class='container-form__btn--add'>추가</button>
          <a href ='/admin/product/' data-navigo class='container-form__btn--cancel'>취소</a> 
        </div>
        
      </div>    
    </form>
  </div>
`;

export const productDetailPage = `
  <div class='productDetail-container'>
    <div class='wrap'>
    
    </div>
    <div class='productDetail-container--btn'>
      <button class='productDetail-container--edit'>수정</button>
      <button class='productDetail-container--delete'>삭제</button>
    </div>
  </div>
`;

export const productEditPage = `
  <div class='wrap'>

  </div>
`;

export const orderDetailPage = `
  <div class='orderDetail-container'>
    <h2>거래 내역 상세</h2>
    <div class="orderDetail-container__info">

    </div>
    <div class='orderDetail-container__btn'>

    </div>
  </div>
`;
