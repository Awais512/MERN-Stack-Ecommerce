const express = require('express');
const { orders, updateOrderStatus } = require('../controllers/adminController');

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, adminCheck, updateOrderStatus);

module.exports = router;
