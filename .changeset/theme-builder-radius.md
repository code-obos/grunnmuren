---
'@obosbbl/grunnmuren-tailwind': minor
---

`grunnmuren-theme` and `buildTheme` take radius too: `{ "radius": { "base": "0.5rem" } }`, and single steps like `radius.lg`. A value is a length in rem, px or em, or `0`, and anything else is an `invalid-dimension` error. The radius tokens are listed in `tokens/themeable.json`, which is where other kinds of tokens, like fonts, go later.
