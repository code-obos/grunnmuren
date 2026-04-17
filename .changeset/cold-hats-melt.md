---
"@obosbbl/grunnmuren-react": patch
---

Update alle react-aria packages, consolidate specific packages into monodeps instead.

There are two deprecation from react-aria-components:
- Combobox
  - `selectedKey` is deprecated, use `value` instead
  - `onSelectionChange` is deprecated, use `onChange` instead
- Select
  - `selectedKey` is deprecated, use `value` instead
  - `onSelectionChange` is deprecated, use `onChange` instead
