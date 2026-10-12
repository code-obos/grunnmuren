---
'@obosbbl/grunnmuren-tailwind': minor
---

New `grunnmuren-theme` CLI, which builds a theme's colours from a JSON file with Grunnmuren's token names. A typo in a hand-written custom property silently does nothing and nobody checks a theme's contrast, so it fails on unknown tokens, invalid colours and circular references, and warns about contrast below WCAG 2.2 AA, using the same pairs as Grunnmuren's own roles. `--strict` fails on contrast too.

```sh
npx grunnmuren-theme my-project.json --out my-project.css
```

The same check is exported as `buildTheme` from `@obosbbl/grunnmuren-tailwind/theme`, which is also what the theme guide in the docs runs on.
