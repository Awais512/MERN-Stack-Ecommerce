const express = require('express');
const { createPaymentIntent } = require('../controllers/stripeController');
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;
