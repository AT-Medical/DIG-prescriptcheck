/**
 * tests/compliance/hipaa.test.js
 * Compliance tests for HIPAA requirements
 */

'use strict';

const {
  PHI_FIELDS,
  enforceMinimumNecessary,
  createHipaaAuditEvent,
  isPermittedUse,
} = require('../../src/backend/compliance/hipaa');

describe('HIPAA Compliance', () => {
  describe('PHI_FIELDS', () => {
    it('should define required PHI identifiers', () => {
      expect(PHI_FIELDS).toContain('name');
      expect(PHI_FIELDS).toContain('email');
      expect(PHI_FIELDS).toContain('ssn');
      expect(PHI_FIELDS).toContain('dates');   // HIPAA Safe Harbor uses 'dates' as identifier
    });

    it('should be frozen (immutable)', () => {
      expect(Object.isFrozen(PHI_FIELDS)).toBe(true);
    });
  });

  describe('enforceMinimumNecessary()', () => {
    it('should return only allowed fields', () => {
      const data = {
        id: 'user-123',
        name: 'Max Mustermann',
        email: 'max@example.de',
        password: 'secret',
        role: 'patient',
      };
      const allowed = ['id', 'name', 'role'];
      const result = enforceMinimumNecessary(data, allowed);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('role');
      expect(result).not.toHaveProperty('email');
      expect(result).not.toHaveProperty('password');
    });

    it('should return empty object when no fields match', () => {
      const result = enforceMinimumNecessary({ a: 1, b: 2 }, ['c']);
      expect(result).toEqual({});
    });
  });

  describe('createHipaaAuditEvent()', () => {
    it('should create a compliant audit event', () => {
      const event = createHipaaAuditEvent('PRESCRIPTION_VIEWED', 'Prescription', {
        userId: 'pharmacist-1',
        ipAddress: '192.168.1.1',
      });

      expect(event).toHaveProperty('eventType', 'PHI_ACCESS');
      expect(event).toHaveProperty('action', 'PRESCRIPTION_VIEWED');
      expect(event).toHaveProperty('resourceType', 'Prescription');
      expect(event).toHaveProperty('complianceStandard', 'HIPAA');
      expect(event).toHaveProperty('timestamp');
    });
  });

  describe('isPermittedUse()', () => {
    it('should allow treatment as a permitted use', () => {
      expect(isPermittedUse('treatment')).toBe(true);
    });

    it('should allow payment as a permitted use', () => {
      expect(isPermittedUse('payment')).toBe(true);
    });

    it('should reject arbitrary non-permitted uses', () => {
      expect(isPermittedUse('marketing')).toBe(false);
      expect(isPermittedUse('commercial')).toBe(false);
      expect(isPermittedUse('')).toBe(false);
    });
  });
});
