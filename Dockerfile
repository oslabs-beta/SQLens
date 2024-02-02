FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run start
EXPOSE 3000
ENTRYPOINT [ "node" ./src/server/index.ts]
