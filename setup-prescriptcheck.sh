#!/bin/bash

set -e

echo "🚀 Starte PrescriptCheck Setup ..."

# 1. Notwendige Pakete installieren
echo "🔧 Installiere benötigte Pakete (unzip, curl, nodejs, npm, pm2)..."
apt update
apt install -y unzip curl

# 2. Node.js (v20.x) und PM2 installieren, falls nicht vorhanden
if ! command -v node > /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

npm install -g pm2

# 3. Projekt entpacken
if [ -f PrescriptCheck-main.zip ]; then
  echo "📦 Entpacke PrescriptCheck-main.zip..."
  unzip -o PrescriptCheck-main.zip
fi

cd PrescriptCheck-main/backend

# 4. Abhängigkeiten installieren
echo "📦 Installiere npm-Pakete..."
npm install express mongoose dotenv

# 5. Backend mit PM2 starten
echo "🚦 Starte Backend mit PM2..."
pm2 delete prescriptcheck-backend || true
pm2 start index.js --name prescriptcheck-backend

echo "✅ PrescriptCheck Backend läuft jetzt über PM2 auf Port 3000!"
pm2 status

# Optional: Zeige IP und API-Endpunkt an
IP=$(curl -s https://ipinfo.io/ip || hostname -I | awk '{print $1}')
echo "🌐 Teste den API-Endpunkt: http://$IP:3000/api/login"
