#!/bin/bash

target_dir=$1

rsync -a --info=progress2 /graphichat/cache_modules/. /graphichat/$target_dir/
exec yarn run dev
