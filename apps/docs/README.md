# Grunnmuren documentation

This is the app for the Grunnmuren documentation site. It is built using [TanStack Start](https://tanstack.com/start/latest) and Grunnmuren itself.

## Setup

Before running the app for the first time, you should run `pnpm build:assets`. This copies the icon assets to the public folder. If the icons are updated you will need to run this again.

You also need to run `pnpm build:docgen` to build auto generated docs (such as component names, props etc.)

Start the app for local development by running `pnpm run dev`.
