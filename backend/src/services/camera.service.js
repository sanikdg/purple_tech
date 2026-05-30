const Camera = require('../models/Camera');

const createCamera = async (cameraData) => {
  return Camera.create(cameraData);
};

const getCameras = async (filters = {}) => {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  return Camera.find(query).populate('zones', 'zoneName zoneType');
};

const getCameraById = async (id) => {
  return Camera.findById(id).populate('zones', 'zoneName zoneType');
};

const updateCamera = async (id, updateData) => {
  return Camera.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteCamera = async (id) => {
  return Camera.findByIdAndDelete(id);
};

module.exports = { createCamera, getCameras, getCameraById, updateCamera, deleteCamera };
