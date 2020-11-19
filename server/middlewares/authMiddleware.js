const admin = require('../firebase');
const User = require('../models/userModel');

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

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await (await User.findOne({ email })).exec();
  if (adminUser.role !== 'admin') {
    res.status(403).json({ err: 'You are not uthorized to view this page' });
  } else {
    next();
  }
};
