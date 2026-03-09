/**
 * config/compliance.config.js
 * Healthcare compliance configuration for PrescriptCheck
 * GDPR, HIPAA, and DSGVO settings
 */

'use strict';

module.exports = {
  gdpr: {
    dataRetentionYears: 10,          // Standard medical record retention
    consentRequired: true,
    rightToErasure: true,
    dataPortabilityEnabled: true,
    auditLogRetentionYears: 7,
    cookieConsentRequired: true,
  },

  hipaa: {
    auditTrailEnabled: true,
    encryptionAtRest: true,
    encryptionInTransit: true,
    minimumNecessaryStandard: true,
    accessControlEnabled: true,
    sessionTimeoutMinutes: 30,
    mfaRequired: process.env.NODE_ENV === 'production',
  },

  dsgvo: {
    // German GDPR (Datenschutz-Grundverordnung)
    dataRetentionYears: 10,          // §630f BGB: medical records
    btmRetentionYears: 3,            // §17 BtMVV: controlled substances
    processingRecordRequired: true,
    dataProtectionOfficerRequired: false, // Required if >20 employees process data
    informationDutyComplied: true,
  },

  audit: {
    enabled: true,
    tamperProtection: true,
    retentionYears: 7,
    sensitiveActions: [
      'PRESCRIPTION_VIEWED',
      'PRESCRIPTION_DISPENSED',
      'DATA_EXPORT_REQUESTED',
      'DATA_DELETED_GDPR',
    ],
  },

  encryption: {
    algorithm: 'aes-256-gcm',
    keyDerivation: 'sha256',
    passwordHashing: 'bcrypt',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  },
};
