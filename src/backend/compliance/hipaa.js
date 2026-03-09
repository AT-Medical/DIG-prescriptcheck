/**
 * src/backend/compliance/hipaa.js
 * HIPAA compliance utilities for PrescriptCheck
 * Implements US Health Insurance Portability and Accountability Act requirements
 */

'use strict';

/**
 * Protected Health Information (PHI) field identifiers per HIPAA Safe Harbor
 * 45 CFR §164.514(b)(2)
 */
const PHI_FIELDS = Object.freeze([
  'name',
  'address',
  'dates',
  'phone',
  'fax',
  'email',
  'ssn',
  'medicalRecordNumber',
  'healthPlanNumber',
  'accountNumber',
  'certificateNumber',
  'vehicleIdentifier',
  'deviceIdentifier',
  'webUrl',
  'ipAddress',
  'biometricIdentifier',
  'photo',
  'otherUniqueIdentifier',
]);

/**
 * Minimum Necessary Standard check (HIPAA 45 CFR §164.502(b))
 * Verifies only required fields are included in a response
 * @param {Object} data - Data to check
 * @param {Array<string>} allowedFields - Fields permitted for this use case
 * @returns {Object} Filtered data with only allowed fields
 */
function enforceMinimumNecessary(data, allowedFields) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );
}

/**
 * Generates a HIPAA-compliant audit event description
 * @param {string} action - The action performed
 * @param {string} resourceType - Type of PHI accessed
 * @param {Object} context - Request context
 * @returns {Object} Audit event object
 */
function createHipaaAuditEvent(action, resourceType, context = {}) {
  return {
    eventType: 'PHI_ACCESS',
    action,
    resourceType,
    timestamp: new Date().toISOString(),
    userId: context.userId,
    sessionId: context.sessionId,
    ipAddress: context.ipAddress,
    accessReason: context.accessReason || 'treatment',
    complianceStandard: 'HIPAA',
  };
}

/**
 * Validates that a data access reason is HIPAA-compliant
 * Permitted uses: treatment, payment, health care operations
 * @param {string} reason - Stated reason for access
 * @returns {boolean}
 */
function isPermittedUse(reason) {
  const PERMITTED_USES = ['treatment', 'payment', 'healthcare_operations', 'research', 'public_health'];
  return PERMITTED_USES.includes(reason);
}

module.exports = {
  PHI_FIELDS,
  enforceMinimumNecessary,
  createHipaaAuditEvent,
  isPermittedUse,
};
