---
"@obosbbl/grunnmuren-react": patch
---

Resolve issues with transitive RAC deps getting out of sync. This has been causing issues with the `FileUpload` component, since it uses some `react-aria` packages that also `react-aria-components` is using.
