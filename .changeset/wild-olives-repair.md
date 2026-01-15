---
"@obosbbl/grunnmuren-react": patch
---

Exposing `UNSAFE_CarouselContext`, usage:

```tsx
const { slidesInView, orientation } = useContext(UNSAFE_CarouselContext);
```

The `slidesInView` is an array of the indexes of the the CarouselItems that are currently in view. While `orientation` is  `'horizontal'` or `'vertical'`