const mongoose = require('mongoose');
const { EVENT_TYPES } = require('../utils/eventTypes');

const eventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: Object.values(EVENT_TYPES),
      index: true,
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camera',
      required: true,
    },
    trackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true }
);

eventSchema.index({ eventType: 1, timestamp: -1 });
eventSchema.index({ cameraId: 1, timestamp: -1 });

module.exports = mongoose.model('Event', eventSchema);
