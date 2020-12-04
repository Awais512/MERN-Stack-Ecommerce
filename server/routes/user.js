const express = require('express');
const { userCart, getUserCart } = require('../controllers/userController');

const { authCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);

module.exports = router;
