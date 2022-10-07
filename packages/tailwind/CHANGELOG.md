# @obosbbl/grunnmuren-tailwind

## 0.7.1

### Patch Changes

- a2cbbd1: changed maxwidth and width prose to 696px

## 0.7.0

### Minor Changes

- c99454c: new layout classes to work with footer and navbar

### Patch Changes

- 7fbded0: less rounded page corners. Matches figna spec

## 0.6.0

### Minor Changes

- 1656873: add `loading` modifier to Button component

### Patch Changes

- e678fb5: refactor button hover css to make it more flexible

## 0.5.1

### Patch Changes

- 09c0177: change display from `inline-block` to `inline-flex` for Button component.

  Makes rendering icons inside the button easier.

## 0.5.0

### Minor Changes

- 9cc644a: add radio group

### Patch Changes

- a3d49cf: refactor button styling to a Tailwind component

## 0.4.2

### Patch Changes

- 20b2833: checkbox: fixed white background to checkbox that is checked

## 0.4.1

### Patch Changes

- b0a849d: Add 2rem extra to container and container-prose to get correct width because we use 1rem padding on both sides as well

## 0.4.0

### Minor Changes

- 21a0273: Add configuration option for container size (80rem or 90rem)

## 0.3.1

### Patch Changes

- 1ec74a7: Fix handling default options

## 0.3.0

### Minor Changes

- 0d9f071: Add configuration option fontBasePath

### Patch Changes

- 0a0ffa8: hide discloure arrow in safari when `list-none` is applied to the `<summary>` element

## 0.2.1

### Patch Changes

- a4b49bc: fix bullet list colors and spacing in prose class

## 0.2.0

### Minor Changes

- 3e9d5b3: remove `.gm-` prefix from custom components
- 0cbeed9: Use new OBOS font.

  Supply the option `{useLegacyFont: true}` to the preset to continue using the old font.

### Patch Changes

- 18680fa: fix prose width after changing to the new font

## 0.1.0

### Minor Changes

- 32d31e0: Initial release
