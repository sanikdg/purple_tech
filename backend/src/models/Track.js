const mongoose = require('mongoose');
const { TRACK_STATUS } = require('../utils/eventTypes');

const trackSchema = new mongoose.Schema(
  {
    trackId: {
      type: String,
      required: [true, 'Track ID is required'],
      unique: true,
      index: true,
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camera',
      required: [true, 'Camera ID is required'],
    },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      default: Date.now,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      default: 0,
    },
    currentPosition: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: Object.values(TRACK_STATUS),
      default: TRACK_STATUS.ACTIVE,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

trackSchema.index({ cameraId: 1, status: 1 });
trackSchema.index({ startTime: -1 });

module.exports = mongoose.model('Track', trackSchema);
