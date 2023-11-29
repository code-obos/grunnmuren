# Grunnmuren - OBOS' design system

[![Netlify Status](https://api.netlify.com/api/v1/badges/62c234c7-3bb2-4592-a22f-ecb44d84f463/deploy-status)](https://app.netlify.com/sites/obos-grunnmuren/deploys)

This is the monorepo for **Grunnmuren**, OBOS' design system.

**⚠️ This branch is v2 of the design system, which is in active development and released with a canary tag. Expect frequent changes and breakage.**

If you are looking for v1 of the design system, see the [v1 branch.](https://github.com/code-obos/grunnmuren/tree/v1)

## Getting started

See these links:

- [Storybook](https://obos-grunnmuren.netlify.app/)
- [Figma](https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem)

and check out these packages:

- [@obosbbl/grunnmuren-react](./packages/react/) - The React component library.
- [@obosbbl/grunnmuren-tailwind](./packages/tailwind/) - The Tailwind preset for the design system.
- [@obosbbl/grunnmuren-icons-react](./packages/icons-react/) - SVG icons as React components.
- [@obosbbl/grunnmuren-icons-svg](./packages/icons-svg/) - SVG icons.

## Contributing

### Local setup

#### Install pnpm

This repository uses [pnpm](https://pnpm.io/) instead of npm. Follow their [installation guide](https://pnpm.io/installation) to set it up.

#### Install dependencies

```bash
pnpm install
```

#### Linting

The following command runs both prettier and eslint.

```bash
pnpm lint
```

#### Build

To build all packages, run the following command:

```bash
pnpm build
```

#### Development

Runs the storybook for local development, at http://localhost:6006.

```bash
pnpm dev
```

### Releases and changelogs

We use an automated release process based on [changesets](https://github.com/changesets/changesets) and Github actions to version, release and publish the packages.
Meaningful changes should be documented by running `pnpm changeset` and be a part of the pull request. Remember to follow semver.
