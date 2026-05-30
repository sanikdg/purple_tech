const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Camera name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Camera location is required'],
      trim: true,
    },
    streamUrl: {
      type: String,
      required: [true, 'Stream URL is required'],
    },
    resolution: {
      width: { type: Number, default: 1920 },
      height: { type: Number, default: 1080 },
    },
    fps: {
      type: Number,
      default: 30,
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'error'],
      default: 'offline',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    zones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Camera', cameraSchema);
