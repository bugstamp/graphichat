#!/bin/bash

cp -r /graphichat-server/cache_modules/node_modules/. /graphichat-server/server/node_modules/
exec yarn run dev
