---
'@obosbbl/grunnmuren-tailwind': minor
---

A theme can set its own fonts with `--gm-font-family` and `--gm-font-family-display`. `font-text` and `font-display` read them, and so does text without a font class inside the theme, e.g. `[data-theme='x'] { --gm-font-family: Assistant, sans-serif; }`. The app loads the font files itself. Without a theme the fonts are the same as before.
