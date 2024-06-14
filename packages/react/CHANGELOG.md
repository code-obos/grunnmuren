# @obosbbl/grunnmuren-react

## 2.0.0-canary.30

### Patch Changes

- bfec6ef: Fixes popover overflow in `Combobox` and `Select`

## 2.0.0-canary.29

### Patch Changes

- 1d29985: fix: make TextArea/Select usable against non white backgrounds
- 7cef865: fix: error messages were missing when using native validation

## 2.0.0-canary.28

### Patch Changes

- b168eb1: upgrade react-aria-components to 1.2.0
- 41642ab: Fixes scrolling and autoscrolling bug in `<Combobox/>` and `<Select/>`.
- 02592b2: TextField, Select, TextArea, Combobox:
  Increase font size from 14px to 16px to prevent zooming on iOS
  when input field is focused.

  TextField: Fix issue with `type="date"` where the size of the input was off.

## 2.0.0-canary.27

### Patch Changes

- da3a2a0: Removes redundant wrapper div on Checkbox description.

## 2.0.0-canary.26

### Patch Changes

- d98c7a9: Fixes infinite re-renders in CheckboxGroup with Checkboxes that has the description prop set.
- d86d439: Fix width of TextField and NumberField with left/rightAddon

## 2.0.0-canary.25

### Minor Changes

- dcb804a: Adds support for custom size on `TextField` and `NumberField`.

### Patch Changes

- 53ae6f0: RadioGroup/CheckboxGroup: add support for displaying error messages when used in a `<Form>` component with the `validationErrors` prop. This enables the use of server side validation for these components.

## 2.0.0-canary.24

### Patch Changes

- 0cd21d8: Accordion: explictly set heading font size to prevents global heading styles to affect it's size

## 2.0.0-canary.23

### Patch Changes

- 2bfbfaf: Accordion: Fix icon size shrinking with long texts

## 2.0.0-canary.22

### Patch Changes

- 335b6b5: Fixes focus-visible on the Backlink component.

## 2.0.0-canary.21

### Patch Changes

- 687cdec: Reverts back to using the Link component from RAC in Backlink.

## 2.0.0-canary.20

### Patch Changes

- b2ce9a7: Fixes focus-visible styling for Backlinks.
- ce83bec: Fixes issue with custom underline on backlinks that wraps over multiple lines.

## 2.0.0-canary.19

### Patch Changes

- d3ed719: Fixes typo in docs and reduced underline height on `<Backlink/>`.
- eaa8d74: Fixes hover style on backlink so that underline is applied even when something other than the text is hovered in the link.

## 2.0.0-canary.18

### Minor Changes

- cb3286b: New `<Backlink/>` component.

Example:
`<Backlink href="/my-path"/>`

## 2.0.0-canary.17

### Minor Changes

- ef11713: Adds support for accordions that are wrapped by a container with a background color.

## 2.0.0-canary.16

### Minor Changes

- 8b84eb5: Add Accordion and AccordionItem components. Use as follows:

  ```jsx
  <Accordion>
    <AccordionItem>
      <Heading>Item 1</Heading>
      <Content>Item 1</Content>
    </AccordionItem>
    <AccordionItem>
      <Heading>Item 2</Heading>
      <Content>Item 2</Content>
    </AccordionItem>
  </Accordion>
  ```

## 2.0.0-canary.15

### Patch Changes

- a22d890: add white background to inputgroup

## 2.0.0-canary.14

### Minor Changes

- 60d6d9e: Rename `<I18nProvider />` to `<GrunnmurenProvider />`. Explicitly set supported languages to `nb,`, `sv` and `en`, with `nb` as the default.
- 5175169: Add Breadcrumbs and Breadcrumb components
- e0ab2b0: Add `navigate` prop to `<GrunnmurenProvider>` for integration with client side routers such as next/router.

### Patch Changes

- 969ec11: \* Update react-aria-components to 1.1.1
  - Add `use client;` directive to Grunnmuren for better RSC compatibility

## 2.0.0-canary.13

### Minor Changes

- 1217ade: \* Export `<Alertbox />`, `<Heading />`, `<Content />` and `<Footer />` components.
  - Prop renaming for dismissable alertboxes.
  - Add `isExpandable` prop to AlertBox to make content expandable.

## 2.0.0-canary.12

### Minor Changes

- dcb1e5c: Added new component `<Alertbox/>` for dismissable and non-dismissable alerts.

### Patch Changes

- 73d8c88: fix issue with missing spacing/gap when using TextField with addons

## 2.0.0-canary.11

### Minor Changes

- 24261c1: Added sub-components to `<Select/>` and `<Combobox/>` to enable grouping of the listbox items.

## 2.0.0-canary.10

### Patch Changes

- 1367c42: Fixed inconsistent spacing in buttons with icon and text.

## 2.0.0-canary.9

### Patch Changes

- 4bbfe32: Export NumberField component and Props type

## 2.0.0-canary.8

### Minor Changes

- 899a5e0: Added new component for numbers using the `<NumberField/>` from RAC. This component and it's stories are very similar to the `<TextField/>` component

## 2.0.0-canary.7

### Patch Changes

- 56b6cb6: fix invisible ring on input (safari v<17)

## 2.0.0-canary.6

### Patch Changes

- 248007d: fix screen reader issue with Checkbox

## 2.0.0-canary.5

### Patch Changes

- 39c848e: fix: add missing `use client` directive to Button component

## 2.0.0-canary.4

### Patch Changes

- 16e0788: add forwardRef support for better compat with react-hook-form

## 2.0.0-canary.3

### Minor Changes

- 38c2d3d: add I18nProvider

### Patch Changes

- c2a8150: rename Button component's `loading` prop to `isLoading` to align better with other prop names

## 2.0.0-canary.2

### Minor Changes

- c59ed0f: improve support for HTML forms and native form validation in form components

### Patch Changes

- 7621625: add Select component
- 834c1a9: - Import components from root package instead of subpaths for each component
  - Bundle the library with bunchee instead of unbuild, as it preserves `use client;` directives
  - Export `<Form />` component from RAC
- 0b9d56a: loosen version requirement for react-aria-components dependency
- 7a62218: - improve TextField focus/invalid styles
  - improve TextArea focus/invalid styles
  - improve Select focus/invalid styles
  - refactor: share styles between form components
  - add Comobox component
- Updated dependencies [834c1a9]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.1

## 2.0.0-canary.1

### Minor Changes

- 425dac9: Button: add support for `isIconOnly` to render a button with a single icon

## 2.0.0-canary.0

### Major Changes

- 237d9cb7: V2 canary release

### Patch Changes

- Updated dependencies [3e7d9743]
- Updated dependencies [56474385]
- Updated dependencies [237d9cb7]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.0
