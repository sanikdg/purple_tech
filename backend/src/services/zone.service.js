const Zone = require('../models/Zone');

const createZone = async (zoneData) => {
  return Zone.create(zoneData);
};

const getZones = async (filters = {}) => {
  const query = {};
  if (filters.zoneType) query.zoneType = filters.zoneType;
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  return Zone.find(query).populate('cameraId', 'name location');
};

const getZoneById = async (id) => {
  return Zone.findById(id).populate('cameraId', 'name location');
};

const getZoneByZoneId = async (zoneId) => {
  return Zone.findOne({ zoneId }).populate('cameraId', 'name location');
};

const updateZone = async (id, updateData) => {
  return Zone.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteZone = async (id) => {
  return Zone.findByIdAndDelete(id);
};

module.exports = { createZone, getZones, getZoneById, getZoneByZoneId, updateZone, deleteZone };
