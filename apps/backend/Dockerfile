FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install -g pnpm@latest-10

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./


RUN pnpm fetch


FROM base AS build
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F backend... install --frozen-lockfile --offline
RUN pnpm -F backend... build
RUN pnpm deploy -F backend --prod /prod/backend

FROM base
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend

ENTRYPOINT ["pnpm", "start"]
