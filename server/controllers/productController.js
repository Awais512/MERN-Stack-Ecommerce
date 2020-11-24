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
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']]);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//@desc     Get Product by Slug
//@Route    get /api/product/:slug
//@access   Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subs');
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send('Bad request');
  }
};

//@desc     Delete Product
//@Route    DELETE /api/product/:slug
//@access   Private/admin
exports.deleteProducts = async (req, res) => {
  try {
    const product = await Product.findOneAndRemove({ slug: req.params.slug });
    res.status(204).json({ msg: 'Deleted Successfully' });
  } catch (error) {
    res.status(400).send('Delete failed');
  }
};
