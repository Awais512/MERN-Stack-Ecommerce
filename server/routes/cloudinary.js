const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

const {
  uploadImages,
  removeImages,
} = require('../controllers/cloudinaryController');

router.post('/uploadimages', authCheck, adminCheck, uploadImages);
router.post('/removeimages', authCheck, adminCheck, removeImages);

module.exports = router;
