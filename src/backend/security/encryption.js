/**
 * src/backend/security/encryption.js
 * Data encryption utilities for PrescriptCheck
 * Provides AES-256-GCM encryption for sensitive patient data at rest
 */

'use strict';

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16;  // 128 bits
const TAG_LENGTH = 16; // 128 bits

/**
 * Derives an encryption key from the environment variable
 * @returns {Buffer} 32-byte key
 */
function getDerivedKey() {
  const secret = process.env.ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts plaintext data
 * @param {string} plaintext - Data to encrypt
 * @returns {string} Base64-encoded IV:tag:ciphertext
 */
function encrypt(plaintext) {
  if (typeof plaintext !== 'string') {
    throw new TypeError('plaintext must be a string');
  }
  const key = getDerivedKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

/**
 * Decrypts data encrypted by encrypt()
 * @param {string} encryptedData - Base64-encoded encrypted data
 * @returns {string} Decrypted plaintext
 */
function decrypt(encryptedData) {
  const key = getDerivedKey();
  const buffer = Buffer.from(encryptedData, 'base64');

  const iv = buffer.slice(0, IV_LENGTH);
  const tag = buffer.slice(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = buffer.slice(IV_LENGTH + TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString('utf8');
}

module.exports = { encrypt, decrypt };
