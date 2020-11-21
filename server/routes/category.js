const express = require('express');
const router = express.Router();

const {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getCategory,
} = require('../controllers/categoryController');

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

router.get('/category', getCategories);
router.post('/category', authCheck, adminCheck, createCategory);
router.get('/category/:slug', getCategory);
router.put('/category/:slug', authCheck, adminCheck, updateCategory);
router.delete('/category/:slug', authCheck, adminCheck, deleteCategory);

// router
//   .route('/category')
//   .get(authCheck, adminCheck, getCategories)
//   .post(authCheck, adminCheck, createCategory);
// router
//   .route('/category/:slug')
//   .get(authCheck, adminCheck, getCategory)
//   .put(authCheck, adminCheck, updateCategory)
//   .delete(authCheck, adminCheck, deleteCategory);

module.exports = router;
