/**
 * src/backend/utils/validators.js
 * Input validation utilities for PrescriptCheck
 * Healthcare-specific validation rules
 */

'use strict';

/**
 * Validates a German prescription number (Rezeptnummer)
 * Format: 10-digit numeric string
 * @param {string} prescriptionNumber
 * @returns {boolean}
 */
function isValidPrescriptionNumber(prescriptionNumber) {
  return typeof prescriptionNumber === 'string' &&
    /^\d{10}$/.test(prescriptionNumber);
}

/**
 * Validates a German pharmacy registration number (Apothekenregistriernummer)
 * @param {string} pharmacyId
 * @returns {boolean}
 */
function isValidPharmacyId(pharmacyId) {
  return typeof pharmacyId === 'string' && /^[A-Z]{2}\d{6}$/.test(pharmacyId);
}

/**
 * Validates a medication dosage string
 * @param {string} dosage - e.g., "500mg", "2.5ml", "10 IU"
 * @returns {boolean}
 */
function isValidDosage(dosage) {
  return typeof dosage === 'string' &&
    /^\d+(\.\d+)?\s?(mg|ml|g|IU|µg|mcg|units?)$/i.test(dosage.trim());
}

/**
 * Validates an email address
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
}

/**
 * Validates that a date string is a valid ISO 8601 date
 * @param {string} dateString
 * @returns {boolean}
 */
function isValidISODate(dateString) {
  if (typeof dateString !== 'string') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

/**
 * Checks if a prescription is within its validity period
 * German prescriptions are typically valid for 3 months
 * @param {Date} issueDate - When the prescription was issued
 * @param {number} validityDays - Validity period in days (default: 92)
 * @returns {boolean}
 */
function isPrescriptionValid(issueDate, validityDays = 92) {
  const expiry = new Date(issueDate);
  expiry.setDate(expiry.getDate() + validityDays);
  return new Date() <= expiry;
}

module.exports = {
  isValidPrescriptionNumber,
  isValidPharmacyId,
  isValidDosage,
  isValidEmail,
  isValidISODate,
  isPrescriptionValid,
};
