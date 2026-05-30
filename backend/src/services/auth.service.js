const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );
};

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw Object.assign(new Error('Email already registered'), { statusCode: 400 });
  }
  const user = await User.create({ name, email, password, role });
  const token = generateToken(user);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }
  const token = generateToken(user);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

module.exports = { register, login };
