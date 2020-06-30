#!/bin/bash

docker tag graphichat-production:latest registry.heroku.com/graphichat/web
docker push registry.heroku.com/graphichat/web
heroku container:release web -a graphichat
