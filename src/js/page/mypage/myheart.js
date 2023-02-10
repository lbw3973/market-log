export const htmlMypage_MyHeart = `
<div class="mypage__container">
  <div class="mypage__myheart">
    <h2>찜한 상품 (0)</h2>
    <div class="heartproducts-container">
      <div class="nocontent-box nodisplay">
        <p>
          <img src="../../public/myheart.svg" alt="exclamationmark" />
          <span>찜한 상품이 없습니다.</span>
        </p>
      </div>
      <ul class="heart-products">
        <li class="heart-product">
          <a href="#"
            ><img class="product--img" src="#" alt="product image"
          /></a>
          <div class="product-info">
            <a href="#">
              <span class="product--name"
                >플로리스 펫샴푸 퀸즈가든 300ML</span
              >
              <span class="product--price">23,000원</span>
            </a>
          </div>
          <div class="buttons">
            <button>삭제</button>
            <button>담기</button>
          </div>
        </li>
        <li class="heart-product">
          <a href="#"
            ><img class="product--img" src="#" alt="product image"
          /></a>
          <div class="product-info">
            <a href="#">
              <span class="product--name"
                >플로리스 펫샴푸 퀸즈가든 300ML</span
              >
              <span class="product--price">23,000원</span>
            </a>
          </div>
          <div class="buttons">
            <button class="delete-btn">삭제</button>
            <button class="cart-btn">담기</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
  <div class="modal modal-heart nodisplay">
  <div class="modal-wrap">
    <img src="../../public/cart.svg" alt="cart icon" />
    <span class="modal-text">장바구니에 추가되었습니다.</span>
    <div class="buttons">
      <button class="close-btn">계속 쇼핑하기</button>
      <button class="cart-btn"><a href="#">장바구니 보기</a></button>
    </div>
  </div>
</div>
`;

export async function initFuncMyHeart() {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  // 모달창
  const modalEl = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modalEl.classList.add('nodisplay');
  });

  [...deleteBtns].forEach((item) => {
    item.addEventListener('click', () => {
      modalEl.classList.remove('nodisplay');
    });
  });
}
