---
'@obosbbl/grunnmuren-tailwind': patch
'@obosbbl/grunnmuren-react': patch
---

The 44px touch targets in the components are a fixed `44px` instead of the 11 step, so they keep WCAG's minimum even if `--spacing` changes later. Nothing changes visually.
