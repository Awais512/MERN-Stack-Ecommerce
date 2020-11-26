const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controller
const {
  create,
  listAll,
  list,
  remove,
  read,
  updateProduct,
  productsCount,
} = require('../controllers/productController');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, updateProduct);
router.post('/products', list);

module.exports = router;
