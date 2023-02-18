// api 파일입니다.

// dotenv 사용 예시
import dotenv from 'dotenv';
import Navigo from 'navigo';
import { base_url, api_key, user_name, admin_email } from './db.js';
dotenv.config();

// const api_key = 'FcKdtJs202301';
// const user_name = 'KDT4_Team3';

const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};

/** 전체 제품 가져오기api */
export const getAllProducts = async () => {
  try {
    console.log('123');
    const res = await fetch(`${base_url}/products`, {
      headers: {
        ...headers,
        masterKey: true,
      },
    });
    const data = await res.json();
    console.log('jaehaData', data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('제품 가져오기 실패');
  }
};

/** 검색한 제품, 태그 가져오기 */
export const getSearchedProducts = async (title = '') => {
  try {
    const res = await fetch(`${base_url}/products/search`, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        searchText: title,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('제품 검색을 실패했습니다.');
  }
};

/** 상세 제품 db에서 불러오기 */
export const getDetailProduct = async (productId) => {
  try {
    const res = await fetch(`${base_url}/products/${productId}`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '해당 제품을 불러오기 실패');
  }
};

/** 구매내역 확인 API */
export const getAllTransactions = async () => {
  try {
    const res = await fetch(`${base_url}/products/transactions/details`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    console.log('거래내역', data);
    return data;
  } catch (err) {
    console.log('거래내역 가져오기 실패', err);
  }
};

/** 구매 확정 API */
export const confirmTransactionAPI = async (detailId) => {
  try {
    const res = await fetch(`${base_url}/products/ok`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('구매 확정 실패', err);
  }
};

/** 구매 취소 API */
export const cancelTransactionAPI = async (detailId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/cancel`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
    // return data;
  } catch (err) {
    console.log('구매 취소 실패', err);
  }
};

/** 주문 상세정보 조회 API */
export const getDetailOrderProduct = async (detailId) => {
  try {
    const res = await fetch(`${base_url}/products/transactions/detail`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('상세 거래내역 가져오기 실패', err);
  }
};

/** 계좌 목록 및 잔액 조회 db에서 불러오기 */
export const getAccountDetail = async () => {
  try {
    const res = await fetch(`${base_url}/account`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    const { accounts, totalBalance } = data;

    return accounts;
  } catch (err) {
    console.log(err);
    console.log('err: ', '계좌목록 조회 실패');
  }
};

/** 제품 결제 API */
export const buyItemAPI = async (productId, accountId) => {
  try {
    const res = await fetch(`${base_url}/products/buy`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId,
        accountId,
      }),
    });
    const data = await res.json();
    console.log('제품 결제', data);
    return data;
  } catch (err) {
    console.log(err);
    console.log('결제 실패');
  }
};

/** 제품 결제 API */
export const getUserInfoAPI = async () => {
  try {
    const res = await fetch(`${base_url}/auth/me`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('사용자 정보 가져오기 실패');
  }
};
