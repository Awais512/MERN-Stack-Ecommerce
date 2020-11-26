import axios from 'axios';

//Create Products
export const createProduct = async (product, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.post(
    `${process.env.REACT_APP_API}/product`,
    product,
    config
  );
};

//Get Products with count
export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

//Remove Categories
export const removeProduct = async (slug, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.delete(
    `${process.env.REACT_APP_API}/product/${slug}`,
    config
  );
};

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

//Update Product
export const updateProduct = async (slug, product, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    config
  );
};

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);
