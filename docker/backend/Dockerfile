FROM node:20-alpine

WORKDIR /app

# Paths are relative to project root (docker-compose build context)
COPY backend/package*.json ./

# Install ALL deps (devDependencies needed for Jest/ESLint in CI)
RUN npm ci

# Copy backend source code
COPY backend/ .

EXPOSE 5000

# Init the DB table, then start the server
CMD ["sh", "-c", "node init-db.js && node server.js"]