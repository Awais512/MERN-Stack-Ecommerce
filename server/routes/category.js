const express = require('express');
const router = express.Router();

const {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getCategory,
  getSubs,
} = require('../controllers/categoryController');

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

router.get('/category', getCategories);
router.post('/category', authCheck, adminCheck, createCategory);
router.get('/category/:slug', getCategory);
router.put('/category/:slug', authCheck, adminCheck, updateCategory);
router.delete('/category/:slug', authCheck, adminCheck, deleteCategory);
router.get('/category/subs/:_id', getSubs);

module.exports = router;
