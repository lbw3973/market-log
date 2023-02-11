// import calendar from './calendar.js';
import { base_url, api_key, user_name, admin_email } from '../../db.js';
// import { renderPage } from '../mypage.js';
import {
  reload,
  exclamationmark,
  paginationLeft,
  paginationRight,
  calendar,
} from './index.js';
const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};
// calendar();

export const htmlMypage_OrderHistory = `
<div class="mypage__container">
  <div class="mypage__orderhistory">
    <h2>주문 내역</h2>
    <div class="calendar-box">
      <input class="calendar-date"></input>
      <img class="calendar-icon icon icon-tabler icon-tabler-calendar-event" src="${calendar}"
        alt="calendar icon">
      <button><img src="${reload}" alt="reload icon"></button>
      <div class="calendar nodisplay">
        <div class="wrapper">
          <div class="curr-date ">
            <span></span>
            <span class="material-symbols-outlined" id="prev">
              chevron_left
            </span>
            <span class="material-symbols-outlined" id="next">
              chevron_right
            </span>
          </div>
          <div class="curr-dates">
            <ul class="weeks">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul class="days">
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="products-container">
      <div class="nocontent-box nodisplay">
        <p>
          <img src="${exclamationmark}" alt="exclamationmark">
          <span>주문내역이 존재하지 않습니다.</span>
        </p>
      </div>
      <ul class="products">
        <li class="product">
          <a href="#"><img src="#" alt="product-image" class="product--img" /></a>
          <div class="product--info">
            <a href="./detailedorderlist.html" class="product--name">PLAY 트리 잭슨 프렌즈 토이</a>
            <div class="product--info-numbers">
              <div class="product--price">10,000원</div>
              <div class="product--order-date">2023-02-01</div>
            </div>
            <span class="order-status"> 구매 완료 </span>
            <span>구매가 완료 되었습니다.</span>
            <span>구매 확정 이후에는 주문 취소가 불가능합니다.</span>
          </div>
          <div class="buttons">
            <button class="button cancel-btn">주문 취소</button>
            <button class="button orderfix-btn">구매 확정</button>
          </div>
        </li>
        <li class="product">
          <a href="#"><img src="#" alt="product-image" class="product--img" /></a>
          <div class="product--info">
            <a href="#" class="product--name">PLAY 트리 잭슨 프렌즈 토이</a>
            <div class="product--info-numbers">
              <div class="product--price">10,000원</div>
              <div class="product--order-date">2023-02-01</div>
            </div>
            <span class="order-status"> 구매 완료 </span>
            <span>구매가 완료 되었습니다.</span>
            <span>구매 확정 이후에는 주문 취소가 불가능합니다.</span>
          </div>
          <div class="buttons">
            <button class="button cancel-btn">주문 취소</button>
            <button class="button orderfix-btn">구매 확정</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-history--pagination">
      <img src="${paginationLeft}" alt="pagination-left">
      <span>1</span>
      <img src="${paginationRight}" alt="pagination-right">
    </div>
  </div>
</div>
`;
export async function initFuncOrderHistory() {
  //제품 정보
  const productEl = document.querySelector('.product');

  // 모달창
  const cancelBtns = document.querySelectorAll('.cancel-btn');
  const orderfixBtns = document.querySelectorAll('.orderfix-btn');
  const modalOrdercancelEl = document.querySelector('.modal-ordercancel');
  const modalOrderFixEl = document.querySelector('.modal-orderfix');
  const cancelYesBtn = document.querySelector('.cancel-yes-btn');
  const cancelNoBtn = document.querySelector('.cancel-no-btn');
  const modalOrderCancelFixEl = document.querySelector(
    '.modal-ordercancel-fix',
  );
  const cancelCloseBtn = document.querySelector('.cancel-close-btn');
  // const fixYesBtn = document.querySelector('.fix-yes-btn');
  // const fixNoBtn = document.querySelector('.fix-no-btn');
  const modalOrderFixFixEl = document.querySelector('.modal-orderfix-fix');
  const orderfixCloseBtn = document.querySelector('.orderfix-close-btn');
  //주문취소버튼
  cancelBtns.forEach((item) => {
    item.addEventListener('click', () => {
      modalOrdercancelEl.classList.remove('nodisplay');
    });
  });
  // cancelNoBtn.addEventListener('click', () => {
  //   modalOrdercancelEl.classList.add('nodisplay');
  // });
  // cancelYesBtn.addEventListener('click', () => {
  //   //주문상태 취소로 변경
  //   cancelOrder();
  //   modalOrdercancelEl.classList.add('nodisplay');
  //   modalOrderCancelFixEl.classList.remove('nodisplay');
  //   cancelCloseBtn.addEventListener('click', () => {
  //     modalOrderCancelFixEl.classList.add('nodisplay');
  //   });
  // });

  //주문확정버튼
  // orderfixBtns.forEach((item) => {
  //   item.addEventListener('click', () => {
  //     modalOrderFixEl.classList.remove('nodisplay');
  //   });
  // });
  // fixNoBtn.addEventListener('click', () => {
  //   modalOrderFixEl.classList.add('nodisplay');
  // });
  // fixYesBtn.addEventListener('click', () => {
  //   orderFix();
  //   modalOrderFixEl.classList.add('nodisplay');
  //   modalOrderFixFixEl.classList.remove('nodisplay');
  // });
  // orderfixCloseBtn.addEventListener('click', () => {
  //   modalOrderFixFixEl.classList.add('nodisplay');
  // });
}

