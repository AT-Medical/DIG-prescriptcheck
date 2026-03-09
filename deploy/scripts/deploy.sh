#!/usr/bin/env bash
# deploy/scripts/deploy.sh
# PrescriptCheck deployment automation script

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

ENVIRONMENT="${1:-staging}"
APP_DIR="${DEPLOY_DIR:-/opt/prescriptcheck}"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Starting PrescriptCheck deployment to ${ENVIRONMENT}"

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  echo "Usage: $0 [staging|production]"
  exit 1
fi

# Pull latest code
log "Pulling latest code..."
git -C "$APP_DIR" fetch origin main
git -C "$APP_DIR" reset --hard origin/main

# Install backend dependencies
log "Installing backend dependencies..."
cd "$APP_DIR/backend"
npm install --production --no-audit

# Build frontend
log "Building frontend..."
cd "$APP_DIR/frontend"
npm install --no-audit
npm run build

# Restart backend service
log "Restarting backend service..."
if pm2 list | grep -q "prescriptcheck-backend"; then
  pm2 reload prescriptcheck-backend --update-env
else
  pm2 start "$APP_DIR/backend/index.js" --name prescriptcheck-backend
fi
pm2 save

# Health check
log "Running health check..."
sleep 5
if curl --fail --silent --max-time 10 "http://localhost:3000/api/health" > /dev/null; then
  log "Health check passed – deployment successful"
else
  log "ERROR: Health check failed – rollback recommended"
  exit 1
fi

log "Deployment to ${ENVIRONMENT} completed successfully"
