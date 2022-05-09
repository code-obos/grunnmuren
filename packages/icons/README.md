# @obosbbl/grunnmuren-icons

Grunnmuren's icon set as React components and SVG files.

## Install

```sh
npm install @obosbbl/grunnmuren-icons
```

## Usage

```jsx
// React
import { House } from '@obosbbl/grunnmuren-icons/react';

// SVG
import House from '@obosbbl/grunnmuren-icons/svg/House.svg';
```

## Accessibility (React)

The SVG is rendered using `role="img"` because most screen readers have limited support for SVGs default implicit ARIA role.

Since icons are mostly used for decorative purposes, the icons are automatically hidden from screen readers with `aria-hidden`, unless an `aria-label` is provided.

## Updating the icons

To update the icons, run the _update_ and _build_ scripts. The icons should never be edited manually, as the source of truth is in [Figma](https://www.figma.com/file/XRHRRytz9DqrDkWpE4IKVB/OBOS-DS?node-id=2192%3A33204).

The first operation downloads all the icons as SVG files and performs some optimization on them. These icons are checked into the [svg folder](./svg).

The second command converts the SVG icons into React components and bundles them.

```sh
pnpm run update
pnpm run build
```

### Figma access token

If you are running the import script for the first time, it will prompt your for a [Figma access token](https://www.figma.com/developers/api#access-tokens). The token is is required to access Figma's API. It can be generated on your Figma account settings page.

The import script may store the token to a local file, so you won't have to supply the token again on subsequent runs.

If the scripts authentication issues, you could try to create a new access token and delete the local file `.FIGMA_TOKEN` before running the script again.
