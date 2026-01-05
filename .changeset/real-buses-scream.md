---
"@obosbbl/grunnmuren-react": patch
---

* feat: added `defaultInitialSlide` prop to `<Carousel>` to set the initial slide of the carousel.
* refactor: rewrote `<Carousel>` implementation to be more efficient. It now uses CSS scroll snap events in browsers that support it, and falls back to intersection observer for browsers that don't support scroll snap events.
* fix: fixed a bug in Firefox where the carousel would not scroll to the correct slide when using the arrow keys, unless the carousel was explicitly focused first.
* fix: fixed a bug where hitting the arrow keys multiple times in quick succession would cause the carousel to scroll half a slide.
