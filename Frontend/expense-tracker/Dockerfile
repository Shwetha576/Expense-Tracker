# 1️⃣ Builder stage: install, build
FROM node:22-alpine AS builder

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build optimized assets
COPY . .
RUN npm run build

# 2️⃣ Runtime stage: serve built assets
# Option A: Use a lightweight web server (Busybox)
# FROM busybox:1.30 AS runner
# WORKDIR /app
# COPY --from=builder /app/dist ./
# CMD ["httpd", "-f", "-v", "-p", "8080"]
# EXPOSE 8080

# Option B: Use Node with serve (if you prefer)
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]
