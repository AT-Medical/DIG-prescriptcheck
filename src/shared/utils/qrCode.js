/**
 * src/shared/utils/qrCode.js
 * QR code utilities for prescription handling
 * Generates and parses QR code data for PrescriptCheck
 */

/**
 * Generates QR code payload for a prescription
 * @param {Object} prescription - Prescription object
 * @returns {string} JSON string to encode in QR code
 */
export function generateQRPayload(prescription) {
  const payload = {
    v: '1',                                    // Version
    n: prescription.prescriptionNumber,
    t: prescription.prescriptionType,
    i: prescription.issuedAt,
    d: prescription.doctorId,
  };
  return JSON.stringify(payload);
}

/**
 * Parses and validates a QR code payload
 * @param {string} qrData - Raw QR code string
 * @returns {{ valid: boolean, data: Object|null, error: string|null }}
 */
export function parseQRPayload(qrData) {
  try {
    const data = JSON.parse(qrData);
    if (!data.v || !data.n || !data.t || !data.i) {
      return { valid: false, data: null, error: 'Invalid QR code format' };
    }
    return { valid: true, data, error: null };
  } catch {
    return { valid: false, data: null, error: 'QR code is not valid JSON' };
  }
}
