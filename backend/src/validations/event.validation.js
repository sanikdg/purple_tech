const Joi = require('joi');
const { EVENT_TYPES } = require('../utils/eventTypes');

const createEventSchema = Joi.object({
  eventType: Joi.string()
    .valid(...Object.values(EVENT_TYPES))
    .required(),
  cameraId: Joi.string().required(),
  trackId: Joi.string().optional(),
  zoneId: Joi.string().optional(),
  timestamp: Joi.date().optional(),
  payload: Joi.object().optional(),
  confidence: Joi.number().min(0).max(1).optional(),
});

module.exports = { createEventSchema };
