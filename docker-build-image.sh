#!/bin/bash

source ./version.conf

docker build -t dancier/show-dancer:${VERSION} .