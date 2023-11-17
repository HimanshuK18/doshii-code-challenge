 #Start our Dockerfile with a FROM statement. This is where you specify your base image.
FROM node:16-alpine
RUN mkdir -p /usr/src/app

ENV NODE_ENV production

WORKDIR /usr/src/app


COPY --chown=node:node . .
RUN npm ci --only=production

EXPOSE 3000

CMD [ "node", "dist/server.js" ]
