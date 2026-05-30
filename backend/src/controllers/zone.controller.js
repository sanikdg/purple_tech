const zoneService = require('../services/zone.service');
const ApiResponse = require('../utils/response');

const createZone = async (req, res, next) => {
  try {
    const zone = await zoneService.createZone(req.body);
    return ApiResponse.created(res, zone, 'Zone created');
  } catch (error) {
    next(error);
  }
};

const getZones = async (req, res, next) => {
  try {
    const zones = await zoneService.getZones(req.query);
    return ApiResponse.success(res, zones, 'Zones retrieved');
  } catch (error) {
    next(error);
  }
};

const getZoneById = async (req, res, next) => {
  try {
    const zone = await zoneService.getZoneById(req.params.id);
    if (!zone) return ApiResponse.notFound(res, 'Zone not found');
    return ApiResponse.success(res, zone, 'Zone retrieved');
  } catch (error) {
    next(error);
  }
};

const updateZone = async (req, res, next) => {
  try {
    const zone = await zoneService.updateZone(req.params.id, req.body);
    if (!zone) return ApiResponse.notFound(res, 'Zone not found');
    return ApiResponse.success(res, zone, 'Zone updated');
  } catch (error) {
    next(error);
  }
};

const deleteZone = async (req, res, next) => {
  try {
    const zone = await zoneService.deleteZone(req.params.id);
    if (!zone) return ApiResponse.notFound(res, 'Zone not found');
    return ApiResponse.success(res, null, 'Zone deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = { createZone, getZones, getZoneById, updateZone, deleteZone };
