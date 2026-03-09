/**
 * src/backend/security/hashing.js
 * Password hashing utilities for PrescriptCheck
 * Uses bcrypt for secure password storage (HIPAA compliant)
 */

'use strict';

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);

/**
 * Hashes a plaintext password
 * @param {string} password - Plaintext password
 * @returns {Promise<string>} bcrypt hash
 */
async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new TypeError('password must be a non-empty string');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares plaintext password against a stored hash
 * @param {string} password - Plaintext password
 * @param {string} hash - Stored bcrypt hash
 * @returns {Promise<boolean>} True if password matches
 */
async function verifyPassword(password, hash) {
  if (!password || !hash) {
    return false;
  }
  return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, verifyPassword };
