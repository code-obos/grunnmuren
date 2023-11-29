# @obosbbl/grunnmuren-tailwind

[![npm canary version](https://img.shields.io/npm/v/@obosbbl%2Fgrunnmuren-tailwind/canary.svg)](https://www.npmjs.com/package/@obosbbl/grunnmuren-tailwind)

Grunnmuren Tailwind preset. See the [Tailwind documentation](https://tailwindcss.com/docs/presets) for more information about how presets work.

## Install

```sh
# npm
npm install -D @obosbbl/grunnmuren-tailwind@canary tailwindcss postcss autoprefixer

# pnpm
pnpm add -D @obosbbl/grunnmuren-tailwind@canary tailwindcss postcss autoprefixer
```

## Usage

Configure Tailwind to use the preset

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: [
    // Add your own content sources as needed, eg:
    './src/app/**/*.{js,ts,jsx,tsx,}',

    // If you're using Grunnmuren's React components
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.mjs',
  ],
};
```

Add the Tailwind directives to your CSS

```css
/* globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Configure PostCSS to use Tailwind

```js
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Migrating from v1?

To ease the transition from v1 to v2 of Grunnmuren, it is possible to configure the preset to be (partially) compatible with v1. This allows you to use v2 of the Tailwind preset with v1 of the React components, and upgrade your application over time instead of a full migration.

To do that you need to configure the preset with `legacyV1Compatibility` option.

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@obosbbl/grunnmuren-tailwind')({ legacyV1Compatibility: true }),
  ],
};
```
