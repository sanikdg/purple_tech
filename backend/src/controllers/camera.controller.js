const cameraService = require('../services/camera.service');
const ApiResponse = require('../utils/response');

const createCamera = async (req, res, next) => {
  try {
    const camera = await cameraService.createCamera(req.body);
    return ApiResponse.created(res, camera, 'Camera created');
  } catch (error) {
    next(error);
  }
};

const getCameras = async (req, res, next) => {
  try {
    const cameras = await cameraService.getCameras(req.query);
    return ApiResponse.success(res, cameras, 'Cameras retrieved');
  } catch (error) {
    next(error);
  }
};

const getCameraById = async (req, res, next) => {
  try {
    const camera = await cameraService.getCameraById(req.params.id);
    if (!camera) return ApiResponse.notFound(res, 'Camera not found');
    return ApiResponse.success(res, camera, 'Camera retrieved');
  } catch (error) {
    next(error);
  }
};

const updateCamera = async (req, res, next) => {
  try {
    const camera = await cameraService.updateCamera(req.params.id, req.body);
    if (!camera) return ApiResponse.notFound(res, 'Camera not found');
    return ApiResponse.success(res, camera, 'Camera updated');
  } catch (error) {
    next(error);
  }
};

const deleteCamera = async (req, res, next) => {
  try {
    const camera = await cameraService.deleteCamera(req.params.id);
    if (!camera) return ApiResponse.notFound(res, 'Camera not found');
    return ApiResponse.success(res, null, 'Camera deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = { createCamera, getCameras, getCameraById, updateCamera, deleteCamera };
