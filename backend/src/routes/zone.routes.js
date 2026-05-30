const express = require('express');
const zoneController = require('../controllers/zone.controller');
const validate = require('../middleware/validation.middleware');
const { createZoneSchema, updateZoneSchema } = require('../validations/zone.validation');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(createZoneSchema), zoneController.createZone);
router.get('/', zoneController.getZones);
router.get('/:id', zoneController.getZoneById);
router.put('/:id', validate(updateZoneSchema), zoneController.updateZone);
router.delete('/:id', zoneController.deleteZone);

module.exports = router;
