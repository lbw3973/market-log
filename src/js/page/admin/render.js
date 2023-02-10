import searchPNG from '../../../../public/search.png';

export const dashboardPage = ` 
    <div class='dashboard-container' data-page='dashboard'>대시보드
      <button>상품수정</button>
    </div>
`;

export const orderPage = `
    <div class='order-container' data-page='order'>거래내역
    </div>
`;

export const productPage = `
    <div class='product-container' data-page='product'>
        <div class ='product-container__search'>
            <h2>상품관리</h2>
            <div class='product-container__search-container--input'>
                <input placeholder='상품명을 입력해 주세요.'>
                <img class="button" src=${searchPNG} alt='검색'>
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
              <option value='가전'>가전</option>
              <option value='pc'>pc</option>
              <option value='건강'>건강</option>
              <option value='케어'>케어</option>
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
          <a href ='/admin/product/' data-navigo container-form__btn--cancel'>취소</a> 
        </div>
      </div>    
    </form>
  </div>
`;
