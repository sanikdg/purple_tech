const analyticsService = require('../services/analytics.service');
const ApiResponse = require('../utils/response');

const getDailyAnalytics = async (req, res, next) => {
  try {
    const { date, cameraId } = req.query;
    if (!date) return ApiResponse.badRequest(res, 'Date parameter is required');
    const analytics = await analyticsService.getDailyAnalytics(date, cameraId);
    return ApiResponse.success(res, analytics, 'Daily analytics retrieved');
  } catch (error) {
    next(error);
  }
};

const getAnalyticsRange = async (req, res, next) => {
  try {
    const { startDate, endDate, cameraId } = req.query;
    if (!startDate || !endDate) {
      return ApiResponse.badRequest(res, 'startDate and endDate are required');
    }
    const analytics = await analyticsService.getAnalyticsRange(startDate, endDate, cameraId);
    return ApiResponse.success(res, analytics, 'Analytics range retrieved');
  } catch (error) {
    next(error);
  }
};

module.exports = { getDailyAnalytics, getAnalyticsRange };
