const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const { findOne } = require('../models/userModel');

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
