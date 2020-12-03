const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let products = [];
    const user = await User.findOne({ email: req.user.email });
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id });

    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
      console.log('Old cart removed');
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let { price } = await Product.findById(cart[i]._id).select('price');
      object.price = price;
      products.push(object);
    }
    console.log(products);
    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
