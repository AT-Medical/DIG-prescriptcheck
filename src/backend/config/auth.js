/**
 * src/backend/config/auth.js
 * Authentication configuration for PrescriptCheck
 * JWT and session settings
 */

'use strict';

const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    algorithm: 'HS256',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  },
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  twoFactor: {
    enabled: process.env.ENABLE_2FA === 'true',
    issuer: 'PrescriptCheck',
  },
};

function validateAuthConfig() {
  if (!authConfig.jwt.secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  if (authConfig.jwt.secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
}

module.exports = { authConfig, validateAuthConfig };
