const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_Team3',
  masterKey: true,
};

export const getAllProduct = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
    {
      method: 'GET',
      headers,
    },
  );
  const json = await res.json();
  return json;
};

export const addProduct = async (product) => {
  await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: product.title,
        price: product.price,
        description: product.description,
        tags: product.tags,
        thumbnailBase64: product.thumbnail,
      }),
    },
  );
};

export const deleteProduct = async (id) => {
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
    {
      method: 'DELETE',
      headers,
    },
  );
};

export const editProduct = async (product) => {
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${product.id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title: product.title,
        price: product.price,
        description: product.description,
        tags: product.tags,
        isSoldOut: product.isSoldOut,
        thumbnailBase64: product.thumbnail,
      }),
    },
  );
};

export const getDetailProduct = async (id) => {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
      {
        method: 'GET',
        headers,
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '해당 제품을 불러오기 실패');
  }
};

export const getAllOrder = async () => {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all`,
      {
        method: 'GET',
        headers,
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('err: ', '전체 거래 내역 불러오기 실패');
  }
};

export const editDoneOrder = async (detailId) => {
  try {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${detailId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          done: !done,
        }),
      },
    );
  } catch (err) {
    console.log(err);
    console.log('err: ', '거래 내역 완료 실패');
  }
};

export const editCancelOrder = async (detailId) => {
  try {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${detailId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          isCanceled: !isCanceled,
        }),
      },
    );
  } catch (err) {
    console.log(err);
    console.log('err: ', '거래 내역 취소 실패');
  }
};
