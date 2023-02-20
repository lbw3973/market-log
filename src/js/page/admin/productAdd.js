import { router } from '../../main.js';
import { addProduct } from '../../api.js';

/** 상품 추가 핸들러 */
export const productAddHandler = () => {
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
  const thumbnailInput = form.querySelector(
    '.container-form__content--thumbnail input',
  );
  const preview = document.querySelector(
    '.container-form__content--thumbnail img',
  );

  let profileImgBase64 = '';

  thumbnailInput.addEventListener('change', () => {
    const file = thumbnailInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      profileImgBase64 = e.target.result;
      preview.src = e.target.result;
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
      title: titleInput.value,
      price: parseInt(priceInput.value),
      description: desciptionInput.value,
      tags: [tagsSelect.value],
      thumbnail: profileImgBase64,
    };

    console.log(product);

    if (confirm('상품을 추가하시겠습니까?')) {
      await addProduct(product);
      alert('상품이 추가되었습니다.');
      router.navigate('/admin/product');
    }
  });
};
