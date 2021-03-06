#!/bin/bash
set -e

ORG=${ORG:-hsldevcom}
DOCKER_TAG=${TRAVIS_BUILD_NUMBER:-latest}
DOCKER_IMAGE=$ORG/jore-map-ui:${DOCKER_TAG}
DOCKER_IMAGE_LATEST=$ORG/jore-map-ui:latest
DOCKER_IMAGE_DEV=$ORG/jore-map-ui:dev
APP_BUILD_DATE=$(date +'%d.%m.%Y')

docker build --build-arg BACKEND_API_URL=${API_URL} --build-arg BACKEND_GEOSERVER_URL=${GEOSERVER_URL} --build-arg APP_BUILD_DATE=${APP_BUILD_DATE} --tag=$DOCKER_IMAGE .

if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  docker login -u $DOCKER_USER -p $DOCKER_AUTH
  docker push $DOCKER_IMAGE
  docker tag $DOCKER_IMAGE $DOCKER_IMAGE_LATEST
  docker push $DOCKER_IMAGE_LATEST
  docker tag $DOCKER_IMAGE $DOCKER_IMAGE_DEV
  docker push $DOCKER_IMAGE_DEV
fi
