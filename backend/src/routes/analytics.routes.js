const express = require('express');
const analyticsController = require('../controllers/analytics.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/daily', analyticsController.getDailyAnalytics);
router.get('/range', analyticsController.getAnalyticsRange);

module.exports = router;
