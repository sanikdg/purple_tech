const mongoose = require('mongoose');

const heatmapSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: [true, 'Visitor ID is required'],
      index: true,
    },
    xCoordinate: {
      type: Number,
      required: [true, 'X coordinate is required'],
    },
    yCoordinate: {
      type: Number,
      required: [true, 'Y coordinate is required'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camera',
    },
  },
  { timestamps: true }
);

heatmapSchema.index({ timestamp: -1, zoneId: 1 });
heatmapSchema.index({ cameraId: 1, timestamp: -1 });

module.exports = mongoose.model('Heatmap', heatmapSchema);
