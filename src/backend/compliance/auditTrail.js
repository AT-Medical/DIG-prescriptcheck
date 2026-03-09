/**
 * src/backend/compliance/auditTrail.js
 * Tamper-protected audit trail system for PrescriptCheck
 * HIPAA 45 CFR §164.312(b) and GDPR Article 30 compliant
 */

'use strict';

const crypto = require('crypto');

/**
 * Creates an audit log entry with integrity hash
 * @param {Object} params
 * @param {string} params.userId - ID of the acting user
 * @param {string} params.action - Action performed (e.g., 'PRESCRIPTION_VIEWED')
 * @param {string} params.resourceType - Type of resource (e.g., 'Prescription')
 * @param {string} params.resourceId - ID of the affected resource
 * @param {Object} [params.metadata] - Additional context (IP, user agent, etc.)
 * @returns {Object} Audit log entry with integrity hash
 */
function createAuditEntry({ userId, action, resourceType, resourceId, metadata = {} }) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    userId,
    action,
    resourceType,
    resourceId,
    metadata: {
      ...metadata,
      ipAddress: metadata.ipAddress || 'unknown',
      userAgent: metadata.userAgent || 'unknown',
    },
  };

  // Generate integrity hash to detect tampering
  const hashInput = JSON.stringify({
    timestamp: entry.timestamp,
    userId,
    action,
    resourceType,
    resourceId,
  });
  entry.integrityHash = crypto
    .createHmac('sha256', process.env.AUDIT_SECRET || 'prescriptcheck-audit')
    .update(hashInput)
    .digest('hex');

  return entry;
}

/**
 * Verifies the integrity of an audit log entry
 * @param {Object} entry - Audit log entry to verify
 * @returns {boolean} True if entry has not been tampered with
 */
function verifyAuditEntry(entry) {
  const hashInput = JSON.stringify({
    timestamp: entry.timestamp,
    userId: entry.userId,
    action: entry.action,
    resourceType: entry.resourceType,
    resourceId: entry.resourceId,
  });
  const expectedHash = crypto
    .createHmac('sha256', process.env.AUDIT_SECRET || 'prescriptcheck-audit')
    .update(hashInput)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(entry.integrityHash, 'hex'),
    Buffer.from(expectedHash, 'hex')
  );
}

/**
 * Supported audit actions for PrescriptCheck
 */
const AUDIT_ACTIONS = Object.freeze({
  // Authentication
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',

  // Prescriptions
  PRESCRIPTION_CREATED: 'PRESCRIPTION_CREATED',
  PRESCRIPTION_VIEWED: 'PRESCRIPTION_VIEWED',
  PRESCRIPTION_UPDATED: 'PRESCRIPTION_UPDATED',
  PRESCRIPTION_DELETED: 'PRESCRIPTION_DELETED',
  PRESCRIPTION_VALIDATED: 'PRESCRIPTION_VALIDATED',
  PRESCRIPTION_DISPENSED: 'PRESCRIPTION_DISPENSED',

  // Users
  USER_CREATED: 'USER_CREATED',
  USER_UPDATED: 'USER_UPDATED',
  USER_DEACTIVATED: 'USER_DEACTIVATED',

  // Compliance
  DATA_EXPORT_REQUESTED: 'DATA_EXPORT_REQUESTED',
  DATA_DELETED_GDPR: 'DATA_DELETED_GDPR',
  CONSENT_GIVEN: 'CONSENT_GIVEN',
  CONSENT_REVOKED: 'CONSENT_REVOKED',
});

module.exports = { createAuditEntry, verifyAuditEntry, AUDIT_ACTIONS };
