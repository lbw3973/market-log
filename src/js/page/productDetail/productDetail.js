// productDetail 제품 상세페이지
// 라우터 라이브러리
import Navigo from 'navigo';
const router = new Navigo('/');

import heart from '../../../../public/heart.svg';

const $ = (selector) => document.querySelector(selector);

const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';
HEADERS = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_Team3',
};

const getDetailProduct = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '해당 제품을 불러오기 실패');
  }
};

getDetailProduct('cMciAKoHplCj2VjRs4FA');

/** 구매 수량 */
let productDetailProductQty = 1;
/** 총 상품 금액 */
let productDetailTotalPrice;

const renderDetailProduct = async (productId) => {
  const productDetail = await getDetailProduct(productId);
  const { description, id, isSoldOut, photo, price, tags, title, thumbnail } =
    productDetail;

  // 총 금액 계산
  productDetailTotalPrice = price * productDetailProductQty;

  const productTags = tags
    .map((tag) => {
      return `<li class="aside__productDetail--info-tagLists-tag">${tag}</li>`;
    })
    .join('');

  /** 상세 제품 레이아웃 html */
  const detailProductTemplate = /* html */ `
  <div class="main-container">
    <section class="section__productDetail" data-productId="${id}">
      <img
        src="${thumbnail}"
        alt="${title}"
      />
    </section>
    <aside class="aside__productDetail-menu">
      <div class="aside__productDetail--info">
        <h2 class="aside__productDetail--info-title">
          ${title}
        </h2>
        <div class="aside__productDetail--info-sec">
          <div class="aside__productDetail--info-sec-price">
            ${price.toLocaleString()} 원
          </div>
          <div class="aside__productDetail--info-sec-wishlist">
            <button>
              <img src="${heart}" alt="찜하기 버튼" />
            </button>
          </div>
        </div>
        <p class="aside__productDetail--info-desc">
          ${description}
        </p>
        <ul class="aside__productDetail--info-tagLists">
          ${productTags}
        </ul>
      </div>

      <div class="aside__productDetail--count">
        <p class="aside__productDetail--count-buy">구매 수량</p>
        <div class="aside__productDetail--count-btns">
          <button class="aside__productDetail--count-btn minusQtyBtn">-</button>
          <span class="aside__productDetail--count-qty Qty">${productDetailProductQty}</span>
          <button class="aside__productDetail--count-btn addQtyBtn">+</button>
        </div>
      </div>
      <div class="aside__productDetail--totalPrice">
        <p>총 상품 금액</p>
        <p>${productDetailTotalPrice.toLocaleString()} 원</p>
      </div>
      <div class="aside__productDetail--btns">
        ${
          !isSoldOut
            ? `<button class="aside__productDetail--btns-cart addCartBtn">장바구니에 담기</button>
        <button class="aside__productDetail--btns-buy buyBtn">구매하기</button>`
            : ` <button class="aside__productDetail--btns-soldOut">해당 상품은 품절입니다.</button>`
        }
      </div>
    </aside>
  </div>
  `;

  $('.main').innerHTML = detailProductTemplate;
};

renderDetailProduct('cMciAKoHplCj2VjRs4FA');

/** 구매수량 추가 핸들링 이벤트 */
$('.main').addEventListener('click', (e) => {
  updateInfo(e);
});

/** 구매수량 핸들링 함수 */
const updateInfo = async (e) => {
  if (e.target.classList.contains('minusQtyBtn')) {
    productDetailProductQty -= 1;
    if (productDetailProductQty === 0) {
      productDetailProductQty = 1;
    }
    renderDetailProduct('cMciAKoHplCj2VjRs4FA');
    return;
  }

  if (e.target.classList.contains('addQtyBtn')) {
    productDetailProductQty += 1;
    renderDetailProduct('cMciAKoHplCj2VjRs4FA');
    return;
  }
};

/** 총 상품금액 업데이트 함수 */
// const updateTotalPrice = () => {
//   price = productDetailTotalPrice = price * productDetailProductQty;
// };

/** 모달 핸들 이벤트 */
document.body.addEventListener('click', (e) => {
  handleModal(e);
});

/** 모달 핸들 함수 */
const handleModal = (e) => {
  // '장바구니에 담기' 버튼 클릭 시, 모달 오픈
  if (e.target.classList.contains('addCartBtn')) {
    $('.modal__addCart').style.display = 'block';
    return;
  }

  // '모달 창 밖에 클릭 시 닫기'
  if (e.target !== $('.modal__addCart')) {
    $('.modal__addCart').style.display = 'none';
    console.log(e.target);
    return;
  }

  // navigo 장바구니로 가기
  if (e.target === $('.goToCart')) {
    router.on({
      '/cart': () => {
        renderPage(cartTemplate);
      },
    });

    router.resolve();
  }
};
const cartTemplate = /* html */ `
  test
`;
const renderPage = (html) => {
  $('.main').innerHTML = html;
};
