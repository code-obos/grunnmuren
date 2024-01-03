# @obosbbl/grunnmuren-react

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
