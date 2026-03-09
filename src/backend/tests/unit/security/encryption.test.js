/**
 * src/backend/tests/unit/security/encryption.test.js
 * Unit tests for the encryption security module
 */

'use strict';

describe('Encryption', () => {
  let encrypt, decrypt;

  beforeAll(() => {
    // Set a test encryption key (must be set before requiring the module)
    process.env.ENCRYPTION_KEY = 'test-encryption-key-for-unit-tests-only';
    // Re-require to pick up the env var
    jest.resetModules();
    ({ encrypt, decrypt } = require('../../../security/encryption'));
  });

  afterAll(() => {
    delete process.env.ENCRYPTION_KEY;
  });

  it('should encrypt and decrypt a string correctly', () => {
    const plaintext = 'Patient: Max Mustermann, DOB: 1990-01-15';
    const encrypted = encrypt(plaintext);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('should produce different ciphertexts for the same input (unique IVs)', () => {
    const plaintext = 'same plaintext';
    const encrypted1 = encrypt(plaintext);
    const encrypted2 = encrypt(plaintext);
    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should return base64-encoded output', () => {
    const encrypted = encrypt('test data');
    expect(() => Buffer.from(encrypted, 'base64')).not.toThrow();
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => encrypt(12345)).toThrow(TypeError);
    expect(() => encrypt(null)).toThrow(TypeError);
  });

  it('should throw when ENCRYPTION_KEY is missing', () => {
    const savedKey = process.env.ENCRYPTION_KEY;
    delete process.env.ENCRYPTION_KEY;
    jest.resetModules();
    const { encrypt: encryptNoKey } = require('../../../security/encryption');
    expect(() => encryptNoKey('test')).toThrow('ENCRYPTION_KEY');
    process.env.ENCRYPTION_KEY = savedKey;
    jest.resetModules();
  });
});
