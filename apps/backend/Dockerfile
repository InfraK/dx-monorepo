FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F backend... install --frozen-lockfile
RUN pnpm -F backend... build
RUN pnpm deploy -F backend --prod /prod/backend

FROM base
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend

ENTRYPOINT ["pnpm", "start"]
