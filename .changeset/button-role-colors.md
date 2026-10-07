---
'@obosbbl/grunnmuren-react': minor
---

Button's `color` takes the roles now: `primary`, `accent` and `neutral`, plus `contrast` for the white button on dark backgrounds. `accent` (dark green) and `neutral` (grey) are new.

`blue`, `mint` and `white` still work but are deprecated, and go in the next major. `blue` is `primary` and looks the same. `white` is `contrast` and looks the same. `mint` is `contrast` too, so **a mint button turns white**. Mint was only for dark backgrounds, where the white button does the same job.
