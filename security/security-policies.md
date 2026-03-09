# PrescriptCheck Security Policies

## Access Control Policy

### Role-Based Access Control (RBAC)

| Role         | Access Level | Permissions                                |
|--------------|--------------|---------------------------------------------|
| `admin`      | Full         | All operations, user management, audit logs |
| `doctor`     | Write        | Create/manage own prescriptions             |
| `pharmacist` | Read/Update  | Validate, dispense prescriptions            |
| `patient`    | Read         | View own prescriptions only                 |
| `auditor`    | Read         | Read-only access to audit logs              |

### Authentication Requirements

- **Minimum password length**: 8 characters
- **Password complexity**: Uppercase, lowercase, numbers required
- **Password hashing**: bcrypt, 12 rounds
- **Session timeout**: 30 minutes inactivity
- **Token expiry**: Access tokens 24h, refresh tokens 7 days
- **Two-factor authentication**: Mandatory for admin and doctor roles in production

---

## Encryption Policy

### Data at Rest
- Algorithm: AES-256-GCM
- Key management: Environment variables (never in code)
- Key rotation: Annually or after suspected compromise

### Data in Transit
- Protocol: TLS 1.3 minimum
- Certificate: Let's Encrypt / commercial CA
- HSTS: Enabled with 1-year max-age

---

## Secret Management

### Prohibited Practices
- ❌ Hardcoding secrets in source code
- ❌ Committing `.env` files with real values
- ❌ Using the same secrets across environments
- ❌ Using weak or short JWT secrets

### Required Practices
- ✅ Use environment variables for all secrets
- ✅ Minimum JWT_SECRET length: 64 bytes (512 bits)
- ✅ Rotate secrets after team member offboarding
- ✅ Use different secrets for development/staging/production

---

## Vulnerability Management

### Dependency Scanning
- Automated `npm audit` on every CI run
- Weekly automated dependency audit
- Critical vulnerabilities must be patched within 24 hours
- High vulnerabilities must be patched within 7 days

### Code Review
- All code requires review before merge
- Security-sensitive files require explicit approval (see CODEOWNERS)
- No force pushes to `main` branch

---

## Incident Response

See [incident-response.md](incident-response.md) for detailed procedures.

**Emergency contacts:**
- Security issues: See [SECURITY.md](../SECURITY.md)
- Report a vulnerability: security@atmedical.at

---

*Last updated: March 2026*
