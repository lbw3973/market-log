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
  renderOrderDetail,
} from './page/admin/renderDetail';

import {
  addProduct,
  deleteProduct,
  getDetailProduct,
  editProduct,
  getAllOrder,
  editDoneOrder,
  editCancelOrder,
} from '../js/page/admin/api';

let orders = [];

const router = new Navigo('/');

const renderContainer = () => {
  document.querySelector('.app').innerHTML = `<div class="container"></div>`;
};

const render = (html) => {
  document.querySelector('.container').innerHTML = html;
};

const initPage = (page) => {
  renderContainer();
  render(sideBar);
  document.querySelector('.container').insertAdjacentHTML('beforeend', page);
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
    '.productDetail-container__btn--delete',
  );
  const editProductBtn = document.querySelector(
    '.productDetail-container__btn--edit',
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

const orderDetailHandler = async (detailId) => {
  const orders = await getAllOrder();
  let order = orders.filter((order) => order.detailId === detailId)[0];
  renderOrderDetail(order);
  renderOrderDetailBtn(order);

  const orderCancelBtn = document.querySelector(
    '.orderDetail-container__btn--cancel',
  );

  const orderDoneBtn = document.querySelector(
    '.orderDetail-container__btn--done',
  );

  orderCancelBtn.addEventListener('click', async () => {
    if (
      confirm(
        `${
          order.isCanceled
            ? '거래 취소를 해제 처리하시겠습니까?'
            : `거래를 취소 처리하시겠습니까?`
        }`,
      )
    ) {
      await editCancelOrder(order);
      order.isCanceled = !order.isCanceled;
      orderCancelBtn.textContent = order.isCanceled
        ? '거래 취소 해제'
        : '거래 취소';
      renderOrderDetail(order);
    }
  });

  orderDoneBtn.addEventListener('click', async () => {
    if (
      confirm(
        `${
          order.isCanceled
            ? '거래 완료를 해제 처리하시겠습니까?'
            : `거래를 완료 처리하시겠습니까?`
        }`,
      )
    ) {
      await editDoneOrder(order);
      order.done = !order.done;
      orderDoneBtn.textContent = order.done ? '거래 완료 해제' : '거래 완료';
      renderOrderDetail(order);
    }
  });
};

router
  .on({
    '/': () => {
      initPage(dashboardPage);
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
      orderHandler(orders);
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
