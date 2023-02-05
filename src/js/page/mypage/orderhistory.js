const calendarBoxEl = document.querySelector('.calendar-box');
const calendarbtn = calendarBoxEl.querySelector('.calendar-icon');
const calendarEl = calendarBoxEl.querySelector('.calendar');
const reloadbtn = calendarBoxEl.querySelector('button');
const noContentEl = document.querySelector('.nocontent-box');
const productsEl = document.querySelector('.products');
const productArr = document.querySelectorAll('.product');

calendarbtn.addEventListener('click', () => {
  productsEl.classList.add('nodisplay');
  noContentEl.classList.remove('nodisplay');
  calendarEl.classList.remove('nodisplay');
});
reloadbtn.addEventListener('click', () => {
  productsEl.classList.remove('nodisplay');
  noContentEl.classList.add('nodisplay');
});
