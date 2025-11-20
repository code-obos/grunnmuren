---
"@obosbbl/grunnmuren-tailwind": patch
---

Fixes incorrect composition of the `layout-gap-x` utility class. The issue caused the wrong gap on on all screen sizes larger than the `sm` breakpoint. This was visible in the `Card` component in `grunnmuren-react` as well.
