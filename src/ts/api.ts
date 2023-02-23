import {
  AddProductParams,
  AuthorizationValue,
  Bank,
  BuyItemAPI,
  CancelConfirmTransactionAPI,
  DeleteAccount,
  GetAllProductsInterface,
  GetAllProductsValue,
  GetAllTransactionsValue,
  GetBankListValue,
  GetUserAccounts,
  GetUserInfoAPI,
  HEADERS,
  Logout,
  PersonalInfoLogin,
  TransactionDetailValue,
} from './interface/index.js';
// api 파일입니다.

// dotenv 사용 예시
import dotenv from 'dotenv';
import { base_url, api_key, user_name } from './db.js';
import { $ } from './utils/dom.js';
dotenv.config();

// const api_key = 'FcKdtJs202301';
// const user_name = 'KDT4_Team3';

const headers: HEADERS = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};

/** 전체 제품 가져오기api */
export const getAllProducts = async (): Promise<GetAllProductsValue> => {
  try {
    const res = await fetch(`${base_url}/products`, {
      headers: {
        ...headers,
        masterKey: true,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('제품 가져오기 실패');
  }
};

/** 검색한 제품, 태그 가져오기 */
export const getSearchedProducts = async (
  title = '',
): Promise<GetAllProductsValue> => {
  try {
    const res = await fetch(`${base_url}/products/search`, {
      method: 'POST',
      headers,
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
export const getDetailProduct = async (
  productId: string,
): Promise<GetAllProductsInterface> => {
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
export const getAllTransactions =
  async (): Promise<GetAllTransactionsValue> => {
    try {
      const res = await fetch(`${base_url}/products/transactions/details`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();

      if (res.status === 400) {
        return [];
      } else {
        return data;
      }
    } catch (err) {
      console.log('거래내역 가져오기 실패', err);
    }
  };

/** 구매 확정 API */
export const confirmTransactionAPI = async (
  detailId: string,
): Promise<CancelConfirmTransactionAPI> => {
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
export const cancelTransactionAPI = async (
  detailId: string,
): Promise<CancelConfirmTransactionAPI> => {
  try {
    const res = await fetch(`${base_url}/products/cancel`, {
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
export const getDetailOrderProduct = async (detailId: string) => {
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
export const getAccountDetail = async (): Promise<Bank[]> => {
  try {
    const res = await fetch(`${base_url}/account`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    const { accounts } = data;

    return accounts;
  } catch (err) {
    console.log(err);
    console.log('err: ', '계좌목록 조회 실패');
  }
};

/** 제품 결제 API */
export const buyItemAPI = async (
  productId: string,
  accountId: string,
): Promise<BuyItemAPI> => {
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

/** [결제 페이지] 로그인 한 정보 가져오기 */
export const getUserInfoAPI = async (): Promise<GetUserInfoAPI> => {
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

// [관리자 페이지]
/** 단일 상품 가져오기 API */
export const addProduct = async (product: AddProductParams): Promise<void> => {
  const { title, price, description, tags, thumbnail } = product;

  try {
    await fetch(`${base_url}/products`, {
      method: 'POST',
      headers: {
        ...headers,
        masterKey: true,
      },
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
export const deleteProduct = async (id: string) => {
  try {
    await fetch(`${base_url}/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        masterKey: true,
      },
    });
  } catch (err) {
    console.log(err);
    console.log('선택 상품 삭제 실패');
  }
};

/** 단일 상품 수정 API */
export const editProduct = async (product: any): Promise<void> => {
  const { title, price, description, tags, isSoldOut, thumbnail } = product;

  try {
    await fetch(`${base_url}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        masterKey: true,
      },
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

/**전체 거래 내역 가져오기 API */
export const getAllOrder = async (): Promise<TransactionDetailValue> => {
  try {
    const res = await fetch(`${base_url}/products/transactions/all`, {
      method: 'GET',
      headers: {
        ...headers,
        masterKey: true,
      },
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
      headers: {
        ...headers,
        masterKey: true,
      },
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
      headers: {
        ...headers,
        masterKey: true,
      },
      body: JSON.stringify({
        isCanceled: !isCanceled,
      }),
    });
  } catch (err) {
    console.log(err);
    console.log('err: ', '거래 내역 취소/취소해제 실패');
  }
};

/** API : 은행 목록 */
export const getBankList = async (): Promise<GetBankListValue> => {
  const res = await fetch(`${base_url}/account/banks`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();

  return json;
};

/** API : 계좌 조회 */
export const getUserAccounts = async (): Promise<GetUserAccounts> => {
  const res = await fetch(`${base_url}/account`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();

  return json;
};

/** API : 계좌 개설 */
export const createUserAccount = async (bankCode: string): Promise<boolean> => {
  const res = await fetch(`${base_url}/account`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      bankCode: bankCode,
      accountNumber: $<HTMLInputElement>('#input__account').value,
      phoneNumber: $<HTMLInputElement>('#input__phone').value,
      signature: true,
    }),
  });

  return res.ok;
};

// API : 계좌 해지
export const deleteAccount = async (e: any): Promise<DeleteAccount> => {
  const accountId = e.target.dataset.id;
  const res = await fetch(`${base_url}/account`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      accountId: accountId,
      signature: true,
    }),
  });

  const json = await res.json();
  return json;
};

/** API : Login */
export async function login() {
  const res = await fetch(`${base_url}/auth/login`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      email: $<HTMLInputElement>('#inputID').value,
      password: $<HTMLInputElement>('#inputPW').value,
    }),
  });
  const json = await res.json();
  return json;
}

/** API : Logout */
export async function logout(): Promise<Logout> {
  const res = await fetch(`${base_url}/auth/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();
  return json;
}

/** API : 인증확인 */
export async function authorization(): Promise<AuthorizationValue> {
  const res = await fetch(`${base_url}/auth/me`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();
  return json;
}

//사용자 정보 수정 api 사용
export async function submitChangeInfo() {
  const res = await fetch(`${base_url}/auth/user`, {
    method: 'PUT',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      displayName: $<HTMLInputElement>('#user-name').value,
      oldPassword: $<HTMLInputElement>('#user-oldpw').value,
      newPassword: $<HTMLInputElement>('#user-newpw').value,
    }),
  });
  const json = await res.json();
  return json;
}
// 비밀번호 재확인(login api 사용)
export async function personalInfoLogin(auth: any): Promise<PersonalInfoLogin> {
  const res = await fetch(`${base_url}/auth/login`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      email: auth.email,
      password: $<HTMLInputElement>('#inputPW').value,
    }),
  });
  const json = await res.json();
  return json;
}
