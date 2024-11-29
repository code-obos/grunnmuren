FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY . .
RUN echo "node-linker=hoisted" >> .npmrc
RUN \
  --mount=type=secret,id=npmrc,target=/root/.npmrc\
  pnpm install

FROM deps as builder
WORKDIR /app

RUN pnpm build
RUN pnpm --filter docs build

FROM dktprodacr.azurecr.io/dktp/bun1 AS app
ENV NODE_ENV="production"
WORKDIR /app
COPY --from=builder /app/apps/docs/.output ./apps/docs/.output/
WORKDIR /app/apps/docs
ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000
# CMD [ "bun", "run", ".output/server/index.mjs" ]