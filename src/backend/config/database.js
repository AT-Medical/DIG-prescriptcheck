/**
 * src/backend/config/database.js
 * Database connection configuration for PrescriptCheck
 * Supports MongoDB (primary) with connection pooling
 */

'use strict';

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prescriptcheck';

const connectionOptions = {
  maxPoolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI, connectionOptions);
    console.log('[DB] MongoDB connected successfully');
    return mongoose.connection;
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    throw err;
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('[DB] MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[DB] MongoDB error:', err.message);
});

module.exports = { connectDatabase, connection: mongoose.connection };
