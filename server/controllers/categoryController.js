const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//@desc     Create New Category
//@Route    POST /api/category
//@access   Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//@desc     GET all Categories
//@Route    GET /api/category
//@access   Private/Admin
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ err: err.message });
  }
};
//@desc     Get single Category
//@Route    GET /api/category/:id
//@access   Private/Admin
exports.getCategory = asyncHandler(async (req, res) => {
  //   try {
  //     const category = await Category.findById(req.params.slug);
  //     if (category) {
  //       res.status(200).json(category);
  //     } else {
  //       return res.status(404).json({ msg: 'Category does not Exist' });
  //     }
  //   } catch (err) {
  //     res.status(400).json({ err: err.message });
  //   }
});
//@desc     Update Category
//@Route    PUT /api/category/:id
//@access   Private/Admin
exports.updateCategory = asyncHandler(async (req, res) => {});
//@desc     Delete Category
//@Route    DELETE /api/category/:id
//@access   Private/Admin
exports.deleteCategory = asyncHandler(async (req, res) => {});
