FROM node:22.10.0-slim
LABEL Author Aiden_FE@outlook.com

ENV NODE_ENV production

ARG WORKDIR_DIR=/usr/share/app

ARG EXPOSE=8080

WORKDIR ${WORKDIR_DIR}

RUN npm install -g pnpm \
    && pnpm config set registry https://registry.npmmirror.com/ \
    && pnpm -v

COPY dist ${APP_DIR}/dist
COPY .npmrc ${APP_DIR}/.npmrc
COPY nest-cli.json ${APP_DIR}/nest-cli.json
COPY package.json ${APP_DIR}/package.json
COPY pnpm-lock.yaml ${APP_DIR}/pnpm-lock.yaml
COPY start.sh ${APP_DIR}/start.sh

EXPOSE ${EXPOSE}

CMD ["pnpm", "start"]
