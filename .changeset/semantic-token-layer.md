---
'@obosbbl/grunnmuren-tailwind': minor
---

Add the semantic token layer from the design team's token set. Every `--gm-*` primitive and role token (`primary`, `accent`, `neutral`, `success`, `danger`, `warning`, `info`) is now available as a CSS custom property, and each role colour gets a utility such as `bg-primary-base-default` or `text-neutral-text-subtle`.

This is purely additive. No existing utility, colour or rule changes, and nothing uses the new tokens yet. Spacing and type tokens are exposed as custom properties only and are not mapped onto Tailwind's own keys. Radius keeps using Tailwind's own scale.

Also adds a `prefers-reduced-motion` block that zeroes the movement durations (`curtain`, `reveal`, `slide`).
