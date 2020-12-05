const Coupon = require('../models/couponModel');

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, expiry, discount } = req.body.coupon;
    const coupon = await new Coupon({ name, expiry, discount }).save();
    res.json(coupon);
  } catch (err) {
    console.log(err);
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
