/**
 * src/backend/server.js
 * HTTP server entry point for PrescriptCheck
 */

'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: process.env.ENV_FILE || '../../.env.example' });

const app = require('./app');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`PrescriptCheck API running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received – shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
