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

//Create Products
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
