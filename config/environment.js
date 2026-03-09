/**
 * config/environment.js
 * Environment variable management for PrescriptCheck
 * Validates required variables and provides defaults
 */

'use strict';

const dotenv = require('dotenv');

const ENV_FILE_MAP = {
  test: '.env.test',
  production: '.env.production',
};

const envFile = ENV_FILE_MAP[process.env.NODE_ENV] || '.env.example';
dotenv.config({ path: envFile });

const REQUIRED_IN_PRODUCTION = [
  'MONGODB_URI',
  'JWT_SECRET',
  'ENCRYPTION_KEY',
];

if (process.env.NODE_ENV === 'production') {
  const missing = REQUIRED_IN_PRODUCTION.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  encryptionKey: process.env.ENCRYPTION_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3001').split(','),
  logLevel: process.env.LOG_LEVEL || 'info',
};
