# PrescriptCheck – Backup Documentation

## Backup Strategy

### Frequency

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Database (full) | Daily | 30 days |
| Database (incremental) | Every 6 hours | 7 days |
| Configuration | On change | 90 days |
| Audit logs | Weekly | 7 years (compliance) |

### Backup Destinations

- **Primary**: Local server `/opt/backups/`
- **Secondary**: Remote object storage (encrypted)

## Backup Scripts

```bash
# Manual database backup
./scripts/backup.sh

# Restore from backup
mongorestore --uri="$MONGODB_URI" /backup/prescriptcheck_YYYYMMDD/
```

## Restore Procedure

1. Identify the backup to restore from
2. Verify backup integrity
3. Stop application service
4. Restore database
5. Restart application
6. Verify data integrity
7. Run health checks

## Compliance

- Backups encrypted with AES-256
- Backup access logged for HIPAA compliance
- Audit logs retained for 7 years per DSGVO/§238 HGB
- Medical records retained for 10 years per §630f BGB

---

*Last updated: March 2026*
