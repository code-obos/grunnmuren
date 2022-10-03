# @obosbbl/grunnmuren-react

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
