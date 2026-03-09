/**
 * src/backend/middleware/errorHandler.js
 * Centralized error handling middleware for PrescriptCheck
 */

'use strict';

/**
 * Global Express error handler
 * Must be registered last with app.use()
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode || 500;
  const isClientError = status < 500;

  if (!isClientError) {
    console.error('[ERROR]', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      url: req.url,
      method: req.method,
      user: req.user ? req.user.id : 'unauthenticated',
    });
  }

  res.status(status).json({
    error: isClientError ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * Handler for unmatched routes
 */
function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}

module.exports = { errorHandler, notFoundHandler };
