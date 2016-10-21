# gnom-app #

## Local Deploy ##

#### In order to start app, you need to have nodejs installed. ####

#### From command line, cd into gnom-app/api directory, and run: ####

    npm install

#### If you want to run the app locally and test the app, run this command: ####

    grunt dev

**NOTE: This requires that you have the config files.**

## Dockerized Deploy ##

#### This app is dockerized, so you can run this in a docker container, if preferred.

#### In order to start app, you need to have docker installed. ####

#### From command line, cd into gnom-app/api directory, and run: ####

    docker build -t gnom-app/api

** This is creating the docker image **

#### After the image has been built, check to see that gnom-app/api is not running yet. ####

    docker ps

#### If it's not running, run it! ####

    docker run -p 8080:8080 -d gnom-app/api

#### if it is running, stop and remove the running gnom-app/api container ####

    docker stop <container id>
    docker rm <container id>
