/**
 * tests/compliance/gdpr.test.js
 * Compliance tests for GDPR requirements
 */

'use strict';

const {
  anonymizeUserData,
  generateDataExport,
  isRetentionExpired,
  DATA_SUBJECT_RIGHTS,
} = require('../../src/backend/compliance/gdpr');

describe('GDPR Compliance', () => {
  describe('anonymizeUserData()', () => {
    const testUser = {
      id: 'user-123',
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max@example.de',
      phone: '+43 1 234567',
      address: 'Hauptstraße 1, Wien',
    };

    it('should replace personal fields with anonymized placeholders', () => {
      const anonymized = anonymizeUserData(testUser);
      expect(anonymized.firstName).toBe('[ANONYMIZED]');
      expect(anonymized.lastName).toBe('[ANONYMIZED]');
      expect(anonymized.phone).toBe('[ANONYMIZED]');
      expect(anonymized.address).toBe('[ANONYMIZED]');
    });

    it('should replace email with a non-identifiable address', () => {
      const anonymized = anonymizeUserData(testUser);
      expect(anonymized.email).toContain('anonymized_');
      expect(anonymized.email).toContain('@deleted.invalid');
      expect(anonymized.email).not.toContain('max@example.de');
    });

    it('should preserve the user ID for referential integrity', () => {
      const anonymized = anonymizeUserData(testUser);
      expect(anonymized.id).toBe(testUser.id);
    });

    it('should set gdprErased flag and deletedAt timestamp', () => {
      const anonymized = anonymizeUserData(testUser);
      expect(anonymized.gdprErased).toBe(true);
      expect(anonymized.deletedAt).toBeDefined();
    });
  });

  describe('generateDataExport()', () => {
    it('should generate a GDPR-compliant export object', () => {
      const userData = {
        id: 'user-123',
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max@example.de',
        role: 'patient',
        createdAt: '2026-01-01',
      };
      const exportData = generateDataExport(userData, []);
      expect(exportData).toHaveProperty('exportGeneratedAt');
      expect(exportData).toHaveProperty('dataController', 'AT Medical GmbH');
      expect(exportData).toHaveProperty('legalBasis');
      expect(exportData.personalData.id).toBe('user-123');
      expect(exportData.prescriptionData).toEqual([]);
    });
  });

  describe('isRetentionExpired()', () => {
    it('should return false for recently created data', () => {
      const recentDate = new Date();
      recentDate.setFullYear(recentDate.getFullYear() - 1);
      expect(isRetentionExpired(recentDate, 10)).toBe(false);
    });

    it('should return true for data older than retention period', () => {
      const oldDate = new Date('2010-01-01');
      expect(isRetentionExpired(oldDate, 10)).toBe(true);
    });
  });

  describe('DATA_SUBJECT_RIGHTS', () => {
    it('should define all GDPR data subject rights', () => {
      expect(DATA_SUBJECT_RIGHTS).toHaveProperty('ACCESS');
      expect(DATA_SUBJECT_RIGHTS).toHaveProperty('RECTIFICATION');
      expect(DATA_SUBJECT_RIGHTS).toHaveProperty('ERASURE');
      expect(DATA_SUBJECT_RIGHTS).toHaveProperty('PORTABILITY');
    });

    it('should be frozen (immutable)', () => {
      expect(Object.isFrozen(DATA_SUBJECT_RIGHTS)).toBe(true);
    });
  });
});
