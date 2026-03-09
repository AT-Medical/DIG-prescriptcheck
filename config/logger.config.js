/**
 * config/logger.config.js
 * Logging configuration for PrescriptCheck
 * HIPAA-compliant structured logging
 */

'use strict';

module.exports = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  service: 'prescriptcheck',
  
  // Sensitive fields that must be redacted from logs
  redactedFields: [
    'password',
    'passwordHash',
    'token',
    'refreshToken',
    'authorizationHeader',
    'x-api-key',
    'ssn',
    'dateOfBirth',
    'creditCard',
  ],

  // HTTP request logging configuration
  http: {
    enabled: true,
    format: ':method :url :status :res[content-length] - :response-time ms',
    // Paths to exclude from request logging (health checks, etc.)
    excludePaths: ['/api/health', '/favicon.ico'],
  },

  // Audit log configuration (separate from application logs)
  audit: {
    enabled: true,
    destination: process.env.AUDIT_LOG_DESTINATION || 'database',
    // file: 'logs/audit.log', // Alternative: file destination
  },

  // Error notification
  errorNotification: {
    enabled: process.env.ERROR_NOTIFICATION_ENABLED === 'true',
    email: process.env.ERROR_NOTIFICATION_EMAIL || '',
  },
};
