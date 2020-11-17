const express = require('express');
const router = express.Router();

router.get('/create-or-update-user', (req, res) => {
  res.json({ msg: 'Hello World' });
});

module.exports = router;
