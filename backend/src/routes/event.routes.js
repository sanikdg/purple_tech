const express = require('express');
const eventController = require('../controllers/event.controller');
const validate = require('../middleware/validation.middleware');
const { createEventSchema } = require('../validations/event.validation');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(createEventSchema), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;
