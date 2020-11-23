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
