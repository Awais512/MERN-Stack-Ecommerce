const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  const { cartTotal } = await Cart.findOne({ orderdBy: user._id });

  console.log(cartTotal);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
