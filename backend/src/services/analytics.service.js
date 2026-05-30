const Analytics = require('../models/Analytics');

const getDailyAnalytics = async (date, cameraId) => {
  const query = { date: new Date(date) };
  if (cameraId) query.cameraId = cameraId;
  return Analytics.findOne(query).populate('zoneBreakdown.zoneId', 'zoneName zoneType');
};

const getAnalyticsRange = async (startDate, endDate, cameraId) => {
  const query = {
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  };
  if (cameraId) query.cameraId = cameraId;
  return Analytics.find(query).sort({ date: -1 }).populate('zoneBreakdown.zoneId', 'zoneName zoneType');
};

const upsertDailyAnalytics = async (date, cameraId, data) => {
  return Analytics.findOneAndUpdate(
    { date: new Date(date), cameraId },
    { $set: data },
    { upsert: true, new: true, runValidators: true }
  );
};

module.exports = { getDailyAnalytics, getAnalyticsRange, upsertDailyAnalytics };
