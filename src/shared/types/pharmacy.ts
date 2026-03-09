/**
 * src/shared/types/pharmacy.ts
 * TypeScript type definitions for Pharmacy entities
 */

export interface PharmacyAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PharmacyOpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Pharmacy {
  id: string;
  pharmacyId: string;          // Registration number e.g. "AT123456"
  name: string;
  address: PharmacyAddress;
  phone?: string;
  email?: string;
  openingHours?: PharmacyOpeningHours;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePharmacyInput {
  pharmacyId: string;
  name: string;
  address: PharmacyAddress;
  phone?: string;
  email?: string;
}
