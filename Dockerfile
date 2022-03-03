FROM node:16.14.0-alpine3.15

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

USER node

RUN npm install --production

COPY --chown=node:node .next .next
COPY --chown=node:node public public

EXPOSE 4000

CMD ["npm", "start"]