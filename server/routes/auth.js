const express = require('express');
const {
  createOrUpdateUser,
  currentUser,
} = require('../controllers/authController');
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
