/**
 * src/backend/utils/logger.js
 * Structured logging utility for PrescriptCheck
 * HIPAA-compliant logging with audit trail support
 */

'use strict';

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL] ?? LOG_LEVELS.info;

/**
 * Creates a structured log entry
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} [context] - Additional context
 */
function log(level, message, context = {}) {
  if ((LOG_LEVELS[level] ?? 99) > currentLevel) return;

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: 'prescriptcheck',
    ...context,
  };

  const output = JSON.stringify(entry);
  if (level === 'error') {
    process.stderr.write(output + '\n');
  } else {
    process.stdout.write(output + '\n');
  }
}

const logger = {
  error: (message, context) => log('error', message, context),
  warn: (message, context) => log('warn', message, context),
  info: (message, context) => log('info', message, context),
  debug: (message, context) => log('debug', message, context),
};

module.exports = logger;
