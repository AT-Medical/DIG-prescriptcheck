/**
 * src/backend/tests/unit/compliance/auditTrail.test.js
 * Unit tests for the audit trail compliance module
 */

'use strict';

const { createAuditEntry, verifyAuditEntry, AUDIT_ACTIONS } = require('../../../compliance/auditTrail');

describe('Audit Trail', () => {
  const validEntry = {
    userId: 'user-123',
    action: AUDIT_ACTIONS.PRESCRIPTION_VIEWED,
    resourceType: 'Prescription',
    resourceId: 'rx-456',
    metadata: { ipAddress: '192.168.1.1', userAgent: 'Mozilla/5.0' },
  };

  describe('createAuditEntry()', () => {
    it('should create an entry with required fields', () => {
      const entry = createAuditEntry(validEntry);
      expect(entry).toHaveProperty('timestamp');
      expect(entry).toHaveProperty('userId', validEntry.userId);
      expect(entry).toHaveProperty('action', validEntry.action);
      expect(entry).toHaveProperty('resourceType', validEntry.resourceType);
      expect(entry).toHaveProperty('resourceId', validEntry.resourceId);
      expect(entry).toHaveProperty('integrityHash');
    });

    it('should include a valid ISO timestamp', () => {
      const entry = createAuditEntry(validEntry);
      expect(new Date(entry.timestamp).toISOString()).toBe(entry.timestamp);
    });

    it('should include metadata with default values when metadata is empty', () => {
      const entry = createAuditEntry({ ...validEntry, metadata: {} });
      expect(entry.metadata).toHaveProperty('ipAddress', 'unknown');
      expect(entry.metadata).toHaveProperty('userAgent', 'unknown');
    });

    it('should produce a 64-char hex integrity hash', () => {
      const entry = createAuditEntry(validEntry);
      expect(entry.integrityHash).toMatch(/^[0-9a-f]{64}$/);
    });
  });

  describe('verifyAuditEntry()', () => {
    it('should return true for an unmodified entry', () => {
      const entry = createAuditEntry(validEntry);
      expect(verifyAuditEntry(entry)).toBe(true);
    });

    it('should return false when the action field is tampered with', () => {
      const entry = createAuditEntry(validEntry);
      entry.action = AUDIT_ACTIONS.PRESCRIPTION_DELETED;
      expect(verifyAuditEntry(entry)).toBe(false);
    });

    it('should return false when userId is changed', () => {
      const entry = createAuditEntry(validEntry);
      entry.userId = 'attacker-999';
      expect(verifyAuditEntry(entry)).toBe(false);
    });
  });

  describe('AUDIT_ACTIONS', () => {
    it('should be frozen (immutable)', () => {
      expect(Object.isFrozen(AUDIT_ACTIONS)).toBe(true);
    });

    it('should contain prescription lifecycle actions', () => {
      expect(AUDIT_ACTIONS).toHaveProperty('PRESCRIPTION_CREATED');
      expect(AUDIT_ACTIONS).toHaveProperty('PRESCRIPTION_VIEWED');
      expect(AUDIT_ACTIONS).toHaveProperty('PRESCRIPTION_DELETED');
    });

    it('should contain GDPR compliance actions', () => {
      expect(AUDIT_ACTIONS).toHaveProperty('DATA_EXPORT_REQUESTED');
      expect(AUDIT_ACTIONS).toHaveProperty('DATA_DELETED_GDPR');
    });
  });
});
