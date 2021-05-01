#!/bin/bash

source ./version.conf
docker run --rm --name show-dancer -v $(pwd)/config.yml:/config.yml -p 80:80 -p 443:443 dancier/show-dancer:${VERSION}
