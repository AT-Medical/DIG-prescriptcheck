/**
 * src/backend/compliance/gdpr.js
 * GDPR compliance utilities for PrescriptCheck
 * Implements EU General Data Protection Regulation requirements
 */

'use strict';

/**
 * Data subject rights supported by PrescriptCheck (GDPR Chapter III)
 */
const DATA_SUBJECT_RIGHTS = Object.freeze({
  ACCESS: 'right_to_access',          // Article 15
  RECTIFICATION: 'right_to_rectify',   // Article 16
  ERASURE: 'right_to_erasure',         // Article 17
  RESTRICTION: 'right_to_restriction', // Article 18
  PORTABILITY: 'right_to_portability', // Article 20
  OBJECTION: 'right_to_object',        // Article 21
});

/**
 * Anonymizes patient personal data for GDPR erasure requests
 * Replaces identifiable fields with anonymized placeholders
 * @param {Object} userData - User record to anonymize
 * @returns {Object} Anonymized user record
 */
function anonymizeUserData(userData) {
  return {
    ...userData,
    firstName: '[ANONYMIZED]',
    lastName: '[ANONYMIZED]',
    email: `anonymized_${userData.id}@deleted.invalid`,
    phone: '[ANONYMIZED]',
    address: '[ANONYMIZED]',
    dateOfBirth: null,
    deletedAt: new Date().toISOString(),
    gdprErased: true,
  };
}

/**
 * Generates a GDPR-compliant data export for a user
 * @param {Object} userData - User data to export
 * @param {Array} prescriptions - User's prescription records
 * @returns {Object} Structured data export
 */
function generateDataExport(userData, prescriptions = []) {
  return {
    exportGeneratedAt: new Date().toISOString(),
    dataController: 'AT Medical GmbH',
    legalBasis: 'GDPR Article 20 – Right to Data Portability',
    personalData: {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      createdAt: userData.createdAt,
    },
    prescriptionData: prescriptions.map((p) => ({
      id: p.id,
      createdAt: p.createdAt,
      status: p.status,
      medication: p.medication,
    })),
  };
}

/**
 * Checks if personal data retention period has expired (GDPR Article 5(1)(e))
 * @param {Date} dataCreatedAt - When the data was created
 * @param {number} retentionYears - Required retention period in years
 * @returns {boolean} True if data should be deleted
 */
function isRetentionExpired(dataCreatedAt, retentionYears = 10) {
  const expiryDate = new Date(dataCreatedAt);
  expiryDate.setFullYear(expiryDate.getFullYear() + retentionYears);
  return new Date() > expiryDate;
}

module.exports = {
  DATA_SUBJECT_RIGHTS,
  anonymizeUserData,
  generateDataExport,
  isRetentionExpired,
};
