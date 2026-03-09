/**
 * src/shared/utils/validators.js
 * Shared validation utilities usable by both frontend and backend
 */

/**
 * Validates a prescription number (10 digits)
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPrescriptionNumber(value) {
  return typeof value === 'string' && /^\d{10}$/.test(value);
}

/**
 * Validates an email address
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a German/Austrian postal code (5 digits AT/DE)
 * @param {string} postalCode
 * @returns {boolean}
 */
export function isValidPostalCode(postalCode) {
  return typeof postalCode === 'string' && /^\d{4,5}$/.test(postalCode);
}

/**
 * Checks if a prescription has expired based on issue date
 * @param {string|Date} issuedAt - ISO date string or Date object
 * @param {number} validityDays - Default 92 (approx 3 months)
 * @returns {boolean} True if NOT expired
 */
export function isPrescriptionValid(issuedAt, validityDays = 92) {
  const issueDate = new Date(issuedAt);
  const expiry = new Date(issueDate);
  expiry.setDate(expiry.getDate() + validityDays);
  return new Date() <= expiry;
}

/**
 * Validates password strength (min 8 chars, mixed case, number)
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
}
