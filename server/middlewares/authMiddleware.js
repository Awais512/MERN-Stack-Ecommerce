const admin = require('../firebase');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log('Firebase User', firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: 'Invalid or expired token',
    });
  }
};

exports.adminCheck = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await await User.findOne({ email });
  if (adminUser.role !== 'admin') {
    res.status(403).json({ err: 'You are not uthorized to view this page' });
  } else {
    next();
  }
});
