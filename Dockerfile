# pnpm is taken from its own standalone image (the Alpine variant, to match the
# libc of the runtime stage below), which is how pnpm documents installing it
# (https://pnpm.io/docker). It has no `node`, so pnpm downloads the runtime
# declared in package.json's `devEngines.runtime` when it is needed.
FROM ghcr.io/pnpm/pnpm:12.15.0-alpine@sha256:f164ca19f7736a0994dae195b81756cd969542a93ef692f5ab466759d06c1da9 AS base

FROM base AS prod-deps
COPY . /app
WORKDIR /app

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc,required=false \
    --mount=type=secret,id=github_token,required=false \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    sh -c ' \
      if [ -f /run/secrets/github_token ]; then \
        echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)" >> .npmrc; \
      fi && \
      pnpm install --prod --frozen-lockfile \
    '
    
FROM base AS builder
COPY . /app
WORKDIR /app

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc,required=false \
    --mount=type=secret,id=github_token,required=false \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    sh -c ' \
      if [ -f /run/secrets/github_token ]; then \
        echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)" >> .npmrc; \
      fi && \
      pnpm install --frozen-lockfile \
    '

RUN pnpm build
# important to build storybook before docs app
# so the storybook assets are copied correctly to build output
RUN pnpm build:storybook
RUN pnpm build:docs
RUN --mount=type=secret,id=sanity_studio_deploy_token \
  SANITY_AUTH_TOKEN=$(cat /run/secrets/sanity_studio_deploy_token) \
  pnpm sanity:schema:deploy

FROM node:26-alpine@sha256:c6ad9e9c1d80f6eb607c26b4b0a132ff7a2344fad1c78ea3baa2a7d4c8de6d94
WORKDIR /app/apps/docs
ENV NODE_ENV="production"

COPY --from=builder /app/apps/docs/.output .output
COPY --from=prod-deps /app/apps/docs/node_modules node_modules


ENV PORT=3000
EXPOSE 3000
USER node
CMD [ "node", ".output/server/index.mjs" ]
