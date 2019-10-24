#!/bin/bash

git checkout master
git pull -a
git merge dev
git push origin master
