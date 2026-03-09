/**
 * src/backend/config/environment.js
 * Environment variable validation and configuration
 * Ensures all required environment variables are set before startup
 */

'use strict';

const REQUIRED_VARS = [
  'MONGODB_URI',
  'JWT_SECRET',
  'NODE_ENV',
];

const OPTIONAL_VARS = {
  PORT: '3000',
  HOST: '0.0.0.0',
  ALLOWED_ORIGINS: 'http://localhost:3001',
  LOG_LEVEL: 'info',
  BCRYPT_ROUNDS: '12',
  RATE_LIMIT_MAX: '100',
  ENABLE_2FA: 'false',
};

function validateEnvironment() {
  const missing = REQUIRED_VARS.filter(
    (varName) => !process.env[varName]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }
}

function getConfig() {
  // Apply defaults for optional vars
  Object.entries(OPTIONAL_VARS).forEach(([key, defaultVal]) => {
    if (!process.env[key]) {
      process.env[key] = defaultVal;
    }
  });

  return {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    host: process.env.HOST,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins: process.env.ALLOWED_ORIGINS.split(','),
    logLevel: process.env.LOG_LEVEL,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10),
    enable2FA: process.env.ENABLE_2FA === 'true',
  };
}

module.exports = { validateEnvironment, getConfig, REQUIRED_VARS, OPTIONAL_VARS };
