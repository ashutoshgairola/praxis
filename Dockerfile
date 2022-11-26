FROM node:15.13.0-alpine3.13 as builder
RUN mkdir /srv/code
WORKDIR /srv/code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
FROM node:15.13.0-alpine3.13
RUN mkdir /srv/code
WORKDIR /srv/code
COPY --from=builder /srv/code .
ENTRYPOINT ["node" ,"index.js"]