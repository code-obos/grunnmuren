---
"@obosbbl/grunnmuren-tailwind": patch
---

Fix `layout-subgrid-*` shared styles being dropped in some consumer production builds by inlining `layout-grid-gap-x` and `grid` into each `layout-subgrid-N` utility
