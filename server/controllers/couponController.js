const Coupon = require('../models/couponModel');

exports.createCoupon = async (req, res) => {
  const { name, expiry, discount } = req.body;
  try {
    const coupon = await new Coupon({ name, expiry, discount }).save();
    res.json(coupon);
  } catch (error) {
    console.log(error);
  }
};
exports.getCoupons = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error);
  }
};
exports.removeCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId));
  } catch (error) {
    console.log(error);
  }
};