//페이지 렌더하기
// async function renderPage() {
//   const orderHistories = getOrderHistory();
//   printOrderHistory(orderHistories);
// }

//전체주문내역가져오기
async function getOrderHistory() {
  const res = await fetch(`${base_url}/products/transactions/details`, {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();
  console.log('전체주문내역', json);
  return json; //array
}

//전체주문내역출력하기
async function printOrderHistory(orderHistories) {
  Array.from(orderHistories).forEach((orderHistory) => {
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
    const productsEl = document.querySelector('ul.products');
    productsEl.append(productEl);
  });
}

//상세주문내역(단일주문내역)불러오기
async function getDetailHistory(item) {
  const res = await fetch(`${base_url}/products/transactions/details`, {
    method: 'POST',
    headers: { Authorization: Bearer`${localStorage.getItem('token')}` },
    body: JSON.stringify(item.id),
  });
  const json = await res.json();
  console.log('단일주문내역', json);

  return json;
}

// 주문 취소하기
async function cancelOrder(item) {
  await fetch(`${base_url}/products/cancel}`, {
    method: 'POST',
    headers: { Authorization: Bearer`${localStorage.getItem('token')}` },
    body: JSON.stringify(item.id),
  });
}

//주문 확정하기
async function orderFix(item) {
  await fetch(`${base_url}/products/ok`, {
    method: 'POST',
    headers: { Authorization: Bearer`${localStorage.getItem('token')}` },
    body: JSON.stringify(item.id),
  });
}

//페이지 로드 시
// window.addEventListener('load', () => {
//   const orderHistories = getOrderHistory();
//   printOrderHistory(orderHistories);
// });

// //주문취소버튼

// [...cancelBtns].forEach((item) => {
//   item.addEventListener('click', () => {
//     modalOrdercancelEl.classList.remove('nodisplay');
//   });
// });
// cancelNoBtn.addEventListener('click', () => {
//   modalOrdercancelEl.classList.add('nodisplay');
// });
// cancelYesBtn.addEventListener('click', () => {
//   //주문상태 취소로 변경
//   cancelOrder();
//   modalOrdercancelEl.classList.add('nodisplay');
//   modalOrderCancelFixEl.classList.remove('nodisplay');
//   cancelCloseBtn.addEventListener('click', () => {
//     modalOrderCancelFixEl.classList.add('nodisplay');
//   });
// });

// //주문확정버튼
// [...orderfixBtns].forEach((item) => {
//   item.addEventListener('click', () => {
//     modalOrderFixEl.classList.remove('nodisplay');
//   });
// });
// fixNoBtn.addEventListener('click', () => {
//   modalOrderFixEl.classList.add('nodisplay');
// });
// fixYesBtn.addEventListener('click', () => {
//   orderFix();
//   modalOrderFixEl.classList.add('nodisplay');
//   modalOrderFixFixEl.classList.remove('nodisplay');
// });
// orderfixCloseBtn.addEventListener('click', () => {
//   modalOrderFixFixEl.classList.add('nodisplay');
// });
