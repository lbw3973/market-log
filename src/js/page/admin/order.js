import { getAllOrder } from './api.js';

import { renderPageBtn, renderOrder } from './renderDetail.js';

let orders = [];

let activeIdx = 1;
const itemsPerPage = 10;

// 현재 페이지의 상품목록 가져오기
const getOrderCurrentPage = (orders, activeIdx, itemsPerPage) => {
  const start = (activeIdx - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newOrders = orders.slice(start, end);
  return newOrders;
};

// 상품 목록 페이지 초기화
const setUpUI = (orderPageBtn, orderList) => {
  renderPageBtn(orderPageBtn, orders, activeIdx, itemsPerPage);
  newOrders = getOrderCurrentPage(orders, activeIdx, itemsPerPage);
  renderOrder(orderList, newOrders, activeIdx);
};

let newOrders = getOrderCurrentPage(orders, activeIdx, itemsPerPage);

// 상품관리 페이지 초기화
export const orderHandler = async () => {
  const orderContainer = document.querySelector('.order-container');
  const orderList = orderContainer.querySelector('.order-container__list');
  const orderPageBtn = orderContainer.querySelector(
    '.order-container__btn-page',
  );

  orders = await getAllOrder();
  console.log(orders);

  setUpUI(orderPageBtn, orderList);

  const searchContainer = orderContainer.querySelector(
    '.order-container__search-container--input',
  );

  const searchedOrderInput = searchContainer.querySelector('input');
  const searchedOrderBtn = searchContainer.querySelector('img');

  // 상품 검색
  searchedOrderBtn.addEventListener('click', async () => {
    keyword = searchedOrderInput.value;
    const filteredOrder = orders.filter((order) =>
      order.user.displayName.includes(keyword),
    );

    console.log(filteredOrder);

    orderList.innerHTML = ``;
    // console.log(orderList.textContent);
    renderPageBtn(orderPageBtn, filteredOrder, activeIdx, itemsPerPage);
    newOrders = getOrderCurrentPage(filteredOrder, activeIdx, itemsPerPage);
    renderOrder(orderList, newOrders, activeIdx);
  });

  //버튼 클릭 페이지 이동
  orderPageBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-page')) return;

    if (e.target.classList.contains('btn-page--number')) {
      let numberBtn = e.target;
      activeIdx = parseInt(numberBtn.textContent);
    }

    if (e.target.classList.contains('btn-page--next')) {
      activeIdx++;
      if (activeIdx > Math.ceil(orders.length / itemsPerPage) - 1) {
        activeIdx = Math.ceil(orders.length / itemsPerPage);
      }
    }

    if (e.target.classList.contains('btn-page--prev')) {
      activeIdx--;
      if (activeIdx < 1) {
        activeIdx = 1;
      }
    }

    orderList.innerHTML = ``;
    setUpUI(orderPageBtn, orderList);
  });
};
