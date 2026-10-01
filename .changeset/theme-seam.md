---
'@obosbbl/grunnmuren-tailwind': minor
---

Adds `data-theme` and `data-color`, so an app can theme Grunnmuren itself. A theme is a `[data-theme='…']` rule in the app's own CSS that sets `--gm-*` primitives or role colours, and it works on part of a page too. The README lists which tokens a theme can set. Those are now public API. `data-color` picks which role (`primary`, `accent` or `neutral`) the new short utilities such as `bg-base-default` and `text-text-default` use.

Radius now goes through `--gm-radius-*` so a theme can change it. The values are still Tailwind's, so no `rounded-*` changes. Note that if you override `--radius-*` in your own `@theme` and also use `data-theme`, the override doesn't reach inside the `data-theme`: set `--gm-radius-*` instead.

The reduced-motion durations are now `!important`, so a theme can't turn reduced motion off by setting its own durations.
