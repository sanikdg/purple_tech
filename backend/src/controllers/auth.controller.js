const authService = require('../services/auth.service');
const ApiResponse = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return ApiResponse.created(res, result, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return ApiResponse.success(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    return ApiResponse.success(res, { user: req.user }, 'Profile retrieved');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
