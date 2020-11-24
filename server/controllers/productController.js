const Product = require('../models/productModel');
const slugify = require('slugify');

//@desc     Create new Product
//@Route    POST /api/product
//@access   Private/admin
exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

//@desc     Get all Products
//@Route    POST /api/product
//@access   Private/admin
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ err: err.message })
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']]);
  }
};
