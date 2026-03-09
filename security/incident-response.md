# PrescriptCheck – Incident Response Plan

## Overview

This document outlines the procedure for responding to security incidents
affecting the PrescriptCheck platform.

## Severity Levels

| Level    | Description                                      | Response Time |
|----------|--------------------------------------------------|---------------|
| Critical | Data breach, system compromise, PHI exposed      | Immediate     |
| High     | Unauthorized access, credential compromise        | 1 hour        |
| Medium   | Suspicious activity, failed attack attempt        | 4 hours       |
| Low      | Policy violation, minor misconfiguration          | 24 hours      |

## Response Procedure

### 1. Detection and Identification (0-1 hour)

- Identify the incident source (audit logs, monitoring alerts)
- Determine scope: systems affected, data involved
- Assign severity level
- Notify incident response team

### 2. Containment (1-4 hours)

- Isolate affected systems if necessary
- Revoke compromised credentials
- Enable additional logging
- Preserve evidence (logs, system state)

### 3. Eradication (4-24 hours)

- Remove malicious access or code
- Patch vulnerabilities
- Reset compromised credentials
- Verify system integrity

### 4. Recovery (24-72 hours)

- Restore systems from verified backups if needed
- Monitor for signs of re-compromise
- Test system functionality
- Gradually restore normal operations

### 5. Post-Incident Review (Within 1 week)

- Document what happened and timeline
- Root cause analysis
- Lessons learned
- Update security policies and procedures

## Regulatory Notification Requirements

### GDPR/DSGVO (Art. 33)
- Notify supervisory authority within **72 hours** if personal data breach
- Austrian authority: DSB (Datenschutzbehörde) – dsb.gv.at

### HIPAA
- Notify affected individuals within **60 days**
- Notify HHS (if applicable)

## Contact Information

- Security Team: security@atmedical.at
- Supervisory Authority: dsb.gv.at

---

*Last updated: March 2026*
