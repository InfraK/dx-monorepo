FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install -g pnpm@latest-10

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch

FROM base AS build
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -F frontend... install --frozen-lockfile --offline
RUN pnpm -F frontend... build
RUN pnpm deploy -F frontend /prod/frontend

FROM base
COPY --from=build /prod/frontend /prod/frontend
COPY --from=build /app/apps/frontend/dist /prod/frontend/dist
WORKDIR /prod/frontend

EXPOSE 4173

CMD ["pnpm", "preview", "--host"]
