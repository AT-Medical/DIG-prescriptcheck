# PrescriptCheck API Documentation

## Base URL

```
Production: https://prescriptcheck.atmedical.at/api
Staging:    https://staging.prescriptcheck.atmedical.at/api
Local:      http://localhost:3000/api
```

## Authentication

All API endpoints (except `/health` and `/auth/login`) require a valid JWT Bearer token.

```http
Authorization: Bearer <token>
```

## Endpoints

### Health

#### GET /health
Check API health status. No authentication required.

**Response 200:**
```json
{
  "status": "healthy",
  "service": "PrescriptCheck API",
  "timestamp": "2026-03-09T14:00:00.000Z",
  "version": "1.0.0"
}
```

---

### Authentication

#### POST /auth/login
Authenticate a user and receive JWT tokens.

**Request Body:**
```json
{
  "email": "doctor@hospital.de",
  "password": "SecurePassword123"
}
```

**Response 200:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "a1b2c3d4e5...",
  "expiresIn": 86400,
  "user": {
    "id": "user-123",
    "email": "doctor@hospital.de",
    "firstName": "Max",
    "lastName": "Mustermann",
    "role": "doctor"
  }
}
```

**Response 401:** Invalid credentials

#### POST /auth/refresh
Refresh an expired access token.

**Request Body:**
```json
{
  "refreshToken": "a1b2c3d4e5..."
}
```

#### POST /auth/logout
Invalidate the current session.

---

### Prescriptions

#### GET /prescriptions
List prescriptions (filtered by user role).

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 20, max: 100)
- `status` (string: pending|validated|dispensed|expired|cancelled|rejected)
- `type` (string: standard|private|controlled|foreign|emergency)

**Response 200:**
```json
{
  "data": [
    {
      "id": "rx-123",
      "prescriptionNumber": "1234567890",
      "prescriptionType": "standard",
      "issuedAt": "2026-03-09",
      "status": "pending",
      "medication": {
        "name": "Aspirin 500mg",
        "dosage": "500mg",
        "quantity": 30
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### POST /prescriptions
Create a new prescription. Requires `doctor` role.

**Request Body:**
```json
{
  "prescriptionNumber": "1234567890",
  "prescriptionType": "standard",
  "issuedAt": "2026-03-09",
  "medication": {
    "name": "Aspirin 500mg",
    "dosage": "500mg",
    "quantity": 30,
    "instructions": "Once daily after meals"
  },
  "patientId": "patient-456"
}
```

**Response 201:** Created prescription object

#### GET /prescriptions/:id
Get a prescription by ID.

#### PUT /prescriptions/:id
Update a prescription. Requires `doctor` or `admin` role.

#### GET /prescriptions/validate/:prescriptionNumber
Validate a prescription (used by pharmacists).

**Response 200:**
```json
{
  "valid": true,
  "prescriptionNumber": "1234567890",
  "checkedAt": "2026-03-09T14:30:00.000Z",
  "status": "pending",
  "expiresAt": "2026-06-09"
}
```

**Response 200 (invalid):**
```json
{
  "valid": false,
  "prescriptionNumber": "1234567890",
  "checkedAt": "2026-03-09T14:30:00.000Z",
  "errors": [
    { "code": "EXPIRED", "message": "Prescription has expired" }
  ]
}
```

---

### Users

#### GET /users/profile
Get current user's profile.

#### PUT /users/profile
Update current user's profile.

#### GET /users (admin only)
List all users.

---

### Pharmacies

#### GET /pharmacies
List registered pharmacies.

#### POST /pharmacies (admin only)
Register a new pharmacy.

#### GET /pharmacies/:id
Get pharmacy details.

#### PUT /pharmacies/:id (admin only)
Update pharmacy information.

---

### Audit

#### GET /audit (admin/auditor only)
Retrieve audit log entries.

**Query Parameters:**
- `userId` - Filter by user
- `action` - Filter by action type
- `from` - Start date (ISO 8601)
- `to` - End date (ISO 8601)
- `page`, `limit`

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Human-readable error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

| Status | Description               |
|--------|---------------------------|
| 400    | Bad Request               |
| 401    | Unauthorized              |
| 403    | Forbidden                 |
| 404    | Not Found                 |
| 422    | Validation Error          |
| 429    | Too Many Requests         |
| 500    | Internal Server Error     |

## Rate Limits

| Endpoint      | Limit               |
|---------------|---------------------|
| /auth/login   | 10 requests / 15min |
| /api/*        | 100 requests / 15min|
| /prescriptions| 50 requests / hour  |
