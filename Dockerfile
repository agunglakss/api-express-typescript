FROM node:23.7.0-alpine AS development
WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .

FROM development AS builder
# 1. Run tests and linting first
# RUN npm run lint
# RUN npm run test:unit

# 2. Compile TS to JS (reads tsconfig.json, outputs to /dist)
# This MUST happen while typescript is still installed
RUN npm run build

# 3. NOW it is safe to delete typescript and devDependencies
RUN npm prune --production

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only production node_modules (no typescript, no linters)
COPY --from=builder /app/node_modules ./node_modules

# Copy only the compiled JavaScript code from the dist folder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

USER node
EXPOSE 3000
# Run the compiled JavaScript file
CMD ["node", "dist/main.js"]
