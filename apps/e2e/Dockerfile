FROM mcr.microsoft.com/playwright:v1.57.0-noble AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install -g pnpm@latest-10

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch

FROM base AS build
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F e2e... install --frozen-lockfile --offline
