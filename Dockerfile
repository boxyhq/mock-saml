FROM node:16.14.0-alpine3.15

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

USER nextjs

RUN npm install --production

COPY --chown=node:nextjs .next .next
COPY --chown=node:nextjs public public

EXPOSE 4000

CMD ["npm", "start"]