---
'@obosbbl/grunnmuren-react': patch
---

Since 3.11.0, styles that target a slot or role inside a component were missing in apps, for instance the rounded corners and overflow on `Card` media. The published bundle escaped the quotes in those class names, so Tailwind generated selectors that never matched. Affects `Card`, `Button` (loading spinner colours), `Alertbox`, `Carousel`, `Modal` and `Table`.
