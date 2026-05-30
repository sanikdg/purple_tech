const Joi = require('joi');
const { ZONE_TYPES } = require('../utils/eventTypes');

const createZoneSchema = Joi.object({
  zoneId: Joi.string().trim().required(),
  zoneName: Joi.string().trim().required(),
  zoneType: Joi.string()
    .valid(...Object.values(ZONE_TYPES))
    .required(),
  polygonCoordinates: Joi.array()
    .items(
      Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
      })
    )
    .min(3)
    .required(),
  description: Joi.string().allow('').optional(),
  cameraId: Joi.string().optional(),
});

const updateZoneSchema = Joi.object({
  zoneName: Joi.string().trim().optional(),
  zoneType: Joi.string()
    .valid(...Object.values(ZONE_TYPES))
    .optional(),
  polygonCoordinates: Joi.array()
    .items(
      Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
      })
    )
    .min(3)
    .optional(),
  description: Joi.string().allow('').optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createZoneSchema, updateZoneSchema };
