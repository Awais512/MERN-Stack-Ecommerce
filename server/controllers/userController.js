const asyncHandler = require('express-async-handler');

exports.getUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'Hello User' });
});
