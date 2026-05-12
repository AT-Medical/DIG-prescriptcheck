# Dockerfile für PrescriptCheck

FROM node:26-alpine

# Arbeitsverzeichnis
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install --production

# Anwendung kopieren
COPY . .

# Port
EXPOSE 3000

# Startbefehl
CMD ["node", "/backend/app.js"]
