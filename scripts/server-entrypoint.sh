#!/bin/bash

rsync -a --progress /graphichat/cache_modules/. /graphichat/server/
exec yarn run dev
