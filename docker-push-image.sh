#!/bin/bash

source ./version.conf

docker login

docker push dancier/show-dancer:${VERSION}