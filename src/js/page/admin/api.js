const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202301',
  username: 'KDT4_TEAM3',
  masterKey: true,
};

export const getAllProduct = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ',
    {
      method: 'GET',
      headers,
    },
  );
  const json = await res.json();
  return json;
};

export const addProduct = async (product) => {
  console.log(product.thumbnail);
  await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ',
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

export const deleteProduct = async (product) => {
  console.log(product.thumbnail);
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/${id}`,
    {
      method: 'POST',
      headers,
    },
  );
};

// {
//   id: '2fYWw6890PmjFLFwjp7C',
//   title: 'OTG 어댑터 OTG-03',
//   price: 6770,
//   description: '컴퓨터 연결없이 데이터 전송~',
//   tags: ['smart', 'black', 'new-item', 'discount', 'adapter'],
//   thumbnail:
//     'https://storage.googleapis.com/heropy-api/vJJfrkM51Qv060726.jpg',
//   isSoldOut: false,
// },
