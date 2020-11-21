const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

//@desc     Create New Category
//@Route    POST /api/category
//@access   Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {});
//@desc     GET all Categories
//@Route    GET /api/category
//@access   Private/Admin
exports.getCategories = asyncHandler(async (req, res) => {});
//@desc     Get single Category
//@Route    GET /api/category/:id
//@access   Private/Admin
exports.getCategory = asyncHandler(async (req, res) => {});
//@desc     Update Category
//@Route    PUT /api/category/:id
//@access   Private/Admin
exports.updateCategory = asyncHandler(async (req, res) => {});
//@desc     Delete Category
//@Route    DELETE /api/category/:id
//@access   Private/Admin
exports.deleteCategory = asyncHandler(async (req, res) => {});
