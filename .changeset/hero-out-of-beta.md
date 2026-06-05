---
'@obosbbl/grunnmuren-react': minor
---

Hero: out of BETA 🚀

The `UNSAFE_` prefix has been removed from `Hero` (and its context/props types). Update your imports:

### Before

```tsx
import { UNSAFE_Hero as Hero } from '@obosbbl/grunnmuren-react';
```

### Now

```tsx
import { Hero } from '@obosbbl/grunnmuren-react';
```

Also in this release:

- Aspect-ratio rules now skip media that contains any `<video>` element, not just `data-slot="video"` — so other video players (e.g., MuxPlayer) work out of the box.
- Aspect-ratio is now applied to the `<Media>` element itself (instead of the `<img>` inside), so consumers no longer need `!important` overrides when `<Media>` is deeply nested (e.g., inside a `<CarouselItem>`).
