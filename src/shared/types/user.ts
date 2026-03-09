/**
 * src/shared/types/user.ts
 * TypeScript type definitions for User entities
 */

export type UserRole = 'admin' | 'doctor' | 'pharmacist' | 'patient' | 'auditor';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserPublicProfile {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserPublicProfile;
  expiresIn: number;
}
