const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const {
  createProduct,
  getProducts,
} = require('../controllers/productController');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/product/:count', getProducts);

module.exports = router;
