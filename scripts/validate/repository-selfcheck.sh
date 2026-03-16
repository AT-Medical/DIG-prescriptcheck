#!/usr/bin/env bash
# AT Medical Enterprise - Repository Self Check Script
# Repository: DIG-prescriptcheck
# Version: 0.9.0

set -euo pipefail

ENTERPRISE_VERSION="0.9.0"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REPORT_FILE="$REPO_ROOT/status/generated/selfcheck-report.txt"
PASS=0
WARN=0
FAIL=0

mkdir -p "$REPO_ROOT/status/generated"

{
echo "======================================"
echo " AT Medical - Repository Self Check"
echo " Repository: DIG-prescriptcheck"
echo " Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "======================================"
echo ""

check_pass() { echo "[PASS] $1"; PASS=$((PASS + 1)); }
check_warn() { echo "[WARN] $1"; WARN=$((WARN + 1)); }
check_fail() { echo "[FAIL] $1"; FAIL=$((FAIL + 1)); }

echo "--- Structure Completeness ---"
for f in README.md CONTRIBUTING.md SECURITY.md CODE_OF_CONDUCT.md CHANGELOG.md; do
  [ -f "$REPO_ROOT/$f" ] && check_pass "$f exists" || check_fail "$f missing"
done

echo ""
echo "--- Metadata Presence ---"
[ -f "$REPO_ROOT/metadata/repository-profile.yml" ] && check_pass "repository-profile.yml" || check_fail "repository-profile.yml missing"
for tf in taxonomy.yml rules.yml examples.yml file-tags.yml; do
  [ -f "$REPO_ROOT/metadata/tags/$tf" ] && check_pass "metadata/tags/$tf" || check_warn "metadata/tags/$tf missing"
done

echo ""
echo "--- Workflow References ---"
for wf in ci.yml audit.yml ci-validation.yml governance-check.yml tag-validation.yml dependency-check.yml cleanup-weekly.yml repository-selfcheck.yml file-tagging.yml; do
  [ -f "$REPO_ROOT/.github/workflows/$wf" ] && check_pass ".github/workflows/$wf" || check_warn ".github/workflows/$wf missing"
done

echo ""
echo "--- Dependabot Configuration ---"
[ -f "$REPO_ROOT/.github/dependabot.yml" ] && check_pass "dependabot.yml" || check_warn "dependabot.yml missing"

echo ""
echo "--- Script Executability ---"
for s in scripts/backup.sh scripts/deploy.sh scripts/start.sh scripts/test.sh; do
  [ -f "$REPO_ROOT/$s" ] && check_pass "$s exists" || check_warn "$s missing"
done

echo ""
echo "--- Artifact Directories ---"
for d in artifacts/incoming artifacts/staged artifacts/releases; do
  [ -d "$REPO_ROOT/$d" ] && check_pass "$d/" || check_warn "$d/ missing"
done

echo ""
echo "--- Documentation Verification Blocks ---"
for doc in README.md CONTRIBUTING.md SECURITY.md CODE_OF_CONDUCT.md; do
  if [ -f "$REPO_ROOT/$doc" ]; then
    grep -q "Version: $ENTERPRISE_VERSION" "$REPO_ROOT/$doc" && check_pass "$doc has verification block" || check_warn "$doc missing verification block"
  fi
done

echo ""
echo "======================================"
echo " Summary: PASS=$PASS  WARN=$WARN  FAIL=$FAIL"
echo "======================================"

if [ "$FAIL" -gt 0 ]; then
  echo "Status: FAILED"
  exit 1
else
  echo "Status: OK"
fi
} | tee "$REPORT_FILE"
