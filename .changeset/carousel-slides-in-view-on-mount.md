---
"@obosbbl/grunnmuren-react": patch
---

Fix `Carousel` so the slides that are visible on mount are interactive right away. Embla's `init` and first `slidesInView` events can fire before the carousel has subscribed to them, which left every slide but the initial one `inert` (unclickable and hidden from screen readers) until the first scroll.
