/**
 * src/backend/tests/unit/utils/validators.test.js
 * Unit tests for input validation utilities
 */

'use strict';

const {
  isValidPrescriptionNumber,
  isValidPharmacyId,
  isValidDosage,
  isValidEmail,
  isValidISODate,
  isPrescriptionValid,
} = require('../../../utils/validators');

describe('Validators', () => {
  describe('isValidPrescriptionNumber()', () => {
    it('should accept a valid 10-digit prescription number', () => {
      expect(isValidPrescriptionNumber('1234567890')).toBe(true);
    });

    it('should reject numbers shorter than 10 digits', () => {
      expect(isValidPrescriptionNumber('123456789')).toBe(false);
    });

    it('should reject numbers longer than 10 digits', () => {
      expect(isValidPrescriptionNumber('12345678901')).toBe(false);
    });

    it('should reject strings containing non-digits', () => {
      expect(isValidPrescriptionNumber('12345-6789')).toBe(false);
      expect(isValidPrescriptionNumber('123456789A')).toBe(false);
    });

    it('should reject null and undefined', () => {
      expect(isValidPrescriptionNumber(null)).toBe(false);
      expect(isValidPrescriptionNumber(undefined)).toBe(false);
    });
  });

  describe('isValidPharmacyId()', () => {
    it('should accept a valid pharmacy ID', () => {
      expect(isValidPharmacyId('AT123456')).toBe(true);
      expect(isValidPharmacyId('DE999999')).toBe(true);
    });

    it('should reject IDs with wrong format', () => {
      expect(isValidPharmacyId('at123456')).toBe(false);
      expect(isValidPharmacyId('A1234567')).toBe(false);
      expect(isValidPharmacyId('AT12345')).toBe(false);
    });
  });

  describe('isValidDosage()', () => {
    it('should accept valid dosage formats', () => {
      expect(isValidDosage('500mg')).toBe(true);
      expect(isValidDosage('2.5ml')).toBe(true);
      expect(isValidDosage('10 IU')).toBe(true);
      expect(isValidDosage('1g')).toBe(true);
    });

    it('should reject invalid dosage formats', () => {
      expect(isValidDosage('dose')).toBe(false);
      expect(isValidDosage('')).toBe(false);
      expect(isValidDosage('500 tablets')).toBe(false);
    });
  });

  describe('isValidEmail()', () => {
    it('should accept valid email addresses', () => {
      expect(isValidEmail('doctor@hospital.de')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@no-local.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidISODate()', () => {
    it('should accept valid ISO date strings', () => {
      expect(isValidISODate('2026-03-09')).toBe(true);
    });

    it('should reject invalid date strings', () => {
      expect(isValidISODate('09.03.2026')).toBe(false);
      expect(isValidISODate('not-a-date')).toBe(false);
      expect(isValidISODate('2026-13-01')).toBe(false);
    });
  });

  describe('isPrescriptionValid()', () => {
    it('should return true for a recently issued prescription', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isPrescriptionValid(yesterday)).toBe(true);
    });

    it('should return false for an expired prescription', () => {
      const oldDate = new Date('2020-01-01');
      expect(isPrescriptionValid(oldDate)).toBe(false);
    });
  });
});
