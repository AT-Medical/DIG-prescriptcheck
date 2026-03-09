/**
 * src/shared/types/prescription.ts
 * TypeScript type definitions for Prescription entities
 */

export type PrescriptionType = 'standard' | 'private' | 'controlled' | 'foreign' | 'emergency';

export type PrescriptionStatus =
  | 'pending'
  | 'validated'
  | 'dispensed'
  | 'expired'
  | 'cancelled'
  | 'rejected';

export interface Medication {
  name: string;
  dosage: string;
  quantity?: number;
  instructions?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  prescriptionType: PrescriptionType;
  issuedAt: string;        // ISO 8601 date string
  expiresAt?: string;
  medication: Medication;
  doctorId: string;
  patientId?: string;      // May be anonymized per GDPR
  pharmacyId?: string;
  status: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionValidationResult {
  valid: boolean;
  prescriptionNumber: string;
  checkedAt: string;
  status?: PrescriptionStatus;
  expiresAt?: string;
  errors?: Array<{ code: string; message: string }>;
}

export interface CreatePrescriptionInput {
  prescriptionNumber: string;
  prescriptionType: PrescriptionType;
  issuedAt: string;
  medication: Medication;
  doctorId: string;
  patientId?: string;
}
