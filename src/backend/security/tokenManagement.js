/**
 * src/backend/security/tokenManagement.js
 * JWT token generation and management for PrescriptCheck
 */

'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generates a JWT access token for authenticated users
 * @param {Object} payload - User data (id, role, email)
 * @returns {string} Signed JWT token
 */
function generateAccessToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');

  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      algorithm: 'HS256',
      issuer: 'prescriptcheck',
    }
  );
}

/**
 * Generates a refresh token (random secure token)
 * @returns {string} Hex-encoded refresh token
 */
function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

/**
 * Verifies and decodes a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');

  return jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer: 'prescriptcheck',
  });
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken };
