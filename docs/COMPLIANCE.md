# PrescriptCheck – Compliance Documentation

## Healthcare Compliance Overview

PrescriptCheck is designed and operated in compliance with applicable healthcare
data protection regulations across the EU and Austria/Germany.

---

## GDPR Compliance (EU General Data Protection Regulation)

### Legal Basis for Processing

| Processing Activity           | Legal Basis (GDPR Art. 6)     |
|-------------------------------|-------------------------------|
| User authentication           | Contract (Art. 6(1)(b))       |
| Prescription management       | Legal obligation (Art. 6(1)(c)) |
| Audit logging                 | Legal obligation (Art. 6(1)(c)) |
| Service improvement           | Legitimate interests (Art. 6(1)(f)) |

### Data Subject Rights

| Right                | Implementation                              |
|----------------------|---------------------------------------------|
| Right of Access      | `GET /api/users/export` – full data export  |
| Right to Rectification | `PUT /api/users/profile` – update data    |
| Right to Erasure     | `DELETE /api/users/data` – anonymization    |
| Data Portability     | JSON export in machine-readable format       |
| Right to Object      | Contact data protection officer             |

### Data Retention

| Data Type              | Retention Period | Legal Basis    |
|------------------------|------------------|----------------|
| Prescription records   | 10 years         | §630f BGB      |
| Audit logs             | 7 years          | §238 HGB       |
| User accounts          | Until deletion   | GDPR Art. 17   |
| Session tokens         | 24 hours         | Technical      |

### Data Minimization

- Only collect data necessary for prescription validation
- Patient IDs are pseudonymized in audit logs
- Sensitive fields masked in application logs
- No tracking cookies or analytics without consent

---

## HIPAA Compliance

### Administrative Safeguards
- Role-based access control (RBAC) with least privilege
- Employee training documentation
- Security incident response procedures
- Regular security risk assessments

### Physical Safeguards
- Server hosted in EU datacenter with physical security
- No patient data on personal devices
- Encrypted storage volumes

### Technical Safeguards

| Requirement                    | Implementation                          |
|--------------------------------|-----------------------------------------|
| Access Control                 | JWT + RBAC (Admin, Doctor, Pharmacist)  |
| Audit Controls                 | Tamper-proof audit trail (HMAC-SHA256)  |
| Integrity Controls             | Encryption + checksums                  |
| Transmission Security          | TLS 1.3 for all communications          |
| Emergency Access Procedures    | Admin override with mandatory logging   |

### PHI (Protected Health Information) Handling

PHI fields that receive special protection:
- Patient name, address, date of birth
- Medical record numbers, prescription numbers
- Email addresses, phone numbers
- Biometric identifiers

All PHI is:
- Encrypted at rest (AES-256-GCM)
- Encrypted in transit (TLS 1.3)
- Never included in plaintext logs
- Access-controlled per HIPAA Minimum Necessary Standard

---

## DSGVO Compliance (German GDPR Implementation)

### Verzeichnis von Verarbeitungstätigkeiten (Art. 30)

A processing activities record is maintained and includes:
- Purpose of processing
- Categories of data subjects
- Data categories
- Recipients
- Third-country transfers (none)
- Retention periods

### Datenschutz durch Technikgestaltung (Art. 25)

Privacy by Design implemented through:
- Encryption by default
- Pseudonymization of patient identifiers
- Data minimization in all API responses
- Purpose limitation in data access controls

### Meldepflicht bei Datenpannen (Art. 33)

In case of a data breach:
1. Assess severity within 24 hours
2. Notify supervisory authority within 72 hours (if required)
3. Notify affected individuals (if high risk)
4. Document incident in breach register

Contact: See [SECURITY.md](../SECURITY.md)

---

## Audit Trail

All significant actions are logged to a tamper-protected audit trail:

- Tamper detection via HMAC-SHA256 integrity hashes
- Stored in dedicated audit collection
- Retained for 7 years minimum
- Exportable for regulatory inspections

### Audited Actions

- Authentication events (login, logout, failed attempts)
- Prescription lifecycle (create, view, validate, dispense, cancel)
- User management (create, update, deactivate)
- Data access (export, deletion requests)
- Consent changes

---

## Security Certifications and Reviews

| Review Type       | Frequency  | Responsible        |
|-------------------|------------|--------------------|
| Code security scan | Every PR  | GitHub Actions     |
| Dependency audit  | Weekly     | Automated (npm)    |
| Penetration test  | Annually   | External auditor   |
| GDPR audit        | Annually   | Data Protection Officer |

---

*Last reviewed: March 2026*
*Next review: March 2027*
