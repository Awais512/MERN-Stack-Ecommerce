const express = require('express');
const router = express.Router();

const {
  createSub,
  updateSub,
  getSubs,
  getSub,
  deleteSub,
} = require('../controllers/subcategoryController');

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

router.get('/sub', getSubs);
router.post('/sub', authCheck, adminCheck, createSub);
router.get('/sub/:slug', getSub);
router.put('/sub/:slug', authCheck, adminCheck, updateSub);
router.delete('/sub/:slug', authCheck, adminCheck, deleteSub);

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
