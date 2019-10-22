#!/bin/bash

rsync -a --progress /graphichat/cache_modules/. /graphichat/client/
exec yarn run dev
