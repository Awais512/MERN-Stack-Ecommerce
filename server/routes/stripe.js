const express = require('express');
const { createPaymentIntent } = require('../config/stripeController');
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;
