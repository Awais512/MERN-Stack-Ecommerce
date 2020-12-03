import axios from 'axios';

export const userCart = async (cart, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, config);
};
