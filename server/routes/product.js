const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const { createProduct } = require('../controllers/productController');

router.post('/product', authCheck, adminCheck, createProduct);

module.exports = router;
