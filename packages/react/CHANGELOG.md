# @obosbbl/grunnmuren-react

## 2.0.0

### Minor Changes

- 47c41f1: Add new colors mint and sky. Old colors are deprecated

  `blue-light` -> `sky`
  `blue-lightest` -> `sky-light`

  `green-light` -> `mint`
  `green-lightest` -> `mint-light`

  `gray-concrete` -> -> `gray-lightest`

  `<Button>` has a new Color-prop `mint` which is the same as `light-green`.

  `<Chip>` has new Color-props `mint` and `sky` which are the same as `green-light` and `blue-light` respectively.

  `<CardList> | <Banner>` have new Color-props `mint` and `sky` which are the same as `green` and `blue` respectively

  The old props and colors are deprecated and will be removed in the next major version.

### Patch Changes

- Updated dependencies [47c41f1]
  - @obosbbl/grunnmuren-tailwind@0.9.0

## 1.12.4

### Patch Changes

- 13f0663: Fix banner text getting cut off on smaller screens.

## 1.12.3

### Patch Changes

- 3eaf9bc: Use full width on hero on iPad.
- c8c1456: - Place content of banner in center.
  - Make icon and heading smaller.
  - Place icon in center on mobile.

## 1.12.2

### Patch Changes

- 30835a8: fix issue with using package in webpack due to dependency not being proper esm

## 1.12.1

### Patch Changes

- bacaf34: Fix react-use exports

## 1.12.0

### Minor Changes

- e815527: add `'use client';` directive for better RSC (Next 13 app directory) interop.
- d927d2f: update Vite to v4 (used for building and bundling Grunnmuren)

### Patch Changes

- a2750e9: fix: Grunnmuren icons were erroneously inlined in the build. Now they are properly externalized. Reduces the bundle size.
- Updated dependencies [d927d2f]
  - @obosbbl/grunnmuren-icons@0.6.0

## 1.11.1

### Patch Changes

- 90445cf: Snackbar: update design

## 1.11.0

### Minor Changes

- cbcc712: Hero: add ref support to Hero components
  HeroContent: semibold description

## 1.10.0

### Minor Changes

- 4ffe193: Campaign/Card: add possibility to send refs to components

## 1.9.0

### Minor Changes

- 18ffbba: Minor changes to `<RadioGroup>`:

  - moved `description` from under radio-buttons to over radio-buttons
  - add support for `error` props

## 1.8.0

### Minor Changes

- f44b6ea: Several changes to `<Select>` to make it actually usable:

  - fix padding and focus styles
  - add support `size` prop
  - add support for `label`, `description` and `error` props

### Patch Changes

- 97db7a1: TextField: minor adjustments to match Figma
- 97db7a1: minor adjustments to input error message to match Figma design
- e0a71da: Checkbox: improve alignment of input when label spans multiple lines
- e0a71da: Radio: improve alignment of input when label spans multiple lines
- Updated dependencies [e0a71da]
  - @obosbbl/grunnmuren-tailwind@0.8.4

## 1.7.0

### Minor Changes

- 58a8f70: StepList: support both top and center alignment of the bullets
- ccd20f6: new Pagination component

## 1.6.2

### Patch Changes

- 634cc15: reduce vertical padding Card content on desktop
- Updated dependencies [d38815c]
  - @obosbbl/grunnmuren-tailwind@0.8.3

## 1.6.1

### Patch Changes

- 3373f91: LoadingSpinner icon is now squared so it looks better when spinning
- 887797e: centered text for each step in StepList
- 26071ba: deprecated custom utility class `.fake-font-bold`. It was based on non standard CSS, and looked awful on non HD-screens
- Updated dependencies [3373f91]
- Updated dependencies [3373f91]
- Updated dependencies [26071ba]
  - @obosbbl/grunnmuren-icons@0.5.1
  - @obosbbl/grunnmuren-tailwind@0.8.1

## 1.6.0

### Minor Changes

- 298bb54: change peer dependency requirement to Tailwind 3.2 or higher

### Patch Changes

