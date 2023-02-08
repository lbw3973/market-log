const deleteBtns = document.querySelector('.delete-btn');
// 모달창
const modalEl = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
addEventListener(closeBtn, 'click', () => {
  modalEl.classList.add('nodisplay');
});

deleteBtns.forEach((item) => {
  item.addEventListener('click', () => {
    modalEl.classList.remove('nodisplay');
  });
});
