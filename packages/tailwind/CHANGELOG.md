# @obosbbl/grunnmuren-tailwind

## 2.4.1

### Patch Changes

- 25b08b0: Fixes incorrect composition of the `layout-gap-x` utility class. The issue caused the wrong gap on on all screen sizes larger than the `sm` breakpoint. This was visible in the `Card` component in `grunnmuren-react` as well.

## 2.4.0

### Minor Changes

- 440543f: ## New classes for layout grids
  You can now use the classes `layout-grid-gap-x`, `layout-grid`, `layout-grid-container` and `layout-subgrid-1`-`layout-subgrid-12` to set up layout grids pages so that all your content aligns.

  ### `layout-grid-gap-x`

  Defines the layout grid column spacing responsively.

  ### `layout-grid`

  Sets up a responsive 14 column grid with `layout-grid-gap-x`.

  ### `layout-grid-container`

  Combines `layout-grid` with the `container` class, which makes up the new page container.

  ### `layout-subgrid-1`-`layout-subgrid-12`

  Until there is better support for `subgrid` in CSS, you can use these classes to set up subgrids that aligns with `layout-grid`.

### Patch Changes

- 1c04f75: Extract styles for the `<LinkList>` components to component classes. This makes them reusable outside React, and makes the implementation and CSS for the component more readable.
- 0f8cd6d: Styles for headings and icons inside link lists.

## 2.3.2

### Patch Changes

- 5bacc38: Removes redundant margin on first-child/last-child elements inside lists in `prose`.
- 9112180: Fix `<h5>` styles in `prose`

## 2.3.1

### Patch Changes

- 0b9df57: Use same styles for links in prose as the `<Link>` component in grunnmuren-react.

## 2.3.0

### Minor Changes

- 709a82a: Add new utility classes for layout x/y gap.

## 2.2.2

### Patch Changes

- 0d0b664: Use `font-weight 500` in prose instead of `600`.

## 2.2.1

### Patch Changes

- d611103: add `prose-white` to override `prose` to use white text, suitable for use on dark blue backgrounds.

  eg: `<div class="bg-blue-dark prose prose-white">...</div>`

## 2.2.0

### Minor Changes

- 841009a: # Carousel

  ## grunnmuren-react

  New `Carousel` component that can be used for any content, all though primarily intended for media such as images and `VideoLoops`.

  ## Usage

  ```tsx
  <Carousel>
    <CarouselItems>
    <CarouselItem>
      <Media>
        <img
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
          alt=""
        />
        </CarouselI
    </Media>tem>
    <CarouselItem>
      // This image has a portrait aspect ratio
      <Media fit="contain">
        <img
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
          alt=""
        />
      </Media>
    </CarouselItem>
    </CarouselItems>
  </Carousel>
  ```

  Use the `fit` prop on the `<Media>` primitive to control the `object-fit` (`cover` | `contain`) behavior of it's children, this is a way to prevent cropping of images in portrait format. This defaults to `cover`, so for portrait images set it to `contain`.

  ### In Hero

  The component can also be used inside the `<Hero>` component:

  ```tsx
  <Hero variant="full-bleed">
    <Content>
      <Heading level={1}>Ulven</Heading>
      <Description>– et nytt nabolag i Oslo</Description>
    </Content>
    <Carousel>
      <CarouselItems>
        <CarouselItem>
          <CarouselItem>
            <Media>
              <VideoLoop
                src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
                format="mp4"
                alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
              />
            </Media>
          </CarouselItem>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          // This image has a portrait aspect ratio
          <Media fit="contain">
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
      </CarouselItems>
    </Carousel>
  </Hero>
  ```

  ## grunnmuren-tailwind

  A new `scrollbar-hidden` utility class has been added which hides scorllbar visually. This is needed in the `<Carousel>` component, as it uses `snap-scroll`.

## 2.1.0

### Minor Changes

- 387463d: Added new breakpoints for large screens: 3xl (108rem) and 4xl (120rem). This enables better control of elements that spans the entire viewport.

## 2.0.3

### Patch Changes

- 2ef9b6c: Fix the `line-height` of the `heading-s` class. The correct `line-height` is `1.875rem`, but it was set to `1.1875rem` for small screens.

