---
'@obosbbl/grunnmuren-react': patch
---

Fix `Modal`/`Drawer` `Header` and `Footer` layout not being applied in consuming apps since 3.11.0 (close button was placed below the heading). The build escaped the quotes in the `data-[slot="…"]` classes, so Tailwind could not detect them when scanning `dist`.
