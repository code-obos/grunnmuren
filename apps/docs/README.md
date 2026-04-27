# Grunnmuren documentation

This is the app for the Grunnmuren documentation site. It is built using [TanStack Start](https://tanstack.com/start/latest) and Grunnmuren itself.

## Setup

Before running the app for the first time, you should run `pnpm build:assets`. This copies the icon assets to the public folder. If the icons are updated you will need to run this again.

You also need to run `pnpm build:docgen` to build auto generated docs (such as component names, props etc.)

Start the app for local development by running `pnpm run dev`.

## Sanity Presentation Mode

The docs app supports Sanity Presentation Mode with a signed preview session cookie.

Set these environment variables in `apps/docs/.env` (or your deployment env):

- `SANITY_PREVIEW_JWT_SECRET` - Required. A strong random string used to sign preview session JWTs.
- `SANITY_READ_TOKEN` - Required for draft preview. Use a Sanity token with read access to drafts.
- `SANITY_PREVIEW_URL` - Optional. Defaults to `http://localhost:3003`.
- `SANITY_STUDIO_URL` - Optional. Defaults to `/studio`.

The Studio Presentation Tool uses `SANITY_PREVIEW_URL/api/preview` to enable preview mode and stores an 8-hour HttpOnly cookie.
