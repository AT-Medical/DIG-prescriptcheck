/**
 * src/backend/middleware/validation.js
 * Request validation middleware for PrescriptCheck
 * Uses express-validator for input sanitization and validation
 */

'use strict';

const { validationResult } = require('express-validator');

/**
 * Checks validation results from express-validator chains
 * Returns 422 with field errors if validation fails
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: 'Validation failed',
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}

module.exports = { handleValidationErrors };
