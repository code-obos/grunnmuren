---
'@obosbbl/grunnmuren-tailwind': minor
---

Add `--gm-space-base` (0.25rem), which Tailwind's `--spacing` now reads, so a theme tightens or loosens every `p-*`, `m-*`, `gap-*`, `w-*`, `h-*` and so on with one value. The `--gm-space-*` steps are worked out from it too, apart from `--gm-space-px`. Nothing changes without a theme. `grunnmuren-theme` takes it as `{ "spacing": { "base": "0.3125rem" } }`.
