const Event = require('../models/Event');

const createEvent = async (eventData) => {
  return Event.create(eventData);
};

const getEvents = async (filters = {}, page = 1, limit = 50) => {
  const query = {};
  if (filters.eventType) query.eventType = filters.eventType;
  if (filters.cameraId) query.cameraId = filters.cameraId;
  if (filters.startDate || filters.endDate) {
    query.timestamp = {};
    if (filters.startDate) query.timestamp.$gte = new Date(filters.startDate);
    if (filters.endDate) query.timestamp.$lte = new Date(filters.endDate);
  }

  const skip = (page - 1) * limit;
  const [events, total] = await Promise.all([
    Event.find(query).sort({ timestamp: -1 }).skip(skip).limit(limit).populate('cameraId', 'name location'),
    Event.countDocuments(query),
  ]);

  return { events, total, page, totalPages: Math.ceil(total / limit) };
};

const getEventById = async (id) => {
  return Event.findById(id).populate('cameraId', 'name location');
};

module.exports = { createEvent, getEvents, getEventById };
