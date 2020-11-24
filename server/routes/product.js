const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const {
  createProduct,
  getProducts,
  deleteProducts,
  getProduct,
} = require('../controllers/productController');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/product/:count', getProducts);
router.get('/product/:slug', getProduct);
router.delete('/product/:slug', authCheck, adminCheck, deleteProducts);

module.exports = router;
