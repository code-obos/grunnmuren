---
'@obosbbl/grunnmuren-react': patch
---

- Import components from root package instead of subpaths for each component
- Bundle the library with bunchee instead of unbuild, as it preserves `use client;` directives
- Export `<Form />` component from RAC
