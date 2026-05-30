const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.BACKEND_PORT, 10) || 5000,
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/store-intelligence',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_me',
    expiration: process.env.JWT_EXPIRATION || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
};
