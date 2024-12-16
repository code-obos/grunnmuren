# @obosbbl/grunnmuren-react

## 2.0.0-canary.42

### Patch Changes

- 86315e1: Add [hyphens: auto](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens) to Card headings to ensure they don't overflow the card container.

## 2.0.0-canary.41

### Minor Changes

- 9653882: add React 19 as allowed peerDep

### Patch Changes

- 9d5a044: fix type issue with refs for Heading and Content components
- Updated dependencies [9653882]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.3

## 2.0.0-canary.40

### Minor Changes

- 3cb2008: Button: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.
  - improved accessibility for pending state by [utilizing React aria](https://react-spectrum.adobe.com/react-aria/Button.html#pending)
  - button events are now disabled when the button is in a pending state.
  - refactor to CSS instead of useLayoutEffect when button is in a pending state.

### Patch Changes

- bcd1ad3: Fixes line-height on `<CardLink>` so that underline on hover aligns better with the text.
- 87da523: Fixes focus styles on all components using either `<Link>` or `<Button>` from react-aria-components internally.
- 8bdd3e3: Combobox: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.

## 2.0.0-canary.39

### Patch Changes

- 4b40468: Fixes expand/collapse bug in `<Alertbox>` that occured when not passing a `<Footer>`.

## 2.0.0-canary.38

### Minor Changes

- 00e0eea: New component `<DateFormatter>`, that can be used to format dates.
- f32aa43: New `<Card>` component that can serve as either a clickable link or a decorative container. Supporting text content along with images, illustrations and icons.

## 2.0.0-canary.37

### Patch Changes

- 9efdc87: Removes group class from `Accordion` to prevent issues with content that has the `group`-class`.
- f096065: Standardizes focus styles.

## 2.0.0-canary.36

### Minor Changes

- 7932247: add `useLocale()` hook that returns the locale set in GrunnmurenProvider

### Patch Changes

- 4a30610: Fixes background color on inputs with type="search" in Safari

## 2.0.0-canary.35

### Minor Changes

- 860f58a: add `<Badge />` component

### Patch Changes

- 2f1951f: Fixes input height on inputs that sets the size prop.

## 2.0.0-canary.34

### Minor Changes

- f276e97: add `useHref` to GrunnmurenProvider to simplify usage with routers such as Next when using a basepath.

  Example with a Next app and the [basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath) setting set to `/medlem`.

  **Before**

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // Notice how you have to handle the basepath yourself with Grunnmuren's component, but not with Next's.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/medlem/bli-medlem">Bli medlem</Button>
  ```

  **After**

  ```js
  // app/providers.tsx
  'use client'
  import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
  import { useRouter } from 'next/navigation';

  export function Providers({children, locale}: { children: React.ReactNode, locale: string}) {
    const router = useRouter();
    const useHref = (href: string) => '/medlem' + href;

    return (
      <GrunnmurenProvider locale={locale} navigate={router.push} useHref={useHref}>
        {children}
      </GrunnmurenProvider>
    )
  }
  ```

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // The hrefs are the same, as basepath is handled by the useHref hook in the provider.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/bli-medlem">Bli medlem</Button>
  ```

### Patch Changes

- de38e17: Removes white background color on `<Button variant="secondary"/>` to make it transparent and work well in a conatiner with any light color (not just white)
- ee2da0c: fix: Button should keep it's width when in isLoading state
- ee2da0c: refactor: use useLayoutEffect from react-aria instead of rolling our own. Reduces bundle size by a few bytes

## 2.0.0-canary.33

### Patch Changes

- 08cc710: Fixes input height issue in `<TextField/>` component on Safari mobile.
- 3d9a230: Increases click area on `Radio` and `Checkbox` so that it is minimum 44x44 px when used without children.
- 3d9a230: Fixes an issue with the click area on `Radio` and `Checkbox` where the area just to the left of the radio/checkbox gave a hover effect that indicated that the pointer was in the click area, but no click event fired.
- 845a3bb: Button/Backlink: render Button if href is undefined
- 34ae950: Fixes an issue with scrollbars overflowing the border radius on popovers, and incorrect painting of the popover border in some browsers. This affects both the `<Select/>` component and the `<ComboBox/>` component.
- 94b2a45: fix: render Backlink as <button> when no href is provided, as it is more semantically correct

## 2.0.0-canary.32

### Minor Changes

- ee10040: Button: change implementation to use Button/Link from react-aria-components.

  - `onClick` prop is now called `onPress`.
  - Button, when used with a href, now works as expected with the `navigate` prop in `<GrunnmurenProvider>`.

## 2.0.0-canary.31

### Patch Changes

- 94ec4f6: Breadcrumbs: remove browser's default outline for the links, use focus-visible for focus ring
- b8efb04: Backlink: use cursor-pointer

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
