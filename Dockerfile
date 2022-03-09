FROM node:16.14.0-alpine3.15 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV NEXT_PUBLIC_GTM_ID ""
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build && npm install --production --ignore-scripts --prefer-offline

FROM base AS runner
WORKDIR /app

ENV NODE_OPTIONS="--max-http-header-size=81920"
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 4000

CMD ["npm", "start"]