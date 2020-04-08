# Stage 0
FROM node as build

WORKDIR /app

RUN npm install -g gatsby-cli

# Install dependencies before pushing the rest of the code in order to use
# cached dependencies when a file other than the package.json is changed in
# the current host directory
COPY ./package.json ./
RUN npm install

COPY . .
RUN gatsby build

# Stage 1
FROM nginx:alpine

COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf