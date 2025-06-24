require('dotenv').config();
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const logger = require('./utils/logger');
const { sequelize } = require('./models');

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io event handlers
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on('join-band', (bandId) => {
    socket.join(`band:${bandId}`);
    logger.info(`Socket ${socket.id} joined band room: ${bandId}`);
  });

  socket.on('leave-band', (bandId) => {
    socket.leave(`band:${bandId}`);
    logger.info(`Socket ${socket.id} left band room: ${bandId}`);
  });

  socket.on('availability-update', (data) => {
    io.to(`band:${data.bandId}`).emit('availability-changed', data);
    logger.info(`Availability update in band ${data.bandId} by user ${data.userId}`);
  });

  socket.on('event-update', (data) => {
    io.to(`band:${data.bandId}`).emit('event-changed', data);
    logger.info(`Event update in band ${data.bandId}: ${data.eventId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Database connection and server startup
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    
    // Start server
    server.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Start the server
startServer();

module.exports = server; // Export for testing