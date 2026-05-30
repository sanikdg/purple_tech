const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camera',
    },
    totalVisitors: {
      type: Number,
      default: 0,
    },
    peakHour: {
      type: Number,
      min: 0,
      max: 23,
    },
    averageDwellTime: {
      type: Number,
      default: 0,
    },
    zoneBreakdown: [
      {
        zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
        visitorCount: { type: Number, default: 0 },
        avgDwellTime: { type: Number, default: 0 },
      },
    ],
    hourlyDistribution: {
      type: Map,
      of: Number,
      default: {},
    },
    anomalies: [
      {
        type: { type: String },
        description: String,
        detectedAt: Date,
        severity: {
          type: String,
          enum: ['low', 'medium', 'high', 'critical'],
        },
      },
    ],
  },
  { timestamps: true }
);

analyticsSchema.index({ date: -1, cameraId: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
