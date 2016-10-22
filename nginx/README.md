# gnom-app - Nginx Deploy #

## Dockerized Deploy ##

**NOTE: This requires that you have the config files placed in the api directory.**

This package is used to create a reverse proxy, and serve static files for the production app.

From command line, cd into gnom-app/nginx directory, and run:

    docker build -t gnom-app/nginx

**This creates the docker image**

After the image has been built, check to see that gnom-app/nginx is not running yet.

    docker ps

If it's not running, run it!

    docker run -p 8080:8080 -d gnom-app/nginx

If it is already running or there's a container blocking the port, stop and remove the container.

    docker stop <container id>
    docker rm <container id>

After you have run the command to start docker, visit the link below to see the landing page!

    localhost/

**NOTE: You will not see any css or js. All of the code is located in api.... I do not plan on separating the files at this time.