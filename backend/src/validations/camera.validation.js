const Joi = require('joi');

const createCameraSchema = Joi.object({
  name: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  streamUrl: Joi.string().uri().required(),
  resolution: Joi.object({
    width: Joi.number().integer().positive().default(1920),
    height: Joi.number().integer().positive().default(1080),
  }).optional(),
  fps: Joi.number().integer().min(1).max(120).default(30),
  status: Joi.string().valid('online', 'offline', 'error').default('offline'),
});

module.exports = { createCameraSchema };
