import dotenv from 'dotenv';
import { base_url, api_key, user_name, admin_email } from '../../db.js';
dotenv.config();

const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
  masterKey: true,
};

/** 전체 상품 가져오기 API */
export const getAllProduct = async () => {
  try {
    const res = await fetch(`${base_url}/products`, {
      method: 'GET',
      headers,
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
    console.log('제품 조회 실패');
  }
};

/** 단일 상품 가져오기 API */
export const addProduct = async (product) => {
  const { title, price, description, tags, thumbnail } = product;

  try {
    await fetch(`${base_url}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        tags: tags,
        thumbnailBase64: thumbnail,
      }),
    });
  } catch (err) {
    console.log(err);
    console.log('선택 상품 조희 실패');
  }
};

/** 단일 상품 삭제 API */
export const deleteProduct = async (id) => {
  try {
    await fetch(`${base_url}/products/${id}`, {
      method: 'DELETE',
      headers,
    });
  } catch (err) {
    console.log(err);
    console.log('선택 상품 삭제 실패');
  }
};

/** 단일 상품 수정 API */
export const editProduct = async (product) => {
  const { title, price, description, tags, isSoldOut, thumbnail } = product;

  try {
    await fetch(`${base_url}/products/${product.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        tags: tags,
        isSoldOut: isSoldOut,
        thumbnailBase64: thumbnail,
      }),
    });
  } catch (err) {
    console.log(err);
    console.log('선택 상품 수정 실패');
  }
};

/**단일 상품 상세정보 가져오기 API  */
export const getDetailProduct = async (id) => {
  try {
    const res = await fetch(`${base_url}/products/${id}`, {
      method: 'GET',
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('해당 제품을 불러오기 실패');
  }
};

/**전체 거래 내역 가져오기 API */
export const getAllOrder = async () => {
  try {
    const res = await fetch(`${base_url}/products/transactions/all`, {
      method: 'GET',
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('전체 거래 내역 불러오기 실패');
  }
};

/** 거래 내역 완료 및 완료 해제 API */
export const editDoneOrder = async (order) => {
  const { detailId, done } = order;

  try {
    const res = await fetch(`${base_url}/products/transactions/${detailId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        done: !done,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('거래 내역 완료/완료해제 실패');
  }
};

/** 거래 내역 취소 및 취소 해제 API */

export const editCancelOrder = async (order) => {
  const { detailId, isCanceled } = order;

  try {
    await fetch(`${base_url}/products/transactions/${detailId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        isCanceled: !isCanceled,
      }),
    });
  } catch (err) {
    console.log(err);
    console.log('err: ', '거래 내역 취소/취소해제 실패');
  }
};
