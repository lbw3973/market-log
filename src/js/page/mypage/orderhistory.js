import calendar from './calendar';
import { base_url, api_key, user_name, admin_email } from '../../db';
import { doc } from 'prettier';
calendar();
//제품 정보
const productsEl = document.querySelector('ul.products');
const productEl = document.querySelector('.product');

// 모달창
const cancelBtns = document.querySelectorAll('.cancel-btn');
const orderfixBtns = document.querySelectorAll('.orderfix-btn');
const modalOrdercancelEl = document.querySelector('.modal-ordercancel');
const modalOrderFixEl = document.querySelector('.modal-orderfix');
const cancelYesBtn = document.querySelector('.cancel-yes-btn');
const cancelNoBtn = document.querySelector('.cancel-no-btn');
const modalOrderCancelFixEl = document.querySelector('.modal-ordercancel-fix');
const cancelCloseBtn = document.querySelector('.cancel-close-btn');
const fixYesBtn = document.querySelector('.fix-yes-btn');
const fixNoBtn = document.querySelector('.fix-no-btn');
const modalOrderFixFixEl = document.querySelector('.modal-orderfix-fix');
const orderfixCloseBtn = document.querySelector('.orderfix-close-btn');

//페이지 렌더하기
async function renderPage() {
  const orderHistories = getOrderHistory();
  printOrderHistory(orderHistories);
}

//전체주문내역가져오기
const orderhistoryURL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details ';
async function getOrderHistory() {
  const res = await fetch(orderhistoryURL, {
    method: 'GET',
    headers: 'Authorization: Bearer <accessToken>',
  });
  const json = await res.json();
  console.log('전체주문내역', json);
  return json; //array
}

//전체주문내역출력하기
async function printOrderHistory(orderHistories) {
  orderHistories.forEach((orderHistory) => {
    const productEl = document.createElement('li');
    productEl.classList.add('product');
    if (orderHistory.isCanceled) {
      productEl.innerHTML = `
    <a
    href="https://market-mong-nyang.netlify.app/products/${
      orderHistory.detailId
    }"
    ><img
      src="${orderHistory.thumbnail}"
      alt="product-image"
      class="product--img"
  /></a>
  <div class="product--info">
    <a href="#" class="product--name">${orderHistory.product.title}</a>
    <div class="product--info-numbers">
      <div class="product--price">${orderHistory.product.price}</div>
      <div class="product--order-date">
        ${orderHistory.timePaid.slice(0, 10)}
      </div>
    </div>
    <span class="order-status">취소 완료</span>
    <span>구매가 취소 되었습니다.</span>
  </div>
  
`;
    } else if (orderHistory.done) {
      productEl.innerHTML = `
    <a
    href="https://market-mong-nyang.netlify.app/products/${
      orderHistory.detailId
    }"
    ><img
      src="${orderHistory.thumbnail}"
      alt="product-image"
      class="product--img"
  /></a>
  <div class="product--info">
    <a href="#" class="product--name">${orderHistory.product.title}</a>
    <div class="product--info-numbers">
      <div class="product--price">${orderHistory.product.price}</div>
      <div class="product--order-date">
        ${orderHistory.timePaid.slice(0, 10)}
      </div>
    </div>
    <span class="order-status">구매 확정</span>
    <span>구매가 확정 되었습니다.</span>
    <span>구매 확정 이후에는 주문 취소가 불가능합니다.</span>
  </div>
  
`;
    } else {
      productEl.innerHTML = `
    <a
    href="https://market-mong-nyang.netlify.app/products/${
      orderHistory.detailId
    }"
    ><img
      src="${orderHistory.thumbnail}"
      alt="product-image"
      class="product--img"
  /></a>
  <div class="product--info">
    <a href="#" class="product--name">${orderHistory.product.title}</a>
    <div class="product--info-numbers">
      <div class="product--price">${orderHistory.product.price}</div>
      <div class="product--order-date">
        ${orderHistory.timePaid.slice(0, 10)}
      </div>
    </div>
    <span class="order-status">구매 완료</span>
    <span>구매가 완료 되었습니다.</span>
    <span>구매 확정 이후에는 주문 취소가 불가능합니다.</span>
  </div>
  <div class="buttons">
    <button class="button cancel-btn">주문 취소</button>
    <button class="button orderfix-btn">구매 확정</button>
  </div>  
`;
    }
    productsEl.append(productEl);
  });
}

//상세주문내역(단일주문내역)불러오기
const detailHistoryURL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail';
async function getDetailHistory(item) {
  const res = await fetch(orderhistoryURL, {
    method: 'POST',
    headers: 'Authorization: Bearer <accessToken>',
    body: JSON.stringify(item.id),
  });
  const json = await res.json();
  console.log('단일주문내역', json);

  return json;
}

// 주문 취소하기
const cancelUrl =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel';
async function cancelOrder(item) {
  await fetch(cancelUrl, {
    method: 'POST',
    headers: 'Authorization: Bearer <accessToken>',
    body: JSON.stringify(item.id),
  });
}

//주문 확정하기
const orderfixUrl =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok ';
async function orderFix(item) {
  await fetch(orderfixUrl, {
    method: 'POST',
    headers: 'Authorization: Bearer <accessToken>',
    body: JSON.stringify(item.id),
  });
}

//페이지 로드 시
window.addEventListener('load', () => {
  const orderHistories = getOrderHistory();
  printOrderHistory(orderHistories);
});

//주문취소버튼
cancelBtns.forEach((item) => {
  item.addEventListener('click', () => {
    modalOrdercancelEl.classList.remove('nodisplay');
  });
});
cancelNoBtn.addEventListener('click', () => {
  modalOrdercancelEl.classList.add('nodisplay');
});
cancelYesBtn.addEventListener('click', () => {
  //주문상태 취소로 변경
  cancelOrder();
  modalOrdercancelEl.classList.add('nodisplay');
  modalOrderCancelFixEl.classList.remove('nodisplay');
  cancelCloseBtn.addEventListener('click', () => {
    modalOrderCancelFixEl.classList.add('nodisplay');
  });
});

//주문확정버튼
orderfixBtns.forEach((item) => {
  item.addEventListener('click', () => {
    modalOrderFixEl.classList.remove('nodisplay');
  });
});
fixNoBtn.addEventListener('click', () => {
  modalOrderFixEl.classList.add('nodisplay');
});
fixYesBtn.addEventListener('click', () => {
  orderFix();
  modalOrderFixEl.classList.add('nodisplay');
  modalOrderFixFixEl.classList.remove('nodisplay');
});
orderfixCloseBtn.addEventListener('click', () => {
  modalOrderFixFixEl.classList.add('nodisplay');
});
