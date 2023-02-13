import Navigo from 'navigo';
import {
  dashboardPage,
  orderPage,
  productPage,
  productAddPage,
  productDetailPage,
  productEditPage,
  sideBar,
  orderDetailPage,
} from './page/admin/renderTemplate';
// import { productAddHandler } from './page/admin/productAdd.js';
import { productHandler } from './page/admin/product.js';
import { dashboardHandler } from './page/admin/dashboard.js';
import { orderHandler } from './page/admin/order.js';

import {
  renderDetailProduct,
  renderEditProduct,
  renderOrderDetailBtn,
} from './page/admin/renderDetail';

import {
  addProduct,
  deleteProduct,
  getDetailProduct,
  editProduct,
} from '../js/page/admin/api';

const router = new Navigo('/');

const render = (html) => {
  const app = document.querySelector('.app');
  app.innerHTML = html;
};

const initPage = (page) => {
  render(sideBar);
  document
    .querySelector('.aside-container')
    .insertAdjacentHTML('beforeend', page);
};

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

const productDetailHandler = async (productId) => {
  const productDetail = await getDetailProduct(productId);

  renderDetailProduct(productDetail);

  const deleteProductBtn = document.querySelector(
    '.productDetail-container--delete',
  );
  const editProductBtn = document.querySelector(
    '.productDetail-container--edit',
  );

  deleteProductBtn.addEventListener('click', async () => {
    if (confirm('상품을 삭제하시겠습니까?')) {
      await deleteProduct(productId);
      alert('상품이 삭제되었습니다.');
      router.navigate('/admin/product');
    }
  });

  editProductBtn.addEventListener('click', async () => {
    router.navigate(`/admin/product/edit/${productId}`);
  });
};

const productEditHandler = async (productId) => {
  const product = await getDetailProduct(productId);

  document
    .querySelector('.wrap')
    .insertAdjacentHTML('afterbegin', renderEditProduct(product));

  console.log(product);

  const form = document.querySelector('.container-form');
  const cacncelProductBtn = document.querySelector(
    '.container-form__btn--edit',
  );
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

const orderDetailHandler = async (detailId) => {
  renderOrderDetailBtn(detailId);

  const orderCancelBtn = document.querySelector('.order-Container')
};

router
  .on({
    '/': () => {
      render(`<div>메인페이지</div>`);
    },
    '/admin': () => {
      initPage(dashboardPage);
      dashboardHandler();
    },
    '/admin/product': () => {
      initPage(productPage);
      productHandler();
    },
    '/admin/order': () => {
      initPage(orderPage);
      orderHandler();
    },
    '/admin/order/:id': (params) => {
      initPage(orderDetailPage);
      orderDetailHandler(params.data.id);
    },
    '/admin/product/add': () => {
      initPage(productAddPage);
      productAddHandler();
    },
    '/admin/product/:id': (params) => {
      initPage(productDetailPage);
      productDetailHandler(params.data.id);
    },
    '/admin/product/edit/:id': (params) => {
      initPage(productEditPage);
      productEditHandler(params.data.id);
    },
  })
  .resolve();
