/**
 * src/backend/utils/constants.js
 * Application-wide constants for PrescriptCheck
 */

'use strict';

const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
  PATIENT: 'patient',
  AUDITOR: 'auditor',
});

const PRESCRIPTION_STATUS = Object.freeze({
  PENDING: 'pending',
  VALIDATED: 'validated',
  DISPENSED: 'dispensed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
});

const PRESCRIPTION_TYPES = Object.freeze({
  STANDARD: 'standard',           // Kassenrezept
  PRIVATE: 'private',             // Privatrezept
  CONTROLLED: 'controlled',       // BTM-Rezept (Betäubungsmittel)
  FOREIGN: 'foreign',             // Auslandsrezept
  EMERGENCY: 'emergency',         // Notfallrezept
});

const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
});

const RATE_LIMITS = Object.freeze({
  AUTH: { windowMs: 15 * 60 * 1000, max: 10 },    // 10 login attempts per 15 min
  API: { windowMs: 15 * 60 * 1000, max: 100 },     // 100 API calls per 15 min
  PRESCRIPTION: { windowMs: 60 * 60 * 1000, max: 50 }, // 50 prescriptions per hour
});

module.exports = {
  USER_ROLES,
  PRESCRIPTION_STATUS,
  PRESCRIPTION_TYPES,
  HTTP_STATUS,
  RATE_LIMITS,
};
