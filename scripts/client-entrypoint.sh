#!/bin/bash

rsync -a /graphichat/cache_modules/node_modules /graphichat/client/node_modules
exec yarn run dev
