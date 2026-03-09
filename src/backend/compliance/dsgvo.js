/**
 * src/backend/compliance/dsgvo.js
 * DSGVO (Datenschutz-Grundverordnung) compliance for PrescriptCheck
 * German implementation of GDPR – specific German healthcare data requirements
 */

'use strict';

/**
 * Data categories under DSGVO Article 9 (sensitive data requiring special protection)
 */
const SENSITIVE_DATA_CATEGORIES = Object.freeze({
  HEALTH_DATA: 'gesundheitsdaten',         // Article 9(1)
  GENETIC_DATA: 'genetische_daten',        // Article 9(1)
  BIOMETRIC_DATA: 'biometrische_daten',    // Article 9(1)
  SOCIAL_WELFARE: 'sozialleistungsdaten',  // §35 BDSG
});

/**
 * Legal bases for processing under DSGVO Article 6
 */
const LEGAL_BASES = Object.freeze({
  CONSENT: 'einwilligung',                   // Article 6(1)(a)
  CONTRACT: 'vertrag',                       // Article 6(1)(b)
  LEGAL_OBLIGATION: 'rechtliche_pflicht',    // Article 6(1)(c)
  VITAL_INTERESTS: 'lebenswichtige_interessen', // Article 6(1)(d)
  PUBLIC_TASK: 'oeffentliche_aufgabe',       // Article 6(1)(e)
  LEGITIMATE_INTERESTS: 'berechtigte_interessen', // Article 6(1)(f)
});

/**
 * Generates a DSGVO-compliant processing record entry
 * Required by DSGVO Article 30 (Verzeichnis von Verarbeitungstätigkeiten)
 * @param {Object} params
 * @returns {Object} Processing record entry
 */
function createProcessingRecord({
  purpose,
  dataCategories,
  legalBasis,
  retentionPeriod,
  recipients = [],
}) {
  return {
    timestamp: new Date().toISOString(),
    controller: 'AT Medical GmbH',
    purpose,
    dataCategories,
    legalBasis,
    retentionPeriod,
    recipients,
    thirdCountryTransfer: false,
    safeguards: 'AES-256-GCM Verschlüsselung, TLS 1.3',
  };
}

/**
 * Validates if a data retention period complies with DSGVO storage limitation
 * Healthcare data in Germany: typically 10 years (§630f BGB)
 * @param {number} years - Retention period in years
 * @returns {boolean}
 */
function isCompliantRetention(years) {
  const MAX_RETENTION_YEARS = 30;
  const MIN_RETENTION_YEARS = 0;
  return years >= MIN_RETENTION_YEARS && years <= MAX_RETENTION_YEARS;
}

module.exports = {
  SENSITIVE_DATA_CATEGORIES,
  LEGAL_BASES,
  createProcessingRecord,
  isCompliantRetention,
};
