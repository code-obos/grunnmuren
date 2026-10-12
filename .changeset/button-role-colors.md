---
'@obosbbl/grunnmuren-react': minor
---

Button's `color` takes the roles now: `primary`, `accent` and `neutral`, plus `contrast` for the white button on dark backgrounds. `accent` (dark green) and `neutral` (grey) are new.

`blue`, `mint` and `white` still work but are deprecated, and go in the next major. `blue` is `primary` and looks the same. `white` is `contrast` and looks the same. `mint` still looks mint, and its pressed state works again. Use `contrast` for new code, mint has no role and won't follow a theme.

The button sets `data-color` to its role, so the role shows up in the DOM. A `data-color` you pass yourself still wins.
