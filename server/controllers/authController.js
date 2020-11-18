const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.createOrUpdateUser = asyncHandler(async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  );
  console.log(email);
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save();
    res.json(newUser);
  }
});

exports.currentUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  } else {
    res.json(user);
  }
});
