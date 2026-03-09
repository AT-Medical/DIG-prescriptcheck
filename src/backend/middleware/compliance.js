/**
 * src/backend/middleware/compliance.js
 * Healthcare compliance middleware for PrescriptCheck
 * Adds required headers and enforces data handling policies
 */

'use strict';

/**
 * Adds compliance-related response headers
 * Required for HIPAA and GDPR compliance
 */
function complianceHeaders(req, res, next) {
  // Prevent caching of sensitive patient data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // HIPAA audit context
  res.setHeader('X-Request-ID', req.headers['x-request-id'] || generateRequestId());
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  next();
}

/**
 * Generates a simple unique request identifier for audit trails
 */
function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Middleware to enforce HTTPS in production
 */
function requireHttps(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect(301, `https://${req.headers.host}${req.url}`);
}

module.exports = { complianceHeaders, requireHttps };
