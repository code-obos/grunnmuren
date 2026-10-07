---
'@obosbbl/grunnmuren-tailwind': minor
---

The CSS in the Tailwind package reads the role tokens too, so it follows a `data-theme` like the components: the page text and background, text selection, Pagination, Toggletip, Stepper and `prose`. Nearly all of it computes to the same colours as before.

`prose` no longer reads Tailwind's own grey palette. Captions, code, `kbd`, the `pre` background and the table borders move from Tailwind's cool greys to the OBOS greys. The focus outlines stay as they are on purpose, a theme can't change them.
