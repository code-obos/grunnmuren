---
'@obosbbl/grunnmuren-react': patch
---

Button: `color="accent"` and `color="neutral"` get their own role colours again. Since 3.11.0 they rendered as `primary`, because the button never set `data-color` to its role like the docs said it does. A `data-color` you pass yourself still wins.
