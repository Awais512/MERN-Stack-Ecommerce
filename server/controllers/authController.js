const asyncHandler = require('express-async-handler');

exports.createOrUpdateUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'Hello World' });
});
