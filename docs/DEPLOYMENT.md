# PrescriptCheck – Deployment Guide

## Prerequisites

- Node.js 20.x
- MongoDB 7.x
- Docker 24.x (optional)
- PM2 (for production process management)

## Environment Setup

### 1. Clone and Configure

```bash
git clone https://github.com/AT-Medical/PrescriptCheck.git
cd PrescriptCheck
cp .env.example .env
# Edit .env with your configuration
```

### 2. Required Environment Variables

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster/prescriptcheck
JWT_SECRET=<generate with: openssl rand -base64 64>
ENCRYPTION_KEY=<generate with: openssl rand -base64 32>
AUDIT_SECRET=<generate with: openssl rand -base64 32>
```

### 3. Install Dependencies

```bash
cd backend && npm install --production
cd ../frontend && npm install && npm run build
```

## Deployment Options

### Option A: Docker Compose (Recommended for small deployments)

```bash
cd docker
docker compose -f docker-compose.yml up -d
```

### Option B: Kubernetes

```bash
kubectl create namespace prescriptcheck
kubectl apply -f deploy/kubernetes/configmap.yaml
kubectl create secret generic prescriptcheck-secrets \
  --from-literal=mongodb-uri="$MONGODB_URI" \
  --from-literal=jwt-secret="$JWT_SECRET" \
  --from-literal=encryption-key="$ENCRYPTION_KEY" \
  -n prescriptcheck
kubectl apply -f deploy/kubernetes/
```

### Option C: PM2 (Bare metal / VPS)

```bash
cd backend
pm2 start index.js --name prescriptcheck-backend
pm2 save
pm2 startup
```

## CI/CD Pipeline

Automated deployments are configured via GitHub Actions:

- **Staging**: Triggered on push to `main`
- **Production**: Manual trigger via workflow dispatch with version tag

See: `.github/workflows/deploy-staging.yml` and `.github/workflows/deploy-production.yml`

## Health Monitoring

```bash
# Check API health
curl https://prescriptcheck.atmedical.at/api/health

# Check PM2 status
pm2 status

# Check logs
pm2 logs prescriptcheck-backend --lines 100
```

## SSL/TLS Setup

```bash
# Using certbot (Let's Encrypt)
./setup_ssl_certbot.sh
```

## Rollback Procedure

```bash
# Via deploy script
./deploy/scripts/rollback.sh

# Via PM2
pm2 rollback prescriptcheck-backend
```

## Database Backup

```bash
# Manual backup
./scripts/backup.sh

# Restore from backup
mongorestore --uri="$MONGODB_URI" /backup/prescriptcheck_$(date +%Y%m%d)
```

See also: [ARCHITECTURE.md](ARCHITECTURE.md) | [SECURITY.md](SECURITY.md)
