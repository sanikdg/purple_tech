const mongoose = require('mongoose');
const { ZONE_TYPES } = require('../utils/eventTypes');

const zoneSchema = new mongoose.Schema(
  {
    zoneId: {
      type: String,
      required: [true, 'Zone ID is required'],
      unique: true,
      trim: true,
    },
    zoneName: {
      type: String,
      required: [true, 'Zone name is required'],
      trim: true,
    },
    zoneType: {
      type: String,
      required: [true, 'Zone type is required'],
      enum: Object.values(ZONE_TYPES),
    },
    polygonCoordinates: {
      type: [
        {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
      ],
      validate: {
        validator: (v) => v.length >= 3,
        message: 'A zone polygon requires at least 3 coordinate points',
      },
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camera',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Zone', zoneSchema);
