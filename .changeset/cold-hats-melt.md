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

Small correction in what we export from ListBox. We exported ListBoxHeadingProps which was an re-export from HeadingProps, but ListBox uses Header and not Heading so we correctly export ListBoxHeaderProps now. This may be a breaking change for some.