import { editProduct } from './api.js';

export const dashboardHandler = (page) => {
  editBtn = page.querySelector('.dashboard-container button');

  editBtn.addEventListener('click', async () => {
    console.log('상품버튼 클릭');
    await editProduct('UcGtdmglg7bzIFDosY9D', false);
  });
};