## 2.0.2

### Patch Changes

- 04533db: export font.css and tailwind-typography.css to the bundle
- 190b924: Remove unused tailwind-deps

## 2.0.1

### Major Changes

- 8ad2fcd: V2 canary release
- f63006a: Fix font-weight on strong tags in prose content (use 500 instead of 600)
- 436ea29: # Upgrade to Tailwind 4

  Tailwind is upgraded to v4. The `grunnmuren-tailwind` package is now CSS-first configured. And the previously exposed JS config file is now replaced by a CSS config file.

  The `legacyV1Compatibility` option is removed, so your project has to be fully upgraded to Grunnmuren v2.

  The `includeFontFallback` option is also removed, and a font fallback will automatically be applied to the OBOS fonts by defaullt.

  ## Migration
  1. Upgrade your project to Tailwind 4. You can try the [migration guide](https://tailwindcss.com/docs/upgrade-guide)
     from tailwind.
  2. Add `@import "@obosbbl/grunnmuren-tailwind";` to the top of the main CSS file of your project. This is the new CSS configuration file for Grunnmuren.
  3. If you have a JS/TS `tailwind.config` in your project and would like to keep it. You can include it in the main CSS file (mentioned in step 2), by using the `@config` directive, e.g: `@config '../tailwind.config.ts';`. Read more [here](https://tailwindcss.com/docs/functions-and-directives#compatibility).
  4. Finally, if you would like to get rid of the old `tailwind.config`. You can move all your configuration to the main CSS file of your project. Tailwind 4 has automatic content detection, but if you need to include some excluded source you can use the `@source` directive, e.g: `@source "./node_modules/@obosbbl/grunnmuren-react/dist";`. You can also extend the `@obosbbl/grunnmuren-tailwind` config by using various directives such as `@base` or `@theme`.

  Here is an example of what your main CSS file **might** look like after migration:

  ```CSS
  @import "@obosbbl/grunnmuren-tailwind";

  @source "../../node_modules/@obosbbl/grunnmuren-react/dist";
  @source "../../node_modules/@code-obos/obos-layout/dist"

  @theme {
    --animate-custom: custom-animation 1s ease-in-out infinite;
    @keyframes custom-animation {
      0%,
      100% {
        transform: rotate(-3deg);
      }
      50% {
        transform: rotate(3deg);
      }
    }
  }

  @utility my-custom-util {
    @apply flex flex-col min-h-screen;
  }
  ```

- 5a9534b: BREAKING CHANGE: Update font setup to include new font-family, `OBOSDisplay`.
  - Remove OBOSText-Bold in favor of OBOSDisplay-SemiBold.
  - Change font-family of `heading-xl` and `heading-l` to OBOSDisplay.
  - Change name of font-family `OBOSFont` to `OBOSText` to make the distinction between OBOSDisplay and OBOSText clearer.
  - Remove Tailwind's default `font-sans` utility in favor of `font-display` and `font-text` to change the font family.
    - If you were previously using next/font and extending the font family in your Tailwind configuration to support that, you should remove all this as the preset now includes an in built font-fallback.

- 6482fad: Updated typography design.
  - BREAKING: Deprecate `.h1`, `.h2`, `.h3` and `.h4` classes
  - Add heading classes with "t-shirt sizes": `.heading-xl`, `.heading-l`, `.heading-m`, `.heading-s` and `.heading-xs`
  - Add classes: `.paragraph`, `.lead`, `.blockquote` and `.description`
    New design on `<h1>`-`<h4>` for both utility classes and prose.
  - Update lineheight and fontsize for all typograhpy
  - Update `.prose` class with new typography.

### Minor Changes

- a0bdc73: feat: built in font optimization with a fallback font, in similar vein to next/font. Enabled by default, can be disabled by passing `includeFontFallback: false` to the preset.
- b5c86a5: Exposes custom properties for container width and gutter, along with all custom colors.
- 7621625: add Tailwind animation plugin

### Patch Changes

- f457060: include Tailwind's default `font-mono` utility for setting the font family.

  OBOS doesn't have a monospaced font, so we use Tailwind's default here.

- 06a7fa3: Add back missing `.page-layout` and `.page-layout-main` classes that were removed by mistake in v2.
  This should fix layouts where the main page content isn't tall enough to push the footer down to the bottom
  of the screen.
- 066c74f: Increases breakpoint from `md` to `lg` for mobile font styles on typography
- ab9d08a: Add custom styling to `<code>` in prose content
- 8fe9e00: fix: use correct font-family for headings in v1 compatibility mode
- f096065: Standardizes focus styles.
- 585e6da: Fixes the custom colors so they work with tailwinds [opacity modifier](https://tailwindcss.com/docs/text-color#changing-the-opacity)
- 6b2f461: Fixes styling on lists in prose.
- 7a62218: Set tailwindcss 3.4.0 as the minimum peer dep
- 7190630: minor adjustment of heading sizes

## 2.0.0-canary.12

### Patch Changes

- ab9d08a: Add custom styling to `<code>` in prose content

## 2.0.0-canary.11

### Major Changes

- f63006a: Fix font-weight on strong tags in prose content (use 500 instead of 600)

## 2.0.0-canary.10

### Patch Changes

- 585e6da: Fixes the custom colors so they work with tailwinds [opacity modifier](https://tailwindcss.com/docs/text-color#changing-the-opacity)

## 2.0.0-canary.9

### Patch Changes

- f457060: include Tailwind's default `font-mono` utility for setting the font family.

  OBOS doesn't have a monospaced font, so we use Tailwind's default here.

## 2.0.0-canary.8

### Patch Changes

- f096065: Standardizes focus styles.

## 2.0.0-canary.7

### Minor Changes

- b5c86a5: Exposes custom properties for container width and gutter, along with all custom colors.

## 2.0.0-canary.6

### Patch Changes

- 066c74f: Increases breakpoint from `md` to `lg` for mobile font styles on typography

## 2.0.0-canary.5

### Patch Changes

- 6b2f461: Fixes styling on lists in prose.

## 2.0.0-canary.4

### Patch Changes

- 8fe9e00: fix: use correct font-family for headings in v1 compatibility mode

## 2.0.0-canary.3

### Major Changes

- 5a9534b: BREAKING CHANGE: Update font setup to include new font-family, `OBOSDisplay`.
  - Remove OBOSText-Bold in favor of OBOSDisplay-SemiBold.
  - Change font-family of `heading-xl` and `heading-l` to OBOSDisplay.
  - Change name of font-family `OBOSFont` to `OBOSText` to make the distinction between OBOSDisplay and OBOSText clearer.
  - Remove Tailwind's default `font-sans` utility in favor of `font-display` and `font-text` to change the font family.
    - If you were previously using next/font and extending the font family in your Tailwind configuration to support that, you should remove all this as the preset now includes an in built font-fallback.

- 6482fad: Updated typography design.
  - BREAKING: Deprecate `.h1`, `.h2`, `.h3` and `.h4` classes
  - Add heading classes with "t-shirt sizes": `.heading-xl`, `.heading-l`, `.heading-m`, `.heading-s` and `.heading-xs`
  - Add classes: `.paragraph`, `.lead`, `.blockquote` and `.description`
    New design on `<h1>`-`<h4>` for both utility classes and prose.
  - Update lineheight and fontsize for all typograhpy
  - Update `.prose` class with new typography.

### Minor Changes

- a0bdc73: feat: built in font optimization with a fallback font, in similar vein to next/font. Enabled by default, can be disabled by passing `includeFontFallback: false` to the preset.

### Patch Changes

- 06a7fa3: Add back missing `.page-layout` and `.page-layout-main` classes that were removed by mistake in v2.
  This should fix layouts where the main page content isn't tall enough to push the footer down to the bottom
  of the screen.

## 2.0.0-canary.2

### Minor Changes

- 7621625: add Tailwind animation plugin

### Patch Changes

- 7a62218: Set tailwindcss 3.4.0 as the minimum peer dep

## 2.0.0-canary.1

### Patch Changes

- 7190630: minor adjustment of heading sizes

## 2.0.0-canary.0

### Major Changes

- 237d9cb7: V2 canary release
