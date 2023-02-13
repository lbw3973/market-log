export const renderEditProduct = (productEdit) => {
  const { id, description, isSoldOut, price, tags, title, thumbnail } =
    productEdit;

  console.log(tags);
  return `
      <div class='productEdit-container'>
        <form class='container-form'>
        <h2 class='container-form__header'>상품 등록</h2>
        <div class='container-form__content'>

            <div class='container-form__content--tags'>
              <p>카테고리<span>*</span></p>
              <select name='tags' required>
                <option value='키보드' ${
                  tags[0] === '키보드' ? 'selected' : ''
                }>키보드</option>
                <option value='키캡'  ${
                  tags[0] === '키캡' ? 'selected' : ''
                }>키캡</option>
                <option value='스위치'  ${
                  tags[0] === '스위치' ? 'selected' : ''
                }>스위치</option>
                <option value='액세서리'  ${
                  tags[0] === '액세서리' ? 'selected' : ''
                }>액세서리</option>
              </select>
            </div>  
            <div class='container-form__content--title'>
              <p>제품명 <span>*</span></p>
              <input type='text' name='title' placeholder='제품명' required value='${title}'>
            </div>  
            <div class='container-form__content--price'>
              <p>가격 <span>*</span></p>
              <input type='number' name='price' placeholder='가격' required value='${price}'>
            </div>  
            <div class='container-form__content--description'>
              <p>제품상세설명<span>*</span></p>
              <textarea type='text' name='description' placeholder='제품 상세 설명' required>${description}</textarea>
            </div>
            <div class='container-form__content--soldout'>
              <p>품절 여부<span>*</span></p>
              <select name='tags' required>
                <option value='true' '${
                  isSoldOut ? 'selected' : ''
                }'>품절</option>
                <option value='false' '${
                  isSoldOut ? 'selected' : ''
                }'>판매가능</option>
              </select>
            </div> 
            <div class='container-form__content--thumbnail'>
              <div class='container-form__content--thumbnail--box'>
                <p>썸네일 이미지 <span>*</span></p>
                <input type="file" required src="${thumbnail}">
              </div>
              <div class='container-form__content--thumbnail--preview'>
                <img src='${thumbnail}' alt='${title}'>
              </div>
            </div>
          </div>
        </div>
        <div class='container-form__btn'>
          <button type='submit' class='container-form__btn--edit'>수정 완료</button>
          <button>테스트</button>
          <a href ='/admin/product/${id}' data-navigo class='container-form__btn--cancel'>취소</a> 
        </div>
        </form>
      </div> 
    `;
};

export const renderDetailProduct = (productDetail) => {
  const { description, isSoldOut, price, tags, title, thumbnail } =
    productDetail;

  const productDetailEl = `
      <img src="${thumbnail}" alt="${title}">
      <div class="productDetail-container">
        <div class="productDetail-container__info">
          <div class="productDetail-container__info--category">
            <h2>카테고리</h2>
            <p>${tags[0]}</P>
          </div>
          <div class="productDetail-container__info--title">
            <h2>상품명</h2>
            <p>${title}</P>
          </div>
          <div class="productDetail-container__info--price">
            <h2>가격</h2>
            <p>${price}</P>
          </div>
          <div class="productDetail-container__info--soldout">
            <h2>품절 여부</h2>
            <p>${isSoldOut ? '품절' : '판매가능'}</P>
          </div>
          <div class="productDetail-container__info--descripiton">
            <h2>상품 설명</h2>
            <p>${description}</P>
          </div>
        </div>
      </div>
    `;

  document.querySelector('.wrap').innerHTML = productDetailEl;
};

export const orderDetailProduct = (orderDetail) => {
  const { detailId, user, account } = orderDetail;

  const orderDetailEl = `
      <img src="${thumbnail}" alt="{title}">
      <div class="productDetail-container">
        <div class="productDetail-container__info">
          <div class="productDetail-container__info--category">
            <h2>카테고리</h2>
            <p>${tags}</P>
          </div>
          <div class="productDetail-container__info--title">
            <h2>상품명</h2>
            <p>${title}</P>
          </div>
          <div class="productDetail-container__info--price">
            <h2>가격</h2>
            <p>${price}</P>
          </div>
          <div class="productDetail-container__info--soldout">
            <h2>품절 여부</h2>
            <p>${isSoldOut ? '품절' : '판매가능'}</P>
          </div>
          <div class="productDetail-container__info--descripiton">
            <h2>상품 설명</h2>
            <p>${description}</P>
          </div>
        </div>
      </div>
    `;

  document.querySelector('.wrap').innerHTML = orderDetailEl;
};

// 페이지네이션 버튼 렌더
export const renderPageBtn = (
  productPageBtn,
  products,
  activeIdx,
  itemsPerPage,
) => {
  let buttonsEl = ``;

  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    buttonsEl += `<button class='btn-page--number ${
      activeIdx === i ? 'active' : ''
    }'>${i}</button>`;
  }

  productPageBtn.innerHTML = `
            <button class='btn-page--prev'>이전</button>
            ${buttonsEl}
            <button class='btn-page--next'>다음</button>
      `;
};

// 현재 페이지의 상품 목록 렌더
export const renderProduct = (productList, products, activeIdx) => {
  const productsEl = products
    .map((product, idx) => {
      const { id, tags, title, price, isSoldOut } = product;

      return `
        <li>
          <a href='/admin/product/${id}' data-navigo>
            <input type="checkbox">
            <span style='width: 5%;'>${idx + 1 + (activeIdx - 1) * 10}</span>
            <span style='width: 10%;'>${tags[0]}</span>
            <span style='width: 10%;'>${title}</span>
            <span style='width: 15%;'>${price.toLocaleString()} 원</span>
            <span style='width: 15%;'>${isSoldOut ? '품절' : '판매가능'}</span>
          </a>
        </li>  
        `;
    })
    .join('');

  productList.innerHTML = productsEl;
};

export const renderOrder = (orderList, orders, activeIdx) => {
  const ordersEl = orders
    .map((order, idx) => {
      const { product, user, account, timePaid, isCanceled, done, detailId } =
        order;

      return `
        <li>
          <a href='/admin/order/${detailId}' data-navigo>
            <span style='width: 5%;'>${idx + 1 + (activeIdx - 1) * 10}</span>
            <span style='width: 10%;'>${product.title}</span>
            <span style='width: 10%;'>${product.price.toLocaleString()} 원</span>
            <span style='width: 15%;'>${user.displayName}</span>
            <span style='width: 15%;'>${account.bankName}</span>
            <span style='width: 15%;'>${timePaid}</span>
            <span style='width: 15%;'>${isCanceled}</span>
            <span style='width: 15%;'>${done}</span>
          </a>
        </li>  
        `;
    })
    .join('');

  orderList.innerHTML = ordersEl;
};

export const renderOrderDetailBtn = (detailId) => {
  const btnsEl = `
      <button class='orderDetail-container--edit'>수정</button>
      <button class='orderDetail-container--delete'>삭제</button>
      `;

  document.querySelector('.orderDetail-container').innerHTML = btnsEl;
};
