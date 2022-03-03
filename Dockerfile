FROM node:16.14.0-alpine3.15

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --chown=nextjs:nodejs .next .next
COPY --chown=nextjs:nodejs public public

USER nextjs

EXPOSE 4000

CMD ["npm", "start"]
