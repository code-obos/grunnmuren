---
'@obosbbl/grunnmuren-tailwind': minor
'@obosbbl/grunnmuren-react': patch
---

Add `--gm-opacity-scrim` (0.25) and `--gm-color-scrim`, the neutral base colour at that opacity, with a `bg-scrim` utility. `<Modal>` and `<Drawer>` use it for the dimmed page behind them, which looks exactly as before. A theme can set the opacity, and `grunnmuren-theme` takes it as `{ "opacity": { "scrim": 0.4 } }`.
