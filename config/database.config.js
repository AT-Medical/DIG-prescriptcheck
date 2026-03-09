/**
 * config/database.config.js
 * Centralized database configuration for PrescriptCheck
 * Supports MongoDB with environment-specific settings
 */

'use strict';

const environments = {
  development: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/prescriptcheck_dev',
    options: {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    },
  },
  test: {
    uri: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/prescriptcheck_test',
    options: {
      maxPoolSize: 2,
      serverSelectionTimeoutMS: 3000,
    },
  },
  production: {
    uri: process.env.MONGODB_URI,
    options: {
      maxPoolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      tls: true,
    },
  },
};

const env = process.env.NODE_ENV || 'development';
const config = environments[env] || environments.development;

if (env === 'production' && !config.uri) {
  throw new Error('MONGODB_URI environment variable is required in production');
}

module.exports = config;
