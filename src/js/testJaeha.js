import Navigo from 'navigo';
export const router = new Navigo('/');
const $ = (selector) => document.querySelector(selector);

import { shoppingCartStore } from './page/cart/cart.js';
import { renderMainPageTemplate } from './page/mainPage/mainPage.js';
import {
  renderInitCategoryPage,
  renderSkeletonUIinCategoryPage,
  renderCategoryProductList,
  getProductTags,
  getSortedLowToHighPriceProduct,
  getSortedHighToLowPriceProduct,
  renderCategoryProductBySelect,
  renderCategoryProductQty,
} from './page/categoryPage/categoryPage.js';
import {
  renderSearchedProductList,
  searchPageNoSearchResultTemplate,
  findProduct,
  handleSearchPageResult,
} from './page/searchPage/searchPage.js';
import {
  wishListStore,
  checkWhetherAddWishList,
  storeWishList,
} from './page/productDetail/productDetail.js';
import {
  renderInitMypageTemplate,
  handleWishListInitTemplate,
  renderWishListProductList,
  handleEmptyWishlistInit,
  renderWishListPage,
} from './page/wishListPage/wishListPage.js';
import {
  handleOrderHistoryInitTemplate,
  renderOrderedProductList,
  renderSkeletonUIinOrderHistoryPage,
  emptyOrderHistory,
  renderOrderedListPage,
  checkWhetherTransactionIsDone,
} from './page/orderHistory/orderHistory.js';
import {
  checkWhetherDetailOrderTransactionIsDone,
  renderDetailOrderProduct,
  renderSkeletonUIinDetailOrderHistoryPage,
  renderDetailOrderPage,
} from './page/detailOrderHistoryPage/detailOrderHistory.js';
import {
  renderSkeletonUIinDetailProductPage,
  storeCart,
  renderDetailProduct,
  pushInCart,
  renderCartTotalPrice,
  renderInitCartPage,
  renderCartOrderPrice,
  renderCartList,
  storeLocalStorage,
  renderCartPage,
  handleModal,
  updateInfo,
} from './page/productDetail/productDetail.js';
import {
  renderProductTotalQty,
  renderInitPaymentPage,
  renderPaymentProductList,
  renderPaymentAccount,
  renderNoPaymentAccount,
  renderKakaoMap,
  activePaymentBtn,
  renderSelectedPayment,
  paymentPageFunction,
  renderFinalPaymentPrice,
  checkBalanceOfselectedBankAccount,
  handlePaymentBtnLogic,
} from './page/paymentPage/paymentPage.js';

/** Navigo innerHTML template */
export const renderPage = (html) => {
  $('.app').innerHTML = html;
};

