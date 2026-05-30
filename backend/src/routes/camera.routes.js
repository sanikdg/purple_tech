const express = require('express');
const cameraController = require('../controllers/camera.controller');
const validate = require('../middleware/validation.middleware');
const { createCameraSchema } = require('../validations/camera.validation');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(createCameraSchema), cameraController.createCamera);
router.get('/', cameraController.getCameras);
router.get('/:id', cameraController.getCameraById);
router.put('/:id', cameraController.updateCamera);
router.delete('/:id', cameraController.deleteCamera);

module.exports = router;
