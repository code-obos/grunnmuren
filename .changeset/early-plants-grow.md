---
"@obosbbl/grunnmuren-react": minor
---

Rewrote Carousel component

// Added CarouselItemsContainer component
<CarouselItemsContainer>
  <CarouselItems>
    <CarouselItem>
      <Media>
        <Image src="https://via.placeholder.com/150" alt="Placeholder" />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <Image src="https://via.placeholder.com/150" alt="Placeholder" />
      </Media>
    </CarouselItem>
  </CarouselItems>
</CarouselItemsContainer>

* feat: The carousel now supports rendering multiple items in the viewport simultaneously. Previously, the carousel always rendered a single item at a time.
* feat: The carousel no longer renders the carousel controls (next/prev buttons) by default. Allowing you to customize the controls as needed.
* feat: add `initialIndex` prop to set the initial scroll index.
* feat: add `autoPlayMs` prop to enable automatic scrolling at the given interval.
* feat: add `loop` prop to enable infinite looping/scrolling.
* feat: add `orientation` prop to set the orientation of the carousel, either `vertical` or `horizontal. Default is `horizontal`.
* feat: add `align` prop to set the alignment of the carousel items relative to the viewport. Either `start`, `center`, or `end`. Default is `center`.