/** 날짜 format 함수 */
export const formatDate = (target) => {
  const date = new Date(target);
  const year = String(date.getFullYear()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const today = String(date.getDate()).padStart(2, 0);
  const hour = String(date.getHours()).padStart(2, 0);
  const min = String(date.getMinutes()).padStart(2, 0);
  return `${year}.${month}.${today} | ${hour}:${min}`;
};
export const formatPrice = (target) => {
  if (target) {
    let result = target.toLocaleString('ko-KR');
    return result;
  }
};

/*-----------------------------------*\
  제품 상세 페이지 이벤트 #productDetail js
\*-----------------------------------*/

/*-----------------------------------*\
  찜하기 페이지 이벤트 #wishList js
\*-----------------------------------*/

/*-----------------------------------*\
  주문 내역 페이지 이벤트 #orderHistory js
\*-----------------------------------*/

// productDetail 제품 상세페이지

import cartSVG from '../../public/cart.svg';

/*-----------------------------------*\
  # 장바구니 페이지 cart js
\*-----------------------------------*/

/*-----------------------------------*\
  # 결제 페이지 # pay js
\*-----------------------------------*/

/*-----------------------------------*\
  # navigo router
\*-----------------------------------*/

router
  .on({
    '/': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/ route is working');
      renderPage(renderMainPageTemplate);
    },
    '/products/search': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/products/search route is working');
      // 제품 검색
      // renderPage(renderInitCategoryPage);
      // renderSearchedProductList(await findProduct());
      // renderSearchedProductLength();
      await handleSearchPageResult();
    },
    '/product/:id': async (params) => {
      console.log('product/:id route is working');
      console.log('params', params);
      // renderSkeletonUIinDetailProductPage();
      console.log('123');
      await renderDetailProduct(params.data.id);
      console.log('1234');

      // $('.app')
      //   .querySelector('.buyBtn')
      //   ?.addEventListener('click', (e) => {
      //     console.log(e.target);
      //     router.navigate('/payment');
      //   });
    },
    '/cart': () => {
      $('.modal__addCart').style.display = 'none';
      // 초기 템플릿, ul태그 삽입
      renderPage(renderInitCartPage);
      console.log('/cart');
      // console.log('shoppingCartArr', shoppingCartArr);

      // 카트 페이지 렌더
      renderCartPage();
    },
    '/payment': async () => {
      $('.modal__addCart').style.display = 'none';
      // 초기 결제 페이지 렌더
      renderPage(renderInitPaymentPage);
      renderFinalPaymentPrice();
      // 결제 페이지 렌더 후 실행할 함수들
      await paymentPageFunction();

      // /** 결제 버튼 클릭시 결제 진행 (리팩토링 예정)*/
      // $('.app')
      //   .querySelector('.payment-method__final-confirm--btn')
      //   .addEventListener('click', async (e) => {
      //     e.preventDefault();
      //     if ($('.pay__info-zipcode--data-input').value === '') {
      //       $('.pay__info-zipcode--data-input').focus();
      //       alert('우편번호를 입력해주세요');
      //       return;
      //     }
      //     if ($('.pay__info--payer--name-input').value === '') {
      //       $('.pay__info--payer--name-input').focus();
      //       alert('주문자 이름을 입력해주세요.');
      //       return;
      //     }
      //     // 결제가 성공하면 구매내역 페이지로 라우팅 (지금은 홈으로 이동)
      //     await handlePaymentBtnLogic(e);
      //   });
    },
    '/category/keyboards': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/keyboards');
      renderPage(renderInitCategoryPage);
      renderSkeletonUIinCategoryPage();
      const getKeyBoardCategory = await getProductTags();
      renderCategoryProductList(await getKeyBoardCategory[0]);
      await renderCategoryProductQty(0);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);

          renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            0,
          );
        });
    },
    '/category/keycaps': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/keycaps');
      renderPage(renderInitCategoryPage);
      renderSkeletonUIinCategoryPage();
      const getKeyBoardCategory = await getProductTags();
      renderCategoryProductList(await getKeyBoardCategory[1]);
      await renderCategoryProductQty(1);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            1,
          );
        });
    },
    '/category/switches': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/switches');
      renderPage(renderInitCategoryPage);
      renderSkeletonUIinCategoryPage();
      const getKeyBoardCategory = await getProductTags();
      renderCategoryProductList(await getKeyBoardCategory[2]);
      await renderCategoryProductQty(2);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            2,
          );
        });
    },
    '/category/accessories': async () => {
      $('.modal__addCart').style.display = 'none';
      console.log('/category/accessories');
      renderPage(renderInitCategoryPage);
      renderSkeletonUIinCategoryPage();
      const getKeyBoardCategory = await getProductTags();
      renderCategoryProductList(await getKeyBoardCategory[3]);
      await renderCategoryProductQty(3);

      // 가격 정렬 이벤트
      $('.app')
        .querySelector('#categoryPage-filterByPrice')
        ?.addEventListener('change', async (e) => {
          console.log(e.target);
          return renderCategoryProductBySelect(
            await $('#categoryPage-filterByPrice').options[
              $('#categoryPage-filterByPrice').selectedIndex
            ].value,
            3,
          );
        });
    },
    // 마이페이지 찜하기 목록
    '/mypage/wishlist': () => {
      renderWishListPage();
    },
    // 마이페이지 주문내역 목록
    '/mypage/order': async () => {
      await renderOrderedListPage();
    },
    '/mypage/order/:id': async (params) => {
      console.log('order params', params);
      renderPage(renderInitMypageTemplate);
      renderSkeletonUIinDetailOrderHistoryPage();
      console.log(params.data.id);
      await renderDetailOrderPage(params.data.id);
    },
  })
  .resolve();

/** 모달 핸들 함수 */
// export const handleModal = (e) => {
//   // '장바구니에 담기' 버튼 클릭 시, 모달 오픈
//   if (
//     e.target.classList.contains('addCartBtn') ||
//     e.target.classList.contains('wishList-AddToCartBtn')
//   ) {
//     $('.modal__addCart').style.display = 'block';
//     return;
//   }

//   // '모달 창 밖에 클릭 시 닫기'
//   if (e.target !== $('.modal__addCart')) {
//     $('.modal__addCart').style.display = 'none';
//     return;
//   }

//   // 모달 '장바구니로 바로가기' or '계속 쇼핑하기' 클릭 시 모달 닫기
//   if (e.target === $('.goToCart') || e.target === $('.modal-keepShopping')) {
//     $('.modal__addCart').style.display = 'none';
//     return;
//   }
// };

/** 장바구니 페이지에서 수량 핸들링 */
$('.app').addEventListener('click', (e) => {
  const id = e.target.closest('li')?.dataset.productId;
  // 구매 수량 +
  let shoppingCartArr = shoppingCartStore.getLocalStorage();
  if (e.target.classList.contains('cart-addQtyBtn')) {
    storeLocalStorage(id);
    // shoppingCartStore.setLocalStorage(shoppingCartArr);
    // 카트 페이지 렌더
    renderCartPage();
    return;
  }

  // 구매 수량 -
  if (e.target.classList.contains('cart-minusQtyBtn')) {
    // let shoppingCartArr = shoppingCartStore.getLocalStorage();
    const existingItem = shoppingCartArr.find((item) => item.id === id);
    console.log('existingItem', existingItem);

    if (existingItem) {
      if (existingItem.price > existingItem.pricePerOne) {
        existingItem.price -= existingItem.pricePerOne;
      }
      if (existingItem.qty > 1) {
        existingItem.qty -= 1;
      }
      if (existingItem.count > 1) {
        existingItem.count -= 1;
      }

      console.log('장바구니에서 --', shoppingCartArr);
      // 카트 페이지 렌더
      shoppingCartStore.setLocalStorage(shoppingCartArr);
      renderCartPage();
    }
  }

  // 장바구니에서 삭제
  if (e.target.classList.contains('cartProductDeleteBtn')) {
    shoppingCartArr = shoppingCartStore
      .getLocalStorage()
      .filter((item) => item.id !== id);
    // storeLocalStorage(id);
    shoppingCartStore.setLocalStorage(shoppingCartArr);
    console.log(shoppingCartArr);
    renderCartPage();
    return;
  }
});
