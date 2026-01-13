---
"@obosbbl/grunnmuren-react": patch
---

BREAKING CHANGE: Rewrote the carousel component from the ground up. It is now using [Embla carousel library](https://www.embla-carousel.com/) under the hood.
This unlocks the component to be used as a more "traditional carousel", for instance, for an image gallery. The previous implementation was primarily designed for use in the hero.

To migrate, do the following:
* wrap your carousel items in a `CarouselItemsContainer` component
* add the `CarouselControls` component with the `CarouselButton` components to render the next and previous buttons
* rename `onChange` to `onSelect`. If you only used this for analytics purposes, consider using the `onSettled` callback instead.

```tsx
<Carousel onSelect={(index) => console.log(index)} onSettled={(index) => console.log(index)}>
  <CarouselItemsContainer>
    <CarouselItems>
      <CarouselItem>
        <Media>
          <img src="..." alt="..." data-slot="media" />
        </Media>
      </CarouselItem>
      <CarouselItem>
        <Media>
          <img src="..." loading="lazy" alt="..." data-slot="media"/>
        </Media>
      </CarouselItem>
    </CarouselItems>
  </CarouselItemsContainer>
  <CarouselControls>
    <CarouselButton slot="prev" />
    <CarouselButton slot="next" />
  </CarouselControls>
</Carousel>

```

* feat: The carousel now supports rendering multiple items in the viewport simultaneously. Previously, the carousel always rendered a single item at a time.
* feat: The carousel no longer renders the carousel controls (next/prev buttons) by default. You now have to render them yourself using the `CarouselControls` component. This allows you to customize the appearance of the controls, or even create your own custom controls using the `next` and `prev` component slots. 
* feat: add `initialIndex` prop to set the initial scroll index.
* feat: add `autoPlayMs` prop to enable automatic scrolling at the given interval.
* feat: add `loop` prop to enable infinite looping/scrolling.
* feat: add `orientation` prop to set the orientation of the carousel, either `vertical` or `horizontal`. Default is `horizontal`.
* feat: add `align` prop to set the alignment of the carousel items relative to the viewport. Either `start`, `center`, or `end`. Default is `center`.
* feat: add `onSettled` prop to invoke a callback when interaction with the carousel has "settled".
* refactor: update `<Hero>` styling to accommodate for carousel changes.
