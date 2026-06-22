---
"@obosbbl/grunnmuren-react": patch
---

Move the `VideoLoop` play/pause button to the bottom-left corner in larger containers (centered in small ones) and render it with the grunnmuren `Button`. The control is now exposed to assistive technology with a state-driven label so keyboard and screen-reader users can pause the looping motion (WCAG 2.2.2).
