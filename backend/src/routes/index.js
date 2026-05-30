const express = require('express');
const authRoutes = require('./auth.routes');
const eventRoutes = require('./event.routes');
const cameraRoutes = require('./camera.routes');
const analyticsRoutes = require('./analytics.routes');
const zoneRoutes = require('./zone.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/cameras', cameraRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/zones', zoneRoutes);

module.exports = router;
