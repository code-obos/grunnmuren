# Grunnmuren - OBOS' design system

[![Slack](https://img.shields.io/badge/Slack-%23grunnmuren--design--system-default?logo=slack)](https://obos.slack.com/archives/C03FR05FJ9F)

This is the monorepo for **Grunnmuren**, OBOS' design system.

**⚠️ This branch is v2 of the design system**

If you are looking for v1 of the design system, see the [v1 branch.](https://github.com/code-obos/grunnmuren/tree/v1)

## Getting started

See these links:

- [Documentation](https://grunnmuren.obos.no)
- [Storybook](https://grunnmuren.obos/storybook)
- [Figma](https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem)

and check out these packages:

- [@obosbbl/grunnmuren-react](./packages/react/) - The React component library.
- [@obosbbl/grunnmuren-tailwind](./packages/tailwind/) - The Tailwind preset for the design system.
- [@obosbbl/grunnmuren-icons-react](./packages/icons-react/) - SVG icons as React components.
- [@obosbbl/grunnmuren-icons-svg](./packages/icons-svg/) - SVG icons.

and the documentation source:

- [Docs](./apps/docs)

## Contributing

### Local setup

#### Install pnpm

This repository uses [pnpm](https://pnpm.io/) instead of npm. Follow their [installation guide](https://pnpm.io/installation) to set it up.

#### Install dependencies

```bash
pnpm install
```

#### Linting

The following command runs Biome.

```bash
pnpm lint
```

#### Build

To build all packages, run the following command:

```bash
pnpm build
```

#### Development

Note that before running the Storybook or docs app for the first time, you need to build the packages first. We currently don't use tools such as Turborepo or Nx.

Runs the storybook for local development, at http://localhost:6006.

```bash
pnpm dev
```

Runs the docs app for local development, at http://localhost:3000.

```bash
pnpm dev:docs
```


### Releases and changelogs

We use an automated release process based on [changesets](https://github.com/changesets/changesets) and Github actions to version, release and publish the packages.
Meaningful changes should be documented by running `pnpm changeset` and be a part of the pull request. Remember to follow semver.
