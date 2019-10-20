#!/bin/bash

rsync -ar /graphichat/cache_modules/node_modules/. /graphichat/server/node_modules/
exec yarn run dev
