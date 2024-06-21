FROM node:12.12.0

RUN mkdir /rasa-webchat

WORKDIR /rasa-webchat

COPY ./npmrc.enc ./npmrc.enc
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "sleep", "365d" ]
