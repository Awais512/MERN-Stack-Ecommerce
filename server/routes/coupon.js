const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const {
  createCoupon,
  removeCoupon,
  getCoupons,
} = require('../controllers/couponController');

router.post('/coupon', authCheck, adminCheck, createCoupon);
router.get('/coupons', authCheck, adminCheck, getCoupons);
router.delete('/coupon/:couponId', authCheck, adminCheck, removeCoupon);

module.exports = router;
