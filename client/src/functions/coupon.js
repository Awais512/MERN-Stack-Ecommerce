import axios from 'axios';

export const getCoupons = async () => {
  await axios.get(`${process.env.REACT_APP_API}/coupons`);
};

export const removeCoupons = async (couponId, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, config);
};

export const createCoupons = async (coupon, authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };
  await axios.post(`${process.env.REACT_APP_API}/coupon`, { coupon }, config);
};
