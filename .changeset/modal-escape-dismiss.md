---
'@obosbbl/grunnmuren-react': patch
---

Fix `UNSAFE_Modal` so `isDismissable={false}` also disables closing via `Escape`. Previously only outside-click was disabled, while `Escape` still closed the modal — inconsistent with the prop's name.
