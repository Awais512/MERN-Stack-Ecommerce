const Sub = require('../models/subModel');
const Product = require('../models/productModel');

const slugify = require('slugify');

//@desc     Create Sub Category
//@Route    POST /api/subcategory/:id
//@access   Private/Admin
exports.createSub = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new Sub({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).send('Create Subcategory Failed');
  }
};

//@desc     Get all Sub Categories
//@Route    POST /api/subcategory
//@access   Private/Admin
exports.getSubs = async (req, res) => {
  try {
    const subcategories = await Sub.find({}).sort({ createdAt: -1 });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(400).json({ err: err.message });
  }
};

//@desc     Get Sub Categories
//@Route    GET /api/subcategory
//@access   Public
exports.getSub = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate('category')
    .exec();

  res.json({
    sub,
    products,
  });
};

//@desc     Update Sub Category
//@Route    PUT /api/subcategory
//@access   Private/Admin
exports.updateSub = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const subcategory = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(subcategory);
  } catch (err) {
    res.status(400).send('Update failed');
  }
};

//@desc     Delete Sub Categories
//@Route    DELETE /api/subcategory
//@access   Private/Admin
exports.deleteSub = async (req, res) => {
  try {
    const subcategory = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(subcategory);
  } catch (err) {
    res.status(400).send('Delete Failed. Bad Request');
  }
};
