---
'@obosbbl/grunnmuren-tailwind': minor
'@obosbbl/grunnmuren-react': patch
---

Add `--gm-radius-base`. Every `rounded-*` step is now a multiple of it, so a theme can round or square off the whole scale with one value, e.g. `[data-theme='x'] { --gm-radius-base: 0; }`. A theme can still set a single step like `--gm-radius-lg`. Without a theme every corner is the same as before.

For now that's for themes written in CSS. `grunnmuren-theme` and the theme builder in the docs only do colours, and radius support there comes later.

`<ProgressBar>` uses `rounded-sm` instead of `rounded`, which is the same size but follows the theme.
