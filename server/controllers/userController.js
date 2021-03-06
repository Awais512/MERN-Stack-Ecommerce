const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const uniqueid = require('uniqueid');

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select('price').exec();
    object.price = price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log('new cart', newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  let cart = await Cart.findOne({ orderdBy: user._id }).populate(
    'products.product',
    '_id title price totalAfterDiscount'
  );
  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  try {
    console.log('empty cart');
    const user = await User.findOne({ email: req.user.email }).exec();

    const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    );
    res.json({ ok: true });
  } catch (error) {}
};

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon === null) {
      return res.json({
        err: 'Invalid coupon',
      });
    }
    console.log('VALID COUPON', validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
      .populate('products.product', '_id title price')
      .exec();

    // calculate the total after discount
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2); // 99.99

    Cart.findOneAndUpdate(
      { orderdBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec();

    res.json(totalAfterDiscount);
  } catch (error) {
    console.log(error);
  }
};
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  let bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOptions, {});

  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email });
    let orders = await Order.find({ orderdBy: user._id }).populate(
      'products.product'
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist');

  res.json(list);
};
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } }
    );
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send('Create cash order failed');

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: 'usd',
      status: 'Cash On Delivery',
      created: Date.now(),
      payment_method_types: ['cash'],
    },
    orderdBy: user._id,
    orderStatus: 'Cash On Delivery',
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY-- AND SOLD++', updated);

  console.log('NEW ORDER SAVED', newOrder);
  res.json({ ok: true });
};
