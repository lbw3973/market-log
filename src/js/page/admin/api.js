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

export const editProduct = async (id) => {
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        isSoldOut: true,
      }),
    },
  );
};
