#!/bin/bash

git checkout master
git pull origin master
git merge dev
git push origin master
