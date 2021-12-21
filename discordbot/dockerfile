FROM node:14.16-alpine as install-env


WORKDIR /install

COPY ./package.json /install
COPY ./package-lock.json /install

RUN npm i

FROM node:14.16-alpine as build-env

COPY . /build
COPY --from=install-env /install/node_modules /build/node_modules

WORKDIR /build

RUN npm run build

FROM node:14.16-alpine as prod-env

WORKDIR /app

COPY --from=build-env /build/dist /app
COPY --from=install-env /install/node_modules /app/node_modules

CMD ["node", "main"]


