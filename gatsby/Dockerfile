# syntax = docker/dockerfile:1.0-experimental
FROM node:alpine as build

ENV NODE_ENV production

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh

# Install dependencies before pushing the rest of the code in order to use
# cached dependencies when a file other than the package.json is changed in
# the current host directory
COPY ./package.json ./

RUN npm install

COPY . .

ARG GHOST_API_URL
RUN --mount=type=secret,id=GHOST_CONTENT_API_KEY \
    GHOST_CONTENT_API_KEY=$(cat /run/secrets/GHOST_CONTENT_API_KEY) npm run build

FROM nginx:alpine

COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf 
