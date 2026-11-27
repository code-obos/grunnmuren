---
'@obosbbl/grunnmuren-react': patch
'@obosbbl/grunnmuren-tailwind': patch
---

Cleanup after the oxlint update, no visual changes.

- `<VideoLoop>` and `<Carousel>` read the reduced motion preference with `useSyncExternalStore`, so a client-side render gets the right value straight away instead of on the next render.
- `<Carousel>` numbers its items without changing a variable during render.
- Removes trailing commas in the `layout-grid` selector lists, which oxfmt couldn't parse.
