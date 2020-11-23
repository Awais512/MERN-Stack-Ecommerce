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
  } catch (error) {
    res.status(400).send('Create Product failed');
  }
};
