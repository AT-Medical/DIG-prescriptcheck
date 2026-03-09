/**
 * src/shared/utils/formatters.js
 * Shared formatting utilities for frontend and backend
 */

/**
 * Formats a date in German locale
 * @param {string|Date} date
 * @returns {string} e.g., "09.03.2026"
 */
export function formatDateDE(date) {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formats a prescription number for display
 * @param {string} num - 10-digit number
 * @returns {string} e.g., "123-456-7890"
 */
export function formatPrescriptionNumber(num) {
  if (!num || num.length !== 10) return num;
  return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
}

/**
 * Returns a localized prescription type label
 * @param {string} type - Prescription type code
 * @param {'de'|'en'} lang - Language
 * @returns {string}
 */
export function getPrescriptionTypeLabel(type, lang = 'de') {
  const labels = {
    standard: { de: 'Kassenrezept', en: 'Standard' },
    private: { de: 'Privatrezept', en: 'Private' },
    controlled: { de: 'BTM-Rezept', en: 'Controlled' },
    foreign: { de: 'Auslandsrezept', en: 'Foreign' },
    emergency: { de: 'Notfallrezept', en: 'Emergency' },
  };
  return labels[type]?.[lang] || type;
}
