const eventService = require('../services/event.service');
const ApiResponse = require('../utils/response');

const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body);
    return ApiResponse.created(res, event, 'Event created');
  } catch (error) {
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const { eventType, cameraId, startDate, endDate, page, limit } = req.query;
    const result = await eventService.getEvents(
      { eventType, cameraId, startDate, endDate },
      parseInt(page) || 1,
      parseInt(limit) || 50
    );
    return ApiResponse.success(res, result, 'Events retrieved');
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return ApiResponse.notFound(res, 'Event not found');
    return ApiResponse.success(res, event, 'Event retrieved');
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvent, getEvents, getEventById };
