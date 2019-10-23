#!/bin/bash

rsync -a --info=progress2 /graphichat/cache_modules/. /graphichat/client/
exec yarn run dev
