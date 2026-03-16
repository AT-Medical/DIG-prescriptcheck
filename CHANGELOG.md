# Changelog – PrescriptCheck

All notable changes to this project are documented in this file.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Enterprise metadata: `metadata/repository-profile.yml` with ATMED governance tags
- `LICENSE` root file referencing `LICENSE_COMMERCIAL.md`
- `.github/dependabot.yml` for automated dependency security updates
- Additional governance workflows: governance-check, tagging-validation, repo-self-check, safe-cleanup, dependency-scan
- `configs/` and `artifacts/` directory markers for CI/CD pipeline standardization
- `.gitignore` rule excluding build artifacts from `artifacts/` while keeping `README.md` marker
- `Abschlussbericht_PrescriptCheck.md` – project completion report

### Changed
- `README.md`: fixed malformed security badge URL; aligned env template filename to `.env.example`
- `CODEOWNERS`: complete team-based ownership with security and compliance coverage
- `CHANGELOG.md`: updated to enterprise Keep-a-Changelog format
- `audit.yml`: uses `working-directory`, `npm ci`, and `setup-node` npm caching (consistent with `ci.yml`)

---

## [0.2.0] – 2025-05-XX

### Added
- Videosprechstunde integriert
- Export verschlüsselter Prüfberichte

---

## [0.1.0] – 2025-05-14

### Added
- Initiales Release: Rezeptvalidierung, Apothekenportal, Lizenzsystem

