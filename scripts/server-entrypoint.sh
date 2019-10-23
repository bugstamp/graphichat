#!/bin/bash

rsync -a --info=progress2 /graphichat/cache_modules/. /graphichat/server/
exec yarn run dev
