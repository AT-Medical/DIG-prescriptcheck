/**
 * src/backend/utils/formatters.js
 * Data formatting utilities for PrescriptCheck
 */

'use strict';

/**
 * Formats a date as a localized German date string
 * @param {Date|string} date
 * @returns {string} e.g., "09.03.2026"
 */
function formatDateDE(date) {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formats a date as ISO 8601 string (YYYY-MM-DD)
 * @param {Date|string} date
 * @returns {string}
 */
function formatDateISO(date) {
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Masks personal data for safe logging (GDPR compliance)
 * @param {string} value - Value to mask
 * @param {number} visibleChars - Number of visible characters at start
 * @returns {string}
 */
function maskPersonalData(value, visibleChars = 3) {
  if (!value || typeof value !== 'string') return '[MASKED]';
  return value.slice(0, visibleChars) + '*'.repeat(Math.max(0, value.length - visibleChars));
}

/**
 * Formats a prescription number for display
 * @param {string} prescriptionNumber - 10-digit number
 * @returns {string} e.g., "123-456-7890"
 */
function formatPrescriptionNumber(prescriptionNumber) {
  if (!prescriptionNumber || prescriptionNumber.length !== 10) {
    return prescriptionNumber;
  }
  return `${prescriptionNumber.slice(0, 3)}-${prescriptionNumber.slice(3, 6)}-${prescriptionNumber.slice(6)}`;
}

/**
 * Removes sensitive fields from an object for safe API responses
 * @param {Object} obj - Object to sanitize
 * @param {string[]} fields - Fields to remove
 * @returns {Object}
 */
function sanitizeResponse(obj, fields = ['password', 'passwordHash', '__v']) {
  const result = { ...obj };
  fields.forEach((field) => delete result[field]);
  return result;
}

module.exports = {
  formatDateDE,
  formatDateISO,
  maskPersonalData,
  formatPrescriptionNumber,
  sanitizeResponse,
};
