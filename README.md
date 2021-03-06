# gnom-app - Full Deploy #

## Full Dockerized Deploy ##

**NOTE: This requires that you have the config files placed in the api directory.**

This is the full deploy for our app and our landing page. This ensures a stable environment for production and development.

From command line, cd into the gnom-app/ directory, and run:

    docker-compose up --build

If you have created the images before, but have added changes, run:

    docker-compose up --force-recreate --build

If you want Docker to run in the background, add -d to the command. Ex:

    docker-compose up --force-recreate --build -d

    or

    docker-compose up --build -d

**This sets up both images and links the containers together**

After the image has been built, check to see that everything is running.

    docker ps

To see the landing page in your browser:

    localhost/

To see the main app page in your browser:

    localhost/app
