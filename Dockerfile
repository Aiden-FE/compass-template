FROM node:18.15.0-slim
MAINTAINER Aiden_FE <Aiden_FE@outlook.com>

ENV NODE_ENV production

ARG WORKDIR_DIR=/root/compass-service

ARG EXPOSE=3000

WORKDIR ${WORKDIR_DIR}

RUN npm i -g pnpm

COPY . ${WORKDIR_DIR}

EXPOSE ${EXPOSE}

CMD ["npm", "run", "start"]
