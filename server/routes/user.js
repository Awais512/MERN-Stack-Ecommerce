const express = require('express');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  createOrder,
  applyCoupon,
  orders,
} = require('../controllers/userController');

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCoupon);
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, orders);

module.exports = router;
