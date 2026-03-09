#!/usr/bin/env bash
# deploy/scripts/health-check.sh
# Checks the health of the PrescriptCheck application

set -euo pipefail

HOST="${1:-localhost}"
PORT="${2:-3000}"
TIMEOUT="${3:-10}"
RETRIES=3

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

check_health() {
  curl --fail --silent --max-time "$TIMEOUT" "http://${HOST}:${PORT}/api/health"
}

log "Checking PrescriptCheck health at ${HOST}:${PORT}"

for i in $(seq 1 $RETRIES); do
  if check_health; then
    log "Health check passed (attempt ${i}/${RETRIES})"
    exit 0
  else
    log "Health check failed (attempt ${i}/${RETRIES})"
    if [ "$i" -lt "$RETRIES" ]; then
      sleep 5
    fi
  fi
done

log "ERROR: All ${RETRIES} health check attempts failed"
exit 1
