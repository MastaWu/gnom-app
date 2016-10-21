FROM node:4-onbuild

MAINTAINER Gnom

RUN mkdir -p /var/www/gnom-app
WORKDIR /var/www/gnom-app

COPY package.json /var/www/gnom-app
RUN npm install
RUN npm install -g grunt-cli

COPY . /var/www/gnom-app
RUN grunt build

EXPOSE 8080
CMD [ "npm", "start" ]