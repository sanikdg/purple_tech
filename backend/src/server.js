const http = require('http');
const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { initializeSocket } = require('./sockets');

const server = http.createServer(app);

initializeSocket(server);

const start = async () => {
  await connectDB();
  server.listen(config.port, () => {
    logger.info(`Backend server running on port ${config.port} [${config.nodeEnv}]`);
  });
};

start();
