#!/bin/sh
./index.js $1 | logagent -t $2 -y
