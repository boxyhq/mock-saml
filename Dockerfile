FROM node:16.14.0-alpine3.15

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN npm install --production

COPY --chown=node:nextjs .next .next
COPY --chown=node:nextjs public public

USER nextjs

EXPOSE 4000

CMD ["npm", "start"]