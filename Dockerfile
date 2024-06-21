FROM node:12.12.0

RUN mkdir /rasa-webchat

WORKDIR /rasa-webchat

COPY . .

RUN npm ci
RUN npm run build

ENTRYPOINT [ "sleep", "365d" ]
