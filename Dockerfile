FROM dktprodacr.azurecr.io/dktp/node22:1.0.3 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod-deps
COPY . /app
WORKDIR /app

RUN \
    --mount=type=secret,id=npmrc,target=/root/.npmrc\
    --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
COPY . /app
WORKDIR /app

RUN \
    --mount=type=secret,id=npmrc,target=/root/.npmrc\
    --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm build
# important to build storybook before docs app
# so the storybook assets are copied correctly to build output
RUN pnpm build:storybook
RUN pnpm build:docs

FROM base
WORKDIR /app/apps/docs
ENV NODE_ENV="production"

COPY --from=builder /app/apps/docs/.output .output
COPY --from=builder /app/apps/docs/.vinxi .vinxi
COPY --from=prod-deps /app/apps/docs/node_modules node_modules

ENV PORT=3000
EXPOSE 3000
USER node
CMD [ "node", ".output/server/index.mjs" ]
