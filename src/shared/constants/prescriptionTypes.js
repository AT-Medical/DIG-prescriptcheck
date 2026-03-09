/**
 * src/shared/constants/prescriptionTypes.js
 * Shared prescription type constants used by both frontend and backend
 */

'use strict';

const PRESCRIPTION_TYPES = Object.freeze({
  STANDARD: {
    code: 'standard',
    label: 'Kassenrezept',
    labelEN: 'Standard Prescription',
    validityDays: 92,
    color: '#2196F3',
  },
  PRIVATE: {
    code: 'private',
    label: 'Privatrezept',
    labelEN: 'Private Prescription',
    validityDays: 92,
    color: '#9C27B0',
  },
  CONTROLLED: {
    code: 'controlled',
    label: 'BTM-Rezept',
    labelEN: 'Controlled Substance Prescription',
    validityDays: 7,
    color: '#F44336',
    requiresSpecialHandling: true,
  },
  FOREIGN: {
    code: 'foreign',
    label: 'Auslandsrezept',
    labelEN: 'Foreign Prescription',
    validityDays: 92,
    color: '#FF9800',
  },
  EMERGENCY: {
    code: 'emergency',
    label: 'Notfallrezept',
    labelEN: 'Emergency Prescription',
    validityDays: 3,
    color: '#F44336',
    requiresUrgentProcessing: true,
  },
});

const PRESCRIPTION_STATUS = Object.freeze({
  PENDING: { code: 'pending', label: 'Ausstehend', labelEN: 'Pending' },
  VALIDATED: { code: 'validated', label: 'Validiert', labelEN: 'Validated' },
  DISPENSED: { code: 'dispensed', label: 'Ausgegeben', labelEN: 'Dispensed' },
  EXPIRED: { code: 'expired', label: 'Abgelaufen', labelEN: 'Expired' },
  CANCELLED: { code: 'cancelled', label: 'Storniert', labelEN: 'Cancelled' },
  REJECTED: { code: 'rejected', label: 'Abgelehnt', labelEN: 'Rejected' },
});

module.exports = { PRESCRIPTION_TYPES, PRESCRIPTION_STATUS };
