# Changelog – DIG-prescriptcheck

All notable changes to this project will be documented in this file.  
Format based on [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

---

## [0.9.0] – 2026-03-16
### Added
- Enterprise repository standardization (AT Medical Enterprise Repository Standard)
- `metadata/repository-profile.yml` — canonical repository metadata
- `metadata/tags/` — global tagging taxonomy, rules, examples and file registry
- Enterprise directory structure: `configs/`, `status/`, `templates/`, `artifacts/`
- `.github/workflows/file-tagging.yml` — automated tag validation workflow
- `.github/workflows/ci-validation.yml` — CI structure validation
- `.github/workflows/governance-check.yml` — governance compliance check
- `.github/workflows/tag-validation.yml` — standalone tag validation
- `.github/workflows/dependency-check.yml` — dependency health check
- `.github/workflows/cleanup-weekly.yml` — weekly cleanup automation
- `.github/workflows/repository-selfcheck.yml` — repository health check
- `.github/dependabot.yml` — automated dependency updates
- `scripts/validate/repository-selfcheck.sh` — repository self-check script
- Enterprise verification blocks in all documentation files
- Artifact intake directories (`artifacts/incoming`, `artifacts/staged`, `artifacts/releases`)

### Changed
- `README.md` — enterprise badges and verification block added
- `CONTRIBUTING.md` — enterprise verification block added
- `SECURITY.md` — enterprise verification block added
- `CODE_OF_CONDUCT.md` — enterprise verification block added

---


## [0.2.0] – 2025-05-XX
### Added
- Videosprechstunde integriert
- Export verschlüsselter Prüfberichte

## [0.1.0] – 2025-05-14
### Initial Release
- Rezeptvalidierung, Apothekenportal, Lizenzsystem