- e47cb6d: deprecate custom `<md` variant. Use Tailwind 3.2 max width variants instead
- 1de604e: refactor Accordion to use Tailwind ARIA attribute variants
- eca94b7: set light gray (#e6e6e6) as the default border color
- Updated dependencies [298bb54]
- Updated dependencies [e47cb6d]
- Updated dependencies [eca94b7]
  - @obosbbl/grunnmuren-tailwind@0.8.0

## 1.5.1

### Patch Changes

- ab7051e: fix accessibility issue for form components

## 1.5.0

### Minor Changes

- 0878943: Better support for custom validation. Added `disableValidation` in `<TextField>`, `<TextArea>` and `<Checkbox>`, and support `noValidate` on the form element.

### Patch Changes

- Updated dependencies [3191a8a]
  - @obosbbl/grunnmuren-tailwind@0.7.3

## 1.4.9

### Patch Changes

- 2d2142b: Forms: support reactNode for description in TextField/TextArea/RadioGroup

## 1.4.8

### Patch Changes

- f0eaaac: ensure the content of StepListItem's bullet is centered
- Updated dependencies [a2cbbd1]
  - @obosbbl/grunnmuren-tailwind@0.7.1

## 1.4.7

### Patch Changes

- 0266845: fix footer rendering artifact that sometimes occurs on specific screen sizes and zoom levels

## 1.4.6

### Patch Changes

- 1efe800: fix focus styling for accordion

## 1.4.5

### Patch Changes

- 42db773: Chip design 🤝 figma design

## 1.4.4

### Patch Changes

- a319da9: Move react-collapse from devDependencies to dependencies

## 1.4.3

### Patch Changes

- 28abc9c: export `Accordion` component

## 1.4.2

### Patch Changes

- 12053e1: \* add `<Accordion>` wrapper for spacing multipe `<AccordionItem>`s.
  - increase bottom padding of `<AccordionContent>`

## 1.4.1

### Patch Changes

- 97b9622: fix space between asterix and label

## 1.4.0

### Minor Changes

- 9e2b9e6: added Accordion component
- b508b81: add Columns and LoadingSpinner icons
- c99454c: new layout classes to work with footer and navbar
- 5576c0b: add leftAddon/rightAddon to input and update design

### Patch Changes

- bb2afc5: remove rounded corners for hero images
- Updated dependencies [b508b81]
- Updated dependencies [c99454c]
- Updated dependencies [7fbded0]
  - @obosbbl/grunnmuren-icons@0.5.0
  - @obosbbl/grunnmuren-tailwind@0.7.0

## 1.3.0

### Minor Changes

- e670cee: add Chip component
- 1656873: add `loading` modifier to Button component

### Patch Changes

- Updated dependencies [e402a1b]
- Updated dependencies [1656873]
- Updated dependencies [e678fb5]
  - @obosbbl/grunnmuren-icons@0.4.0
  - @obosbbl/grunnmuren-tailwind@0.6.0

## 1.2.1

### Patch Changes

- a999b86: Radio: added forwardRef to Radio and RadioGroup
- 09c0177: change display from `inline-block` to `inline-flex` for Button component.

  Makes rendering icons inside the button easier.

- Updated dependencies [09c0177]
  - @obosbbl/grunnmuren-tailwind@0.5.1

## 1.2.0

### Minor Changes

- 9cc644a: add radio group

### Patch Changes

- a3d49cf: refactor button styling to a Tailwind component
- Updated dependencies [9cc644a]
- Updated dependencies [a3d49cf]
  - @obosbbl/grunnmuren-tailwind@0.5.0

## 1.1.2

### Patch Changes

- 20b2833: checkbox: fixed white background to checkbox that is checked
- Updated dependencies [20b2833]
  - @obosbbl/grunnmuren-tailwind@0.4.2

## 1.1.1

### Patch Changes

- 105c8f9: Select: export component

## 1.1.0

### Minor Changes

- 78b1eff: add Campaign component
- f4e98c3: rename Stepper component to StepList

### Patch Changes

- 6211f0c: CardLinkOverlay: forward className
- 631d69e: Checkbox: Add optional FormErrorMessage box, using prop error?: string
- 429606c: Add flex-none to Checkbox to avoid non-quadratic shape when used with text wrapping multiple lines
- 6211f0c: CardLinkOverlay: remove unecessary custom before content class

## 1.0.1

### Patch Changes

- Updated dependencies [b0a849d]
  - @obosbbl/grunnmuren-tailwind@0.4.1

## 1.0.0

### Minor Changes

- ec522cd: remove deprecated IconLegacy component

### Patch Changes

- Updated dependencies [21a0273]
  - @obosbbl/grunnmuren-tailwind@0.4.0

## 0.3.0

### Minor Changes

- 9c74a8b: add `<Stepper>` component
- abd07c8: make `@obosbbl/grunnmuren-tailwind` an optional peer dependency

## 0.2.3

### Patch Changes

- b437225: fixed issue where you couldn't set another type attribute than `text` for TextField

## 0.2.2

### Patch Changes

- Updated dependencies [1ec74a7]
  - @obosbbl/grunnmuren-tailwind@0.3.1

## 0.2.1

### Patch Changes

- Updated dependencies [0a0ffa8]
- Updated dependencies [0d9f071]
  - @obosbbl/grunnmuren-tailwind@0.3.0

## 0.2.0

### Minor Changes

- 9a478c6: add in built validation to TextField and TextArea using HTML validation constraint API

## 0.1.1

### Patch Changes

- Updated dependencies [a4b49bc]
  - @obosbbl/grunnmuren-tailwind@0.2.1

## 0.1.0

### Minor Changes

- e3188ea: Initial release

### Patch Changes

- Updated dependencies [18680fa]
- Updated dependencies [3e9d5b3]
- Updated dependencies [0cbeed9]
  - @obosbbl/grunnmuren-tailwind@0.2.0
