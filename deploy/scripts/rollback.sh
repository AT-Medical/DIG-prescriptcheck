#!/usr/bin/env bash
# deploy/scripts/rollback.sh
# Rolls back PrescriptCheck to the previous deployment

set -euo pipefail

APP_DIR="${DEPLOY_DIR:-/opt/prescriptcheck}"
BACKUP_DIR="${BACKUP_BASE:-/opt/backups/prescriptcheck}"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Initiating PrescriptCheck rollback..."

LATEST_BACKUP=$(ls -t "$BACKUP_DIR" 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  log "ERROR: No backup found in ${BACKUP_DIR}"
  exit 1
fi

log "Rolling back to backup: ${LATEST_BACKUP}"

# Restore backup
cp -r "${BACKUP_DIR}/${LATEST_BACKUP}/backend" "${APP_DIR}/"

# Reinstall dependencies
cd "${APP_DIR}/backend"
npm install --production --no-audit

# Restart service
pm2 restart prescriptcheck-backend

# Health check
sleep 5
if curl --fail --silent --max-time 10 "http://localhost:3000/api/health" > /dev/null; then
  log "Rollback successful – service is healthy"
else
  log "ERROR: Service unhealthy after rollback – manual intervention required"
  exit 1
fi
