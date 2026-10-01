---
'@obosbbl/grunnmuren-tailwind': minor
---

Adds the rest of the role colours from the design team's token set: all 16 roles for `success`, `danger`, `warning` and `info`, each with a utility such as `bg-success-surface-default` or `text-danger-text-subtle`. Also adds size, line height and letter spacing for `--gm-paragraph-medium-*` and `--gm-description-medium-*`, next to the font weight that was already there.

The token CSS is now generated from that token set instead of being ported by hand. Every existing variable keeps its name and value.
