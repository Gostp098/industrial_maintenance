FROM node:20-alpine AS builder

WORKDIR /app

# Paths are relative to project root (docker-compose build context)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY frontend/ .

# Build production bundle → outputs to /app/dist
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
FROM nginx:stable-alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (path relative to project root)
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]