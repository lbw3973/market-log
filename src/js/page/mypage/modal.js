export default function () {
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
  const fixYesBtn = document.querySelector('.fix-yes-btn');
  const fixNoBtn = document.querySelector('.fix-no-btn');
  const modalOrderFixFixEl = document.querySelector('.modal-orderfix-fix');
  const orderfixCloseBtn = document.querySelector('.orderfix-close-btn');
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
    modalOrdercancelEl.classList.add('nodisplay');
    modalOrderCancelFixEl.classList.remove('nodisplay');
  });
  cancelCloseBtn.addEventListener('click', () => {
    modalOrderCancelFixEl.classList.add('nodisplay');
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
    modalOrderFixEl.classList.add('nodisplay');
    modalOrderFixFixEl.classList.remove('nodisplay');
  });
  orderfixCloseBtn.addEventListener('click', () => {
    modalOrderFixFixEl.classList.add('nodisplay');
  });
}
