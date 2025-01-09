---
'@obosbbl/grunnmuren-react': patch
---

Remove TS workaround on the `inert` prop in `<Accordion>`. This type has now been fixed in React 19: https://github.com/facebook/react/issues/17157#issuecomment-2003750544 (prior to React 19, `inert` was not accepted as boolean)
