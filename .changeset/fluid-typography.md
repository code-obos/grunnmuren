---
'@obosbbl/grunnmuren-tailwind': minor
---

`heading-xl` to `heading-xs`, `lead` and `lead-sm` scale smoothly with the viewport through the `clamp()` tokens, instead of jumping in size at `lg`. The smallest and largest sizes are the same as before, but everything in between changes, so every heading on every page moves a little.

The line height comes from the tokens too, 1.5 on every level. That's looser than today on `heading-xl` (about 1.3) and slightly tighter on the others (about 1.55 to 1.6).
