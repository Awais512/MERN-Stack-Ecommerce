const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controller
const {
  create,
  listAll,
  remove,
  read,
} = require('../controllers/productController');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll); // products/100
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);

module.exports = router;
