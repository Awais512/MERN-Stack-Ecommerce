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
  return await axios.get(`${process.env.REACT_APP_API}/product/${count}`);
};
