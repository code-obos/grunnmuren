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
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.{mjs,js}',
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

## Fonts

Fonts are automatically loaded from OBOS' CDN, so you don't have to host the font files yourself.

If you use [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), you have to allow `https://www.obos.no` as a [font-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src), otherwise the fonts will be blocked from loading.

The preset includes a (local) fallback font to prevent [CLS](https://web.dev/articles/cls) while the fonts are loading. This is similar to the [font optimization in Next](https://nextjs.org/docs/app/building-your-application/optimizing/fonts). This is enabled by default, but can be disabled with the `includeFontFallback` option.

The fallback font metrics is generated with a script that can be run with `pnpm font-fallback` (requires [Bun](https://bun.sh/)). If the fonts are changed, the script must be rerun and the resulting file commited.

## Migrating from v1?

To ease the transition from v1 to v2 of Grunnmuren, it is possible to configure the preset to be (partially) compatible with v1. This allows you to use v2 of the Tailwind preset with v1 of the React components, and upgrade your application over time instead of a full migration.

To do that you need to configure the preset with `legacyV1Compatibility` option.

## Options

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@obosbbl/grunnmuren-tailwind')({ includeFontFallback: false }),
  ],
  // content: [ ... ]
};
```

The preset supports the following options:

| Name                  | Default value | Description                                         |
| --------------------- | ------------- | --------------------------------------------------- |
| includeFontFallback   | `true`        | Whether the preset includes a font fallback         |
| legacyV1Compatibility | `false`       | Configures partial compatibility with Grunnmuren v1 |
