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

@import '@obosbbl/grunnmuren-tailwind';

/** Add any auto excluded sources (typically residing in node_modules) */
@source "../../node_modules/@obosbbl/grunnmuren-react/dist";
@source "../../node_modules/@code-obos/obos-layout/dist";
```

## Fonts

Fonts are automatically loaded from OBOS' CDN, so you don't have to host the font files yourself.

If you use [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), you have to allow `https://www.obos.no` as a [font-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src), otherwise the fonts will be blocked from loading.

The preset includes a (local) fallback font to prevent [CLS](https://web.dev/articles/cls) while the fonts are loading. This is similar to the [font optimization in Next](https://nextjs.org/docs/app/building-your-application/optimizing/fonts). This is enabled by default, and can only be disabled by a @theme override of the font variables in your own main tailwind CSS file.

The fallback font metrics is generated with a script that can be run with `pnpm font-fallback` (requires [Bun](https://bun.sh/)). If the fonts are changed, the script must be rerun and the resulting file commited.

## Themes

Themes live in your app, not in Grunnmuren. A theme is a `[data-theme='…']` rule that sets `--gm-*` tokens. It can load before or after the preset: Grunnmuren's defaults have no specificity, so your theme always wins.

```css
@import '@obosbbl/grunnmuren-tailwind';

[data-theme='my-project'] {
  /* role colours */
  --gm-color-primary-base-default: #2d3a26;
  --gm-color-primary-base-hover: #404c39;
  /* or primitives, and every role that uses them follows */
  --gm-green-500: #2d3a26;
  --gm-radius-lg: 0;
}
```

```html
<section data-theme="my-project">…</section>
```

`data-theme` works on part of a page. Primitives the theme doesn't set come from the page around it, `:root` overrides included. Role colours start over from the defaults on every `data-theme`, worked out from the primitives there, so a theme inside another theme, or inside a `:root` that overrides roles, only gets the outer primitives. `data-theme="default"` goes back to Grunnmuren's own values. `data-color` (any role, `primary` to `info`) picks the role the short utilities such as `bg-base-default` point at. It's `primary` without it, and inside a new `data-theme` too.

### What a theme can set

These are public API, and renaming or removing one is a breaking change:

- the primitives in `tokens/primitives.css`: colours (`--gm-blue-500`), spacing (`--gm-space-4`), radius (`--gm-radius-lg`), border widths, icon stroke widths and the type primitives (font families, weights, line heights, letter spacing)
- the role colours: `--gm-color-{role}-{group}-{variant}` for `primary`, `accent`, `neutral`, `success`, `danger`, `warning` and `info`

A few things a theme can't change:

- reduced motion always wins: with `prefers-reduced-motion` the durations are zeroed whatever a theme sets
- contrast is the theme's responsibility. Grunnmuren's own roles are checked against WCAG 2.2 AA, and so is a theme built with [`grunnmuren-theme`](#building-a-theme-from-tokens). Custom properties written by hand aren't checked

Tailwind's `--radius-*` overridden in your own `@theme` doesn't reach inside a `data-theme`, so set `--gm-radius-*` instead.

The docs have a [guide to writing a theme](https://grunnmuren.obos.no/profil/temaer), where you can build one from your colours and see how it looks.

### Building a theme from tokens

A typo in a custom property silently does nothing, and nothing checks a theme's contrast. `grunnmuren-theme` builds the colour part of a theme from a JSON file with Grunnmuren's token names, and checks both:

```json
{
  "primary": {
    "base-default": "#2d3a26",
    "base-hover": { "$value": "{primary.base-active}" }
  },
  "blue": { "900": "#1f2a44" }
}
```

```sh
npx grunnmuren-theme my-project.json --out my-project.css
```

- Roles are nested by role, primitives by colour family. A value is a hex or `rgb()` colour, or a `{reference}` to another token, which falls back to Grunnmuren's value when the file doesn't set it. DTCG `$value` works too.
- Designsystemet's paths (`color.primary.base-default`) read as the same tokens.
- Only what the file sets ends up in the CSS.
- An unknown token, an invalid colour, a circular reference or a token set twice is an error, and exits with 1.
- Contrast is checked with the same pairs as Grunnmuren's own roles, for the pairs where the theme changes a colour. A pair below WCAG 2.2 AA is a warning, and with `--strict` an error and no CSS.
- The theme is named after the file, lowercased and with anything but letters, digits, `-` and `_` turned into `-`. `--name` sets something else. `default` can't be a name, since it resets to Grunnmuren's own values.
- `--example` prints every role token pointing at its default, to start from.

It's the same check as the docs page, and `@obosbbl/grunnmuren-tailwind/theme` exports it as `buildTheme(tokens, { name })` if you'd rather call it yourself, with `toThemeName` for the file name rule.

## Migrating from v1?

To ease the transition from v1 to v2 of Grunnmuren, it is possible to configure the preset to be (partially) compatible with v1. This allows you to use v2 of the Tailwind preset with v1 of the React components, and upgrade your application over time instead of a full migration.

To do that you need to configure the preset with `legacyV1Compatibility` option.

## Options

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')({ includeFontFallback: false })],
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

Here is an example of what your main CSS file **might** look like after migration:

```CSS
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
