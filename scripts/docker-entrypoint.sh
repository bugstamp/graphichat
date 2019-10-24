#!/bin/bash

dir=1

rsync -a --info=progress2 /graphichat/cache_modules/. /graphichat/$dir/
exec yarn run dev
