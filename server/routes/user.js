const express = require('express');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCoupon,
} = require('../controllers/userController');

const { authCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCoupon);

module.exports = router;
