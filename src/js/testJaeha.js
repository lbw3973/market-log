// import Navigo from 'navigo';
// export const router = new Navigo('/');

// import { handleCartPage } from './page/cartPage/cartPage.js';
// import { handleMainPage } from './page/mainPage/mainPage.js';
// import { handleCategoryPage } from './page/categoryPage/categoryPage.js';
// import { handleSearchPage } from './page/searchPage/searchPage.js';
// import { handleDetailProductPage } from './page/productDetail/productDetail.js';
// import { handleWishListPage } from './page/wishListPage/wishListPage.js';
// import { handleDetailOrderHistoryPage } from './page/detailOrderHistoryPage/detailOrderHistory.js';
// import { handlePaymentPage } from './page/paymentPage/paymentPage.js';
// import { handleOrderHistoryPage } from './page/orderHistory/orderHistory.js';

// /*-----------------------------------*\
//   # navigo router
// \*-----------------------------------*/

// router
//   .on({
//     '/': async () => {
//       handleMainPage();
//     },
//     '/products/search': () => {
//       handleSearchPage();
//     },
//     '/product/:id': (params) => {
//       handleDetailProductPage(params.data.id);
//     },
//     '/cart': () => {
//       handleCartPage();
//     },
//     '/payment': () => {
//       handlePaymentPage();
//     },
//     '/category/keyboards': () => {
//       handleCategoryPage(0);
//     },
//     '/category/keycaps': () => {
//       handleCategoryPage(1);
//     },
//     '/category/switches': () => {
//       handleCategoryPage(2);
//     },
//     '/category/accessories': () => {
//       handleCategoryPage(3);
//     },
//     // 마이페이지 찜하기 목록
//     '/mypage/wishlist': () => {
//       handleWishListPage();
//     },
//     // 마이페이지 주문내역 목록
// '/mypage/order': () => {
//   handleOrderHistoryPage();
// },
//     // 마이페이지 상세 주문내역 목록
//     '/mypage/order/:id': async (params) => {
//       handleDetailOrderHistoryPage(params.data.id);
//     },
//   })
//   .resolve();
