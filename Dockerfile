FROM node:16.10.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g @angular/cli@12.2.9 @angular-devkit/build-angular@12.2.9 && npm install

COPY . /usr/src/app


EXPOSE 4201


CMD ["npm", "start"]