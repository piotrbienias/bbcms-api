FROM node:10.16-alpine

WORKDIR /opt/bbcms-api

COPY . .

RUN npm install --quiet -g gulp && \
    npm ci

CMD ["npm", "run", "start:staging"]