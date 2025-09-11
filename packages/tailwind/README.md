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

```css
/* globals.css */

@import "@obosbbl/grunnmuren-tailwind";

/** Add any auto excluded sources (typically residing in node_modules) */
@source "../../node_modules/@obosbbl/grunnmuren-react/dist";
@source "../../node_modules/@code-obos/obos-layout/dist";
```

## Fonts

Fonts are automatically loaded from OBOS' CDN, so you don't have to host the font files yourself.

If you use [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), you have to allow `https://www.obos.no` as a [font-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src), otherwise the fonts will be blocked from loading.

The preset includes a (local) fallback font to prevent [CLS](https://web.dev/articles/cls) while the fonts are loading. This is similar to the [font optimization in Next](https://nextjs.org/docs/app/building-your-application/optimizing/fonts). This is enabled by default, and can only be disabled by a @theme override of the font variables in your own main tailwind CSS file.

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

## Migrating from v2?
Tailwind is upgraded to v4. The `grunnmuren-tailwind` package is now CSS-first configured. And the previously exposed JS config file is now replaced by a CSS config file.

The `legacyV1Compatibility` option is removed, so your project has to be fully upgraded to Grunnmuren v2.

The `includeFontFallback` option is also removed, and a font fallback will automatically be applied to the OBOS fonts by defaullt.

## Migration
1. Upgrade your project to Tailwind 4. You can try the [migration guide](https://tailwindcss.com/docs/upgrade-guide)
 from tailwind.
2. Add `@import "@obosbbl/grunnmuren-tailwind";` to the top of the main CSS file of your project. This is the new CSS configuration file for Grunnmuren.
3. If you have a JS/TS `tailwind.config` in your project and would like to keep it. You can include it in the main CSS file (mentioned in step 2), by using the `@config` directive, e.g: `@config '../tailwind.config.ts';`. Read more [here](https://tailwindcss.com/docs/functions-and-directives#compatibility).
4. Finally, if you would like to get rid of the old `tailwind.config`. You can move all your configuration to the main CSS file of your project. Tailwind 4 has automatic content detection, but if you need to include some excluded source you can use the `@source` directive, e.g: `@source "./node_modules/@obosbbl/grunnmuren-react/dist";`. You can also extend the `@obosbbl/grunnmuren-tailwind` config by using various directives such as `@base` or `@theme`.

Here is an example of what your main CSS file __might__ look like after migration:

``` CSS
@import "@obosbbl/grunnmuren-tailwind";

@source "../../node_modules/@obosbbl/grunnmuren-react/dist";
@source "../../node_modules/@code-obos/obos-layout/dist"

@theme {
  --animate-custom: custom-animation 1s ease-in-out infinite;
  @keyframes custom-animation {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}

@utility my-custom-util {
  @apply flex flex-col min-h-screen;
}
```
