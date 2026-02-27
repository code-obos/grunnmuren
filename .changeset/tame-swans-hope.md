---
"@obosbbl/grunnmuren-react": patch
---

Fixes `<Media>` styles set by the `<Carousel>` so that they only target immediate `<Media>`-children, not any nested `<Media>`. This solves issues with incorrect aspect ratios when putting components such as `<Card>` as a `<CarouselItem>`.
