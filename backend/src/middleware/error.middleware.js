const logger = require('../utils/logger');
const ApiResponse = require('../utils/response');

const errorHandler = (err, req, res, _next) => {
  logger.error(err.message, { stack: err.stack, url: req.originalUrl });

  if (err.name === 'ValidationError') {
    return ApiResponse.badRequest(res, 'Validation error', err.errors);
  }

  if (err.name === 'CastError') {
    return ApiResponse.badRequest(res, 'Invalid resource ID');
  }

  if (err.code === 11000) {
    return ApiResponse.badRequest(res, 'Duplicate field value');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return ApiResponse.error(res, message, statusCode);
};

const notFoundHandler = (req, res) => {
  return ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};

module.exports = { errorHandler, notFoundHandler };
