# @obosbbl/grunnmuren-tailwind

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
