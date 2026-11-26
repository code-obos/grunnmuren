---
'@obosbbl/grunnmuren-tailwind': patch
'@obosbbl/grunnmuren-react': patch
---

The touch targets in the components are at least `44px` (`min-h-[44px]` and `min-w-[44px]`) instead of the 11 step. They keep WCAG's minimum even if `--spacing` changes later, and grow with bigger text instead of cutting it off. The text in the secondary Tabs sits 2px higher, centred in the tab.
