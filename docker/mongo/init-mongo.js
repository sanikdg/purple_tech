db = db.getSiblingDB('store-intelligence');

db.createCollection('users');
db.createCollection('events');
db.createCollection('cameras');
db.createCollection('analytics');
db.createCollection('zones');
db.createCollection('heatmaps');
db.createCollection('tracks');

db.events.createIndex({ eventType: 1, timestamp: -1 });
db.events.createIndex({ cameraId: 1, timestamp: -1 });
db.heatmaps.createIndex({ timestamp: -1, zoneId: 1 });
db.heatmaps.createIndex({ cameraId: 1, timestamp: -1 });
db.tracks.createIndex({ trackId: 1 }, { unique: true });
db.tracks.createIndex({ cameraId: 1, status: 1 });
db.tracks.createIndex({ startTime: -1 });
db.analytics.createIndex({ date: -1, cameraId: 1 });

print('MongoDB initialized: collections and indexes created for store-intelligence');
