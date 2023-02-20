// import { $ } from '../utils/dom.js';
// let utilIndex = 0;
// let utilPages = [];

// export const utilSetupUI = (btnContainer) => {
//   renderProductList(utilPages[utilIndex]);
//   utilDisplayButtons(btnContainer, utilPages, utilIndex);
// };

// export const utilInit = async (arrayAPI, btnContainer) => {
//   utilPages = utilPaginate(arrayAPI);

//   utilSetupUI(btnContainer);
// };

// export const utilPaginate = (list) => {
//   console.log(list);
//   const itemsPerPage = 10;
//   const numberOfPages = Math.ceil(list.length / itemsPerPage);

//   const newList = Array.from({ length: numberOfPages }, (_, index) => {
//     const start = index * itemsPerPage;

//     return list.slice(start, start + itemsPerPage);
//   });

//   return newList;
// };

// const utilDisplayButtons = (container, pages, activeIndex) => {
//   let utilBtns = pages.map((_, pageIndex) => {
//     return `
//     <button class="order-history__pagination--btn ${
//       activeIndex === pageIndex ? 'active-btn' : 'null'
//     }" data-index="${pageIndex}">
//       ${pageIndex + 1}
//     </button>`;
//   });

//   utilBtns.push(
//     `<button class="order-history__pagination--btn-next">다음</button>`,
//   );
//   utilBtns.unshift(
//     `<button class="order-history__pagination--btn-prev">이전</button>`,
//   );
//   container.innerHTML = utilBtns.join('');
// };

// $('.app').addEventListener('click', (e) => {
//   if (e.target.classList.contains('order-history__pagination--btnsContainer'))
//     return;

//   if (e.target.classList.contains('order-history__pagination--btn')) {
//     utilIndex = Number(e.target.dataset.index);
//   }

//   if (e.target.classList.contains('order-history__pagination--btn-next')) {
//     utilIndex++;
//     if (utilIndex > utilPages.length - 1) {
//       utilIndex = 0;
//     }
//   }
//   if (e.target.classList.contains('order-history__pagination--btn-prev')) {
//     utilIndex--;
//     if (utilIndex < 0) {
//       utilIndex = utilPages.length - 1;
//     }
//   }

//   utilSetupUI();
// });
