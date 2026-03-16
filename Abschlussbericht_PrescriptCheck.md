# Abschlussbericht – PrescriptCheck

**Erstellt von:** AT Medical GmbH  
**Datum:** 2026-03-16  
**Version:** 0.9.0  
**Klassifizierung:** Intern – Vertraulich  

---

## 1. Projektzusammenfassung

PrescriptCheck ist eine digitale Plattform zur Validierung von Privatrezepten in Deutschland. Das System ermöglicht Apotheken und autorisierten Vertragspartnern, die Echtheit und Gültigkeit eines Rezepts zu prüfen – datenschutzkonform, revisionssicher und praxisnah.

Das Projekt wurde im Rahmen einer internen Produktentwicklung durch AT Medical GmbH realisiert und befindet sich in der Vorproduktionsphase (Version 0.9.0).

---

## 2. Projektziele

| Ziel | Status |
|---|---|
| Digitale Rezeptvalidierung via QR-Code und Seriennummer | ✅ Umgesetzt |
| Statusverwaltung (gültig, eingelöst, gesperrt, abgelaufen) | ✅ Umgesetzt |
| PDF417-Barcode-Generierung und Validierung | ✅ Umgesetzt |
| Apothekenprüfung mit Echtzeit-Statusabfrage | ✅ Umgesetzt |
| Benutzerrollen: Arzt, Apotheke, Admin | ✅ Umgesetzt |
| Lizenz- und Zahlungsabwicklung (Stripe, PayPal, Klarna) | ✅ Umgesetzt |
| Telemedizin-Modul (Videoberatung) | ✅ Umgesetzt |
| SCORM-kompatible Lernmodule für Fachpersonal | ✅ Umgesetzt |
| Mehrsprachige Oberfläche | ✅ Umgesetzt |
| PM2- und Docker-Deployment | ✅ Umgesetzt |
| GitHub Actions CI/CD Workflows | ✅ Umgesetzt |
| Enterprise-Governance und Repository-Metadaten | ✅ Umgesetzt |

---

## 3. Technische Architektur

### 3.1 Backend

- **Laufzeit:** Node.js (Express.js)
- **Datenbank:** MongoDB (Mongoose ODM)
- **Authentifizierung:** JWT + Zwei-Faktor-Authentifizierung (2FA)
- **Verschlüsselung:** AES-256 für PDF417-Barcodes
- **Zahlungsintegration:** Stripe, PayPal, Klarna
- **E-Mail:** SMTP (konfigurierbar)
- **Prozessmanagement:** PM2

### 3.2 Frontend

- **Framework:** Vue 3 (Vite Build-System)
- **Mehrsprachigkeit:** i18n-Integration
- **Responsives Design:** Mobile-first

### 3.3 Infrastruktur

- **Deployment:** VPS (PM2) und Cloudflare R2 für Assets
- **Containerisierung:** Docker / Docker Compose
- **CI/CD:** GitHub Actions
- **SSL:** Certbot (Let's Encrypt)
- **Reverse Proxy:** nginx

---

## 4. Sicherheits- und Datenschutzmaßnahmen

PrescriptCheck wurde nach dem Prinzip „Security by Design" und „Privacy by Default" entwickelt:

- Kein Speichern personenbezogener Daten ohne Notwendigkeit
- AES-verschlüsselte PDF417-Barcodes auf Rezepten
- Passwortrichtlinien mit Mindestkomplexität und Validierung
- Vollständige Trennung zwischen Arzt- und Apothekenbereich
- Rezeptvalidierung ausschließlich über eindeutige Signatur & Zeitstempel
- Zwei-Faktor-Authentifizierung (2FA) für privilegierte Accounts
- DSFA-konforme Risikobewertung dokumentiert
- Logging & Audit-Tracking für alle sensiblen Aktionen

### 4.1 Sicherheitsklassifizierung

| Kriterium | Bewertung |
|---|---|
| Datenschutzkritikalität | Hoch |
| Zugriffsbeschränkung | Ja – lizenzierte Partner |
| Verschlüsselung at-rest | Ja |
| Verschlüsselung in-transit | Ja (TLS) |
| Sicherheitsaudits | Wöchentlich (npm audit) |

---

## 5. Governance und Repository-Struktur

Im Rahmen der Enterprise-Standardisierung wurden folgende Maßnahmen umgesetzt:

- `metadata/repository-profile.yml`: ATMED Repository-Profil mit Tagging, Ownership und Governance-Metadaten
- `CODEOWNERS`: Vollständige Zuweisung nach Teams (admin, devops, security, infrastructure)
- `.github/dependabot.yml`: Automatische Abhängigkeitsprüfung (npm + GitHub Actions)
- Governance-Workflows: `governance.yml`, `tagging-validation.yml`, `repo-self-check.yml`, `safe-cleanup.yml`, `dependency-scan.yml`
- `LICENSE`: Root-Lizenzdatei (verweist auf `LICENSE_COMMERCIAL.md`)
- `CHANGELOG.md`: Enterprise Keep-a-Changelog Format

---

## 6. CI/CD Workflow-Übersicht

| Workflow | Trigger | Zweck |
|---|---|---|
| `ci.yml` | Push/PR auf `main` | Build & Test (Backend + Frontend) |
| `release.yml` | Tag `v*.*.*` | GitHub Release erstellen |
| `docker.yml` | Push auf `main` | Docker Image bauen & pushen |
| `deploy.yml` | Push auf `main` | SSH-Deployment auf VPS |
| `audit.yml` | Wöchentlich (Mo) | npm security audit |
| `security-scan.yml` | Push/PR | Sicherheits-Scan |
| `compliance-check.yml` | Geplant | Compliance-Prüfung |
| `governance.yml` | Push/PR/Wöchentlich | Governance-Validierung |
| `tagging-validation.yml` | Tag-Push | Semver-Tag-Prüfung |
| `repo-self-check.yml` | Wöchentlich (Mo) | Repository-Gesundheitscheck |
| `safe-cleanup.yml` | Wöchentlich (So) | Bereinigung alter Artefakte |
| `dependency-scan.yml` | Push/PR/Wöchentlich | Abhängigkeits-Security-Scan |

---

## 7. Offene Punkte und nächste Schritte

| Aufgabe | Priorität | Zieldatum |
|---|---|---|
| Produktionsfreigabe v1.0.0 | Hoch | Q2 2026 |
| Externe Sicherheitsprüfung (Penetrationstest) | Hoch | Q2 2026 |
| DSFA-Abschlusskommunikation mit Datenschutzbeauftragtem | Mittel | Q2 2026 |
| Mehrsprachigkeit vervollständigen (EN, FR) | Mittel | Q3 2026 |
| Zertifizierung nach MDR/DiGA prüfen | Hoch | Q3 2026 |
| Aufbau eines Kundensupport-Portals | Niedrig | Q4 2026 |

---

## 8. Verantwortlichkeiten

| Rolle | Person / Team |
|---|---|
| Projektleitung | Dr. Andreas Tremml |
| Entwicklung & DevOps | AT-Medical/devops-team |
| Sicherheit & Compliance | AT-Medical/security-team |
| Infrastruktur | AT-Medical/infrastructure-team |
| Gesamtverantwortung | AT-Medical/admin-team |

---

## 9. Kontakt

**AT Medical GmbH**  
E-Mail: support@at-medical.de  
Web: [www.at-medical.de](https://www.at-medical.de)

---

*Dieses Dokument ist vertraulich und ausschließlich für den internen Gebrauch durch AT Medical GmbH und autorisierte Vertragspartner bestimmt.*
