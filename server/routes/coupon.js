const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const {
  create,
  removeCoupon,
  getCoupons,
} = require('../controllers/couponController');

router.post('/coupon', authCheck, adminCheck, create);
router.get('/coupons', authCheck, adminCheck, getCoupons);
router.delete('/coupon/:couponId', authCheck, adminCheck, removeCoupon);

module.exports = router;
