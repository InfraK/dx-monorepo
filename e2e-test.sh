#!/bin/bash

set -e

cleanup() {
  docker compose -f docker-compose.test.yml down
}
trap cleanup EXIT

docker compose -f docker-compose.test.yml up e2e --build --abort-on-container-exit --exit-code-from e2e
