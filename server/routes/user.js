const express = require('express');
const { userCart } = require('../controllers/userController');

const { authCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/cart', authCheck, userCart);

module.exports = router;
