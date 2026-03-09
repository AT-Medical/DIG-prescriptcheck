# PrescriptCheck – System Architecture

## Overview

PrescriptCheck is a healthcare prescription validation platform built for
pharmacies, doctors, and patients in Austria and Germany. It provides secure,
HIPAA- and GDPR-compliant prescription management with real-time validation.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          Internet                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS (TLS 1.3)
                          ▼
                  ┌───────────────┐
                  │  Nginx / CDN  │  (Reverse Proxy, Rate Limiting)
                  └───────┬───────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
          ▼                               ▼
  ┌───────────────┐               ┌───────────────┐
  │   Frontend    │               │    Backend    │
  │  (React SPA)  │──── API ────▶│ (Express.js)  │
  │   Port: 80    │               │  Port: 3000   │
  └───────────────┘               └───────┬───────┘
                                          │
                          ┌───────────────┴───────────────┐
                          │                               │
                          ▼                               ▼
                  ┌───────────────┐               ┌───────────────┐
                  │   MongoDB     │               │  Audit Log    │
                  │  (Database)   │               │  (Database)   │
                  └───────────────┘               └───────────────┘
```

## Component Layers

### Frontend (React)
- Single-page application (SPA)
- Role-based UI components
- Real-time prescription validation forms
- QR code scanning and generation

### Backend (Express.js / Node.js)
- RESTful API
- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting and DDoS protection

### Database (MongoDB)
- Prescription records
- User accounts (hashed passwords)
- Pharmacy registry
- Encrypted patient data

### Security Layer
- AES-256-GCM encryption at rest
- TLS 1.3 in transit
- bcrypt password hashing (12 rounds)
- JWT tokens (HS256)
- Audit trail with HMAC-SHA256 integrity

### Compliance Layer
- GDPR: Data subject rights, consent management
- HIPAA: PHI protection, audit trails, access control
- DSGVO: German-specific requirements

## Technology Stack

| Layer       | Technology           | Version  |
|-------------|----------------------|----------|
| Frontend    | React                | 18.x     |
| Build       | Vite                 | 5.x      |
| Backend     | Node.js / Express    | 20.x / 4.x |
| Database    | MongoDB              | 7.x      |
| Auth        | JWT / Passport.js    | -        |
| Encryption  | Node.js crypto       | built-in |
| Container   | Docker               | 24.x     |
| Orchestration | Kubernetes         | 1.28+    |
| CI/CD       | GitHub Actions       | -        |
| Proxy       | Nginx                | 1.25+    |

## Data Flow: Prescription Validation

```
1. Doctor creates prescription → POST /api/prescriptions
2. Backend validates input (schema, business rules)
3. Prescription stored encrypted in MongoDB
4. QR code generated for prescription
5. Patient presents QR code at pharmacy
6. Pharmacist scans QR → GET /api/prescriptions/validate/:id
7. Backend validates prescription (expiry, status, authenticity)
8. Audit log entry created (HIPAA compliance)
9. Prescription marked as dispensed
```

## Security Architecture

- All data encrypted at rest (AES-256-GCM)
- All communication over TLS 1.3
- No PHI in application logs (masked/redacted)
- Audit trail tamper-protected with HMAC-SHA256
- Secrets managed via environment variables (never in code)
- Container runs as non-root user

## Deployment Architecture

- **Development**: Docker Compose (local)
- **Staging**: Single server (Hetzner Cloud)
- **Production**: Kubernetes cluster with 3+ replicas
- **CI/CD**: GitHub Actions with automated testing

See also: [DEPLOYMENT.md](DEPLOYMENT.md) | [SECURITY.md](SECURITY.md) | [API.md](API.md)
