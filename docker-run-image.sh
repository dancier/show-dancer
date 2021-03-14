#!/bin/bash

source ./version.conf
docker run --rm --name show-dancer -v $(pwd)/config.yml:/config.yml -p 4200:8080 --net=host dancier/show-dancer:${VERSION}
