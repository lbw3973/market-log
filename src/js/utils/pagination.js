import { getAllTransactions } from '../api';
import { renderOrderedProductList } from '../page/orderHistory/orderHistory.js';

let utilIndex = 0;
let utilPages = [];

const utilSetupUI = () => {
  renderOrderedProductList(utilPages[utilIndex]);
  utilDisplayButtons($('.order-history--pagination'), utilPages, utilIndex);
};

export const utilInit = async () => {
  const orderHistory = await getAllTransactions();
  pages = utilPaginate(orderHistory);

  utilSetupUI();
};

export const utilPaginate = (orderHistoryList) => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(orderHistoryList.length / itemsPerPage);

  const newOrderHistory = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;

    return orderHistoryList.slice(start, start + itemsPerPage);
  });

  return newOrderHistory;
};

const utilDisplayButtons = (container, pages, activeIndex) => {
  let utilBtns = pages.map((_, pageIndex) => {
    return `
    <button class="page-btn ${
      activeIndex === pageIndex ? 'active-btn' : 'null'
    }" data-index="${pageIndex}">
      ${pageIndex + 1}
    </button>`;
  });
  console.log(utilBtns);
  utilBtns.push(`<button class="next-btn">next</button>`);
  utilBtns.unshift(`<button class="prev-btn">prev</button>`);
  container.innerHTML = utilBtns.join('');
};
