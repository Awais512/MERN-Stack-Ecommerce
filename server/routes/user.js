const express = require('express');
const {
  userCart,
  getUserCart,
  emptyCart,
} = require('../controllers/userController');

const { authCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
module.exports = router;
