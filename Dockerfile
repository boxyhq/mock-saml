FROM node:16.14.0-alpine3.15 AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY npm npm
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .
# COPY --from=deps /app/npm ./npm
# COPY --from=deps /app/node_modules ./node_modules
RUN npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json package-lock.json

ENV NODE_OPTIONS="--max-http-header-size=81920"
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 4000

CMD ["npm", "start"]
