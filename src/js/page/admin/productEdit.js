import { editProduct, getDetailProduct } from '../../api.js';
import { renderEditProduct } from './renderDetail';

import { router } from '../../main.js';

/** 상품수정 페이지 핸들러 */
export const productEditHandler = async (productId) => {
  const product = await getDetailProduct(productId);

  document
    .querySelector('.productEdit-container')
    .insertAdjacentHTML('afterbegin', renderEditProduct(product));

  console.log(product);

  const form = document.querySelector('.container-form');

  const titleInput = form.querySelector(
    '.container-form__content--title input',
  );
  const priceInput = form.querySelector(
    '.container-form__content--price input',
  );
  const desciptionInput = form.querySelector(
    '.container-form__content--description textarea',
  );
  const tagsSelect = form.querySelector(
    '.container-form__content--tags select',
  );
  const soldoutSelect = form.querySelector(
    '.container-form__content--soldout select',
  );
  const thumbnailInput = form.querySelector(
    '.container-form__content--thumbnail input',
  );
  const preview = document.querySelector(
    '.container-form__content--thumbnail img',
  );

  let profileImgBase64 = ``;

  thumbnailInput.addEventListener('change', () => {
    const file = thumbnailInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      profileImgBase64 = e.target.result;
      preview.src = e.target.result;
    });
  });

  document
    .querySelector('.container-form__btn--edit')
    .addEventListener('click', async () => {
      const product = {
        id: productId,
        title: titleInput.value,
        price: parseInt(priceInput.value),
        description: desciptionInput.value,
        tags: [tagsSelect.value],
        isSoldOut: 'true' === soldoutSelect.value,
        thumbnail: profileImgBase64,
      };

      console.log(product);

      if (confirm('상품을 수정하시겠습니까?')) {
        await editProduct(product);
        alert('상품이 수정되었습니다.');
        router.navigate(`/admin/product/${productId}`);
      }
    });
};
