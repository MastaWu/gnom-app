FROM node:4-onbuild

MAINTAINER Gnom

RUN mkdir -p /var/www/gnom-app
WORKDIR /var/www/gnom-app

COPY package.json /var/www/gnom-app
RUN npm install

COPY . /var/www/gnom-app

EXPOSE 8080
CMD ["pm2", "app.js"]