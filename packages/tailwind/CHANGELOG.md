# @obosbbl/grunnmuren-tailwind

## 2.0.0

### Major Changes

- 8ad2fcd: V2 canary release
- f63006a: Fix font-weight on strong tags in prose content (use 500 instead of 600)
- 436ea29: # Upgrade to Tailwind 4

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

- 5a9534b: BREAKING CHANGE: Update font setup to include new font-family, `OBOSDisplay`.

  - Remove OBOSText-Bold in favor of OBOSDisplay-SemiBold.
  - Change font-family of `heading-xl` and `heading-l` to OBOSDisplay.
  - Change name of font-family `OBOSFont` to `OBOSText` to make the distinction between OBOSDisplay and OBOSText clearer.
  - Remove Tailwind's default `font-sans` utility in favor of `font-display` and `font-text` to change the font family.
    - If you were previously using next/font and extending the font family in your Tailwind configuration to support that, you should remove all this as the preset now includes an in built font-fallback.

- 6482fad: Updated typography design.

  - BREAKING: Deprecate `.h1`, `.h2`, `.h3` and `.h4` classes
  - Add heading classes with "t-shirt sizes": `.heading-xl`, `.heading-l`, `.heading-m`, `.heading-s` and `.heading-xs`
  - Add classes: `.paragraph`, `.lead`, `.blockquote` and `.description`
    New design on `<h1>`-`<h4>` for both utility classes and prose.
  - Update lineheight and fontsize for all typograhpy
  - Update `.prose` class with new typography.

### Minor Changes

- a0bdc73: feat: built in font optimization with a fallback font, in similar vein to next/font. Enabled by default, can be disabled by passing `includeFontFallback: false` to the preset.
- b5c86a5: Exposes custom properties for container width and gutter, along with all custom colors.
- 7621625: add Tailwind animation plugin

### Patch Changes

- f457060: include Tailwind's default `font-mono` utility for setting the font family.

  OBOS doesn't have a monospaced font, so we use Tailwind's default here.

- 06a7fa3: Add back missing `.page-layout` and `.page-layout-main` classes that were removed by mistake in v2.
  This should fix layouts where the main page content isn't tall enough to push the footer down to the bottom
  of the screen.
- 066c74f: Increases breakpoint from `md` to `lg` for mobile font styles on typography
- ab9d08a: Add custom styling to `<code>` in prose content
- 8fe9e00: fix: use correct font-family for headings in v1 compatibility mode
- f096065: Standardizes focus styles.
- 585e6da: Fixes the custom colors so they work with tailwinds [opacity modifier](https://tailwindcss.com/docs/text-color#changing-the-opacity)
- 6b2f461: Fixes styling on lists in prose.
- 7a62218: Set tailwindcss 3.4.0 as the minimum peer dep
- 7190630: minor adjustment of heading sizes

## 2.0.0-canary.12

### Patch Changes

- ab9d08a: Add custom styling to `<code>` in prose content

## 2.0.0-canary.11

### Major Changes

- f63006a: Fix font-weight on strong tags in prose content (use 500 instead of 600)

## 2.0.0-canary.10

### Patch Changes

- 585e6da: Fixes the custom colors so they work with tailwinds [opacity modifier](https://tailwindcss.com/docs/text-color#changing-the-opacity)

## 2.0.0-canary.9

### Patch Changes

- f457060: include Tailwind's default `font-mono` utility for setting the font family.

  OBOS doesn't have a monospaced font, so we use Tailwind's default here.

## 2.0.0-canary.8

### Patch Changes

- f096065: Standardizes focus styles.

## 2.0.0-canary.7

### Minor Changes

- b5c86a5: Exposes custom properties for container width and gutter, along with all custom colors.

## 2.0.0-canary.6

### Patch Changes

- 066c74f: Increases breakpoint from `md` to `lg` for mobile font styles on typography

## 2.0.0-canary.5

### Patch Changes

- 6b2f461: Fixes styling on lists in prose.

## 2.0.0-canary.4

### Patch Changes

- 8fe9e00: fix: use correct font-family for headings in v1 compatibility mode

## 2.0.0-canary.3

### Major Changes

- 5a9534b: BREAKING CHANGE: Update font setup to include new font-family, `OBOSDisplay`.

  - Remove OBOSText-Bold in favor of OBOSDisplay-SemiBold.
  - Change font-family of `heading-xl` and `heading-l` to OBOSDisplay.
  - Change name of font-family `OBOSFont` to `OBOSText` to make the distinction between OBOSDisplay and OBOSText clearer.
  - Remove Tailwind's default `font-sans` utility in favor of `font-display` and `font-text` to change the font family.
    - If you were previously using next/font and extending the font family in your Tailwind configuration to support that, you should remove all this as the preset now includes an in built font-fallback.

- 6482fad: Updated typography design.

  - BREAKING: Deprecate `.h1`, `.h2`, `.h3` and `.h4` classes
  - Add heading classes with "t-shirt sizes": `.heading-xl`, `.heading-l`, `.heading-m`, `.heading-s` and `.heading-xs`
  - Add classes: `.paragraph`, `.lead`, `.blockquote` and `.description`
    New design on `<h1>`-`<h4>` for both utility classes and prose.
  - Update lineheight and fontsize for all typograhpy
  - Update `.prose` class with new typography.

### Minor Changes

- a0bdc73: feat: built in font optimization with a fallback font, in similar vein to next/font. Enabled by default, can be disabled by passing `includeFontFallback: false` to the preset.

### Patch Changes

- 06a7fa3: Add back missing `.page-layout` and `.page-layout-main` classes that were removed by mistake in v2.
  This should fix layouts where the main page content isn't tall enough to push the footer down to the bottom
  of the screen.

## 2.0.0-canary.2

### Minor Changes

- 7621625: add Tailwind animation plugin

### Patch Changes

- 7a62218: Set tailwindcss 3.4.0 as the minimum peer dep

## 2.0.0-canary.1

### Patch Changes

- 7190630: minor adjustment of heading sizes

## 2.0.0-canary.0

### Major Changes

- 237d9cb7: V2 canary release
