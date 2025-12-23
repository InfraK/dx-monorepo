FROM mcr.microsoft.com/playwright:v1.57.0-noble AS base

RUN corepack enable pnpm
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F e2e... install --frozen-lockfile
