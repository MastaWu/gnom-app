# gnom-app #

# API Deploy #

## Local Deploy ##

**NOTE: This requires that you have the config files placed in the api directory.**

In order to start app, you need to have nodejs installed.

From command line, cd into gnom-app/api directory, and run:

    npm install

If you want to run the app locally and test the app, run this command:

    grunt dev

## Dockerized Deploy ##

**NOTE: This requires that you have the config files placed in the api directory.**

This app is dockerized, so you can run this in a docker container, if preferred.

In order to start app, you need to have docker installed.

From command line, cd into gnom-app/api directory, and run:

    docker build -t gnom-app/api

**This is creates the docker image**

After the image has been built, check to see that gnom-app/api is not running yet.

    docker ps

If it's not running, run it!

    docker run -p 8080:8080 -d gnom-app/api

If it is already running or there's a container blocking the port, stop and remove the container.

    docker stop <container id>
    docker rm <container id>

After you have run the command to start docker, visit the link below to see the app!

    localhost:8080/