# @obosbbl/grunnmuren-react

## 2.3.0

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
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
          alt=""
        />
        </CarouselI
    </Media>tem>
    <CarouselItem>
      // This image has a portrait aspect ratio
      <Media fit="contain">
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
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
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          // This image has a portrait aspect ratio
          <Media fit="contain">
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
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

### Patch Changes

- 50d33a2: Removes redundant x-padding on the `<Hero>` component, as the component will typically be rendered inside a `<main className="container">` parent.
- fcbe129: `<Card>` now respects the `size` prop (if set) on it's `<Heading>`. This makes it possible to customize the size of the heading in a `<Card>`:

  ```tsx
  <Card>
    <Content>
      <Heading level={3} size="m">
        Medium heading
      </Heading>
      <p>This heading is customized</p>
    </Content>
  </Card>
  ```

## 2.2.0

### Minor Changes

- 781c71c: New variants for the `<Hero>` component. The variant is controlled by the new prop: `variant`.

  The `variant` is tied to an intended default heading size, either `xl` or `l`. Which means that each `variant` has it's own default heading styles. So in for the most part, you should never have to set both:

  ### standard, L heading

  ```tsx
  // default: variant="standard" is default and heading size `l` is implicit for this variant
  <Hero>
    <Content>
      <Heading level={1}>Dette er en Hero</Heading>
      <Description>– et samarbeidsprosjekt med Nordr</Description>
    </Content>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
        alt=""
      />
    </Media>
  </Hero>
  ```

  ```tsx
  // heading size `l` is implicit for the `full-bleed` variant
  <Hero variant="full-bleed">
    <Content>
      <Heading level={1}>Dette er en Hero</Heading>
      <Description>– et samarbeidsprosjekt med Nordr</Description>
    </Content>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
        alt=""
      />
    </Media>
  </Hero>
  ```

  ### two-column

  ```tsx
  // heading size `xl` is implicit for the `two-column` variant
  <Hero variant="two-column">
    <Content>
      <Heading level={1}>Dette er en Hero</Heading>
      <Description>– et samarbeidsprosjekt med Nordr</Description>
    </Content>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
        alt=""
      />
    </Media>
  </Hero>
  ```

  ### standard with `xl` heading

  ```tsx
  // variant="standard" is default so that prop can be omitted, and the heading size set to `xl` on the `<Heading>`
  <Hero>
    <Content>
      <Heading level={1} size="xl">
        Dette er en Hero
      </Heading>
      <Description>– et samarbeidsprosjekt med Nordr</Description>
    </Content>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
        alt=""
      />
    </Media>
  </Hero>
  ```

  ### Heading

  To achieve this control of the heading size a new `size` prop has been added to the `<Heading>` component. This way we can implement the same API for the Card component (which should support different heading sizes as well).

  ### Breaking change to `UNSAFE_Hero`

  This introduces a breaking change to the beta version of the `<Hero>`, which is to be expected without a major release. If you are currently using `UNSAFE_Hero` you would now have to pass `variant="full-bleed"` as a prop to your component to get the same design as before.

## 2.1.0

### Minor Changes

- 14f78f3: Unflag `Avatar` as stable, you can now import without the `UNSAFE_` prefix: `import { Avatar } from '@obosbbl/grunnmuren-react'`
- 387463d: New (unstable) `<Hero>` component that supports a `<Heading>`, `<Description>` and `<Media>`. This initial version only has one single layout, but will be extended with other layout variants in the future (breaking layout/api changes are to be expected).

### Patch Changes

- e3bd5a6: Fixes an accessibility issue with the `<RadioGroup>` component, where passing `value=""` as a prop caused the radio input to get `tabindex="-1"`. Which would make it inaccessible to keyboard and screen reader users.

## 2.0.4

### Patch Changes

- d197fa4: Fixes the logic behind validation states for inputs, where passing `errorMessage=""` would set the field in an invalid state. This doesn't really make sense, and can cause strange validation behaviour when using libraries like Zod. With this change setting `errorMessage` to `"" | null | undefined` is now equivalent: the field is valid, unless combined with the `isInvalid` prop set to `true`.
- Updated dependencies [62fd91f]
  - @obosbbl/grunnmuren-icons-react@2.1.0

## 2.0.3

### Patch Changes

- 20d8488: Fix bug where `inert` prop in `<Accordion>` is set opposite of intended.

## 2.0.2

### Patch Changes

- 190b924: Remove unused tailwind-deps

## 2.0.1

### Major Changes

- 8ad2fcd: V2 canary release
- 58704e7: BREAKING CHANGE: updated look and feel of entire icon set. The icons are now outlined instead of filled.

  The following icons are renamed:

  - Expand -> ArrowsMaximize
  - BriefcaseMedical -> FirstAidKit
  - Columns -> LayoutGrid
  - Unlock -> LockOpen
  - Twitter -> X

  The following icons are removed:

  - BikeExercise (use Bike or Excerise instead)
  - BuildingAlt
  - CookingPot (use ChefHat instead)
  - CloseBold
  - CloseCircle
  - ExpandAlt
  - MenuAlt
  - StairsFloor

  Added new icons:

  - ArrowDownLeft
  - BuildingBank
  - Buildings
  - Businessplan
  - Cards
  - CheckSquare
  - ChefHat
  - CloseSquare
  - Error
  - HeartFilled
  - Lock
  - LockHeart
  - MobileMoney
  - PlayerPause
  - PlayerPlay
  - Rocket
  - Unlink

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

- 152b14c: Dropped support for React 18

### Minor Changes

- 3cb2008: Button: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.
  - improved accessibility for pending state by [utilizing React aria](https://react-spectrum.adobe.com/react-aria/Button.html#pending)
  - button events are now disabled when the button is in a pending state.
  - refactor to CSS instead of useLayoutEffect when button is in a pending state.

- 7e9cd22: Change types for backlink in order to display props correctly in the grunnmuren docs
- 25bda50: New `<Avatar>` component that can be used to create rounded images. It helps composing components like contact cards.
- ee10040: Button: change implementation to use Button/Link from react-aria-components.

  - `onClick` prop is now called `onPress`.
  - Button, when used with a href, now works as expected with the `navigate` prop in `<GrunnmurenProvider>`.

- 8b84eb5: Add Accordion and AccordionItem components. Use as follows:

  ```jsx
  <Accordion>
    <AccordionItem>
      <Heading>Item 1</Heading>
      <Content>Item 1</Content>
    </AccordionItem>
    <AccordionItem>
      <Heading>Item 2</Heading>
      <Content>Item 2</Content>
    </AccordionItem>
  </Accordion>
  ```

- f276e97: add `useHref` to GrunnmurenProvider to simplify usage with routers such as Next when using a basepath.

  Example with a Next app and the [basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath) setting set to `/medlem`.

  **Before**

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // Notice how you have to handle the basepath yourself with Grunnmuren's component, but not with Next's.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/medlem/bli-medlem">Bli medlem</Button>
  ```

  **After**

  ```js
  // app/providers.tsx
  'use client'
  import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
  import { useRouter } from 'next/navigation';

  export function Providers({children, locale}: { children: React.ReactNode, locale: string}) {
    const router = useRouter();
    const useHref = (href: string) => '/medlem' + href;

    return (
      <GrunnmurenProvider locale={locale} navigate={router.push} useHref={useHref}>
        {children}
      </GrunnmurenProvider>
    )
  }
  ```

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // The hrefs are the same, as basepath is handled by the useHref hook in the provider.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/bli-medlem">Bli medlem</Button>
  ```

- 18b0ed8: Render `<Badge>` as an overlay in `<Media>` in the `<Card>` component. This way `<Badge>` is placed on top of the other content in `<Media>` (image, illustration or video). It can be either left or right aligned, depending on it's child index of `<Media>`.
- 5e88755: New FileUpload component in beta. Can be used to upload one or multiple files.
- 899a5e0: Added new component for numbers using the `<NumberField/>` from RAC. This component and it's stories are very similar to the `<TextField/>` component
- ae18e99: Add TagGroup component (aka Chips)
- 425dac9: Button: add support for `isIconOnly` to render a button with a single icon
- 60d6d9e: Rename `<I18nProvider />` to `<GrunnmurenProvider />`. Explicitly set supported languages to `nb,`, `sv` and `en`, with `nb` as the default.
- 860f58a: add `<Badge />` component
- 38c2d3d: add I18nProvider
- 6ebb8af: Add support for `className` prop on `Disclosure`
- e665984: New `<Modal>` component that can be used for modal dialogs.
- 07d0d30: Adding a new `<VideoLoop/>` component that can play a muted video that loops (similar to a gif). The component respects reduced motion settings for users that have this setting enabled. It ensures further accessibility by requiring a visible or invisible description (`alt` or `caption`) of the video content.

  Usage:

  ```tsx
  <VideoLoop
      src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
      format="mp4"
      alt="Frysjaparken er et moderne nabolag med flotte uteområder og en nydelig kafé"
  />

  <Media>
      <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
      />
      <Caption>Frysjaparken er et moderne nabolag med flotte uteområder og en nydelig kafé</Caption>
  </Media>
  ```

- cb3286b: New `<Backlink/>` component.
- 1217ade: \* Export `<Alertbox />`, `<Heading />`, `<Content />` and `<Footer />` components.
  - Prop renaming for dismissable alertboxes.
  - Add `isExpandable` prop to AlertBox to make content expandable.
- 7ca186c: New `layout` prop in `<Card>` to support for responsive horizontal layout.
- dcb1e5c: Added new component `<Alertbox/>` for dismissable and non-dismissable alerts.
- 9653882: add React 19 as allowed peerDep
- 040cc31: New component: `<Disclosure>`, which is used to toggle (show/hide) content. Suitable for components like "Read more" buttons, Hamburger menu's etc. This is very similar to the `<Accordion/>` component. But the the `<Disclosure>` is more generic, has minimal styling and can be used as a standalone component. `<Disclosure>` is also typically used to toggle smaller pieces of content then `<Accordion/>`, and does not imply that the toggle button is a heading associated with the togglable content.
- 7932247: add `useLocale()` hook that returns the locale set in GrunnmurenProvider
- 5175169: Add Breadcrumbs and Breadcrumb components
- 24261c1: Added sub-components to `<Select/>` and `<Combobox/>` to enable grouping of the listbox items.
- dcb804a: Adds support for custom size on `TextField` and `NumberField`.
- 8f81997: Alertbox: add `icon` prop to override the default icon for the variant

  Example:

  ```jsx
  import { Subscription } from "@obosbbl/grunnmuren-react/icons";

  <Alertbox variant="info" icon={Subscription}>
    {" "}
    ...{" "}
  </Alertbox>;
  ```

- 00e0eea: New component `<DateFormatter>`, that can be used to format dates.
- ef11713: Adds support for accordions that are wrapped by a container with a background color.
- c59ed0f: improve support for HTML forms and native form validation in form components
- e0ab2b0: Add `navigate` prop to `<GrunnmurenProvider>` for integration with client side routers such as next/router.
- f32aa43: New `<Card>` component that can serve as either a clickable link or a decorative container. Supporting text content along with images, illustrations and icons.

### Patch Changes

- 335b6b5: Fixes focus-visible on the Backlink component.
- da3a2a0: Removes redundant wrapper div on Checkbox description.
- 9d5a044: fix type issue with refs for Heading and Content components
- 0cd21d8: Accordion: explictly set heading font size to prevents global heading styles to affect it's size
- 5e88755: Expose `<Label>`, `<Description>` and `<ErrorMessage>` components
- 67e8ffe: Fix that makes nested `<Disclosure>` components work.
- 4b40468: Fixes expand/collapse bug in `<Alertbox>` that occured when not passing a `<Footer>`.
- 08cc710: Fixes input height issue in `<TextField/>` component on Safari mobile.
- de38e17: Removes white background color on `<Button variant="secondary"/>` to make it transparent and work well in a conatiner with any light color (not just white)
- 44e600c: Remove TS workaround on the `inert` prop in `<Accordion>`. This type has now been fixed in React 19: https://github.com/facebook/react/issues/17157#issuecomment-2003750544 (prior to React 19, `inert` was not accepted as boolean)
- 7621625: add Select component
- 9efdc87: Removes group class from `Accordion` to prevent issues with content that has the `group`-class`.
- 1d29985: fix: make TextArea/Select usable against non white backgrounds
- 04a4e83: add forwardRef to Content and Heading. Fixes issue with these components in Next 15 and React 19.
- 4bbfe32: Export NumberField component and Props type
- 4a30610: Fixes background color on inputs with type="search" in Safari
- d3ed719: Fixes typo in docs and reduced underline height on `<Backlink/>`.
- 8cea558: Adding support for all RAC Link props on the CardLink component. This makes it possible to pass props like `onPress` and other events, which again enables tracking and so on.
- 73d8c88: fix issue with missing spacing/gap when using TextField with addons
- b168eb1: upgrade react-aria-components to 1.2.0
- 834c1a9: - Import components from root package instead of subpaths for each component
  - Bundle the library with bunchee instead of unbuild, as it preserves `use client;` directives
  - Export `<Form />` component from RAC
- 3d9a230: Increases click area on `Radio` and `Checkbox` so that it is minimum 44x44 px when used without children.
- 41642ab: Fixes scrolling and autoscrolling bug in `<Combobox/>` and `<Select/>`.
- b74f4b7: Fix issue with focus getting lost when all files are removed from `FileUpload`. Focus is now automatically set to the file upload when deleting files.
- 72dc293: Base `href` prop on `<Backlink>`, `<Breadcrumb>` and `<Button>` to enable type safe routes.
- a22d890: add white background to inputgroup
- 56b6cb6: fix invisible ring on input (safari v<17)
- f096065: Standardizes focus styles.
- 969ec11: \* Update react-aria-components to 1.1.1
  - Add `use client;` directive to Grunnmuren for better RSC compatibility
- 2f1951f: Fixes input height on inputs that sets the size prop.
- 880e932: Fix issue with image border-radius for `<Card layout="horizontal">` that can occur in some cases where the `<Card>` has very little horizontal space.
- bfec6ef: Fixes popover overflow in `Combobox` and `Select`
- 7cef865: fix: error messages were missing when using native validation
- 2bfbfaf: Accordion: Fix icon size shrinking with long texts
- 84d5bea: Fixes style on `<Media>` children when hovering a `<Card>`
- 39bb81c: Fix file count incrementation in FileUpload.
- 1c8171b: Fixes an issue where all `<Button>` components inside a `<Disclosure>` would trigger the Disclosure to close/open.
- 16e0788: add forwardRef support for better compat with react-hook-form
- 0b9d56a: loosen version requirement for react-aria-components dependency
- 02592b2: TextField, Select, TextArea, Combobox:
  Increase font size from 14px to 16px to prevent zooming on iOS
  when input field is focused.

  TextField: Fix issue with `type="date"` where the size of the input was off.

- 60ff9b3: Fixes the way spacing is managed in `<DisclosurePanel>`. Pseudo-elements were used to avoid an extra `<div>` wrapper around the content. But this caused some inherent spacing around the `Disclosure` which might not be desired in some cases.
- bcd1ad3: Fixes line-height on `<CardLink>` so that underline on hover aligns better with the text.
- 7a62218: - improve TextField focus/invalid styles
  - improve TextArea focus/invalid styles
  - improve Select focus/invalid styles
  - refactor: share styles between form components
  - add Comobox component
- 7ace896: Decreases breakpoint for `Card` with horizontal layout, without `<Media>`
- ee2da0c: fix: Button should keep it's width when in isLoading state
- f75bf78: More specific CSS selectors to target `<img>` inside `<Media>` in `<Card>`. This fixes issues with unwnated styles being applied to other nested `<img>` elements.
- b7933ac: Fix `FileUpload` so that custom `errorMessage` is displayed
- 87da523: Fixes focus styles on all components using either `<Link>` or `<Button>` from react-aria-components internally.
- 53ae6f0: RadioGroup/CheckboxGroup: add support for displaying error messages when used in a `<Form>` component with the `validationErrors` prop. This enables the use of server side validation for these components.
- ce83bec: Fixes issue with custom underline on backlinks that wraps over multiple lines.
- 8bdd3e3: Combobox: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.

- 58704e7: Alertbox: adjust icons after updated icon set
- 67e8ffe: Support dynamic children based on component state in `<Disclosure>`. For example, you can now do:

  ```TSX
  <Disclosure>
      {({ isExpanded }) => (
      <>
          <DisclosureButton className="lg:hidden">
              {isExpanded ? (
              <Close className="h-6 w-6" aria-label="Close" />
              ) : (
              <Menu className="h-6 w-6" aria-label="Menu" />
              )}
          </DisclosureButton>
          <DisclosurePanel className="lg:hidden">
          <MainNav />
          </DisclosurePanel>
      </>
      )}
  </Disclosure>
  ```

- 35d8078: upgrade react-aria dependencies
- 3d9a230: Fixes an issue with the click area on `Radio` and `Checkbox` where the area just to the left of the radio/checkbox gave a hover effect that indicated that the pointer was in the click area, but no click event fired.
- 369fd61: chore: don't pin to a specific beta version of the cva dependency
- eaa8d74: Fixes hover style on backlink so that underline is applied even when something other than the text is hovered in the link.
- 94ec4f6: Breadcrumbs: remove browser's default outline for the links, use focus-visible for focus ring
- 709dddc: Fix focus ring color on `<Disclosure>` so that it works on any background
- 845a3bb: Button/Backlink: render Button if href is undefined
- 1367c42: Fixed inconsistent spacing in buttons with icon and text.
- c2a8150: rename Button component's `loading` prop to `isLoading` to align better with other prop names
- 7b8e090: Makes styling custom content in the `<Media>` component easier. This fixes width issues on content other than `<img/>`, `<video/>`.
- 34ae950: Fixes an issue with scrollbars overflowing the border radius on popovers, and incorrect painting of the popover border in some browsers. This affects both the `<Select/>` component and the `<ComboBox/>` component.
- 248007d: fix screen reader issue with Checkbox
- d98c7a9: Fixes infinite re-renders in CheckboxGroup with Checkboxes that has the description prop set.
- 86315e1: Add [hyphens: auto](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens) to Card headings to ensure they don't overflow the card container.
- 94b2a45: fix: render Backlink as <button> when no href is provided, as it is more semantically correct
- ee2da0c: refactor: use useLayoutEffect from react-aria instead of rolling our own. Reduces bundle size by a few bytes
- 39c848e: fix: add missing `use client` directive to Button component
- b62c268: Change layout from grid to flex on `<Card>`, as this makes styling easier. Handy if you have Card content of variable size but need to display a set of Cards with the same height.
- b8efb04: Backlink: use cursor-pointer
- 687cdec: Reverts back to using the Link component from RAC in Backlink.
- d86d439: Fix width of TextField and NumberField with left/rightAddon
- Updated dependencies [e92b0f2]
- Updated dependencies [36f31d9]
- Updated dependencies [5561fd8]
- Updated dependencies [475927a]
- Updated dependencies [8ad2fcd]
- Updated dependencies [9737bf0]
- Updated dependencies [9653882]
- Updated dependencies [04e1531]
- Updated dependencies [e6db3d4]
- Updated dependencies [152b14c]
- Updated dependencies [2f4a527]
- Updated dependencies [834c1a9]
  - @obosbbl/grunnmuren-icons-react@2.0.0

## 2.0.0-canary.56

### Patch Changes

- b74f4b7: Fix issue with focus getting lost when all files are removed from `FileUpload`. Focus is now automatically set to the file upload when deleting files.
- b7933ac: Fix `FileUpload` so that custom `errorMessage` is displayed

## 2.0.0-canary.55

### Minor Changes

- 25bda50: New `<Avatar>` component that can be used to create rounded images. It helps composing components like contact cards.
- 5e88755: New FileUpload component in beta. Can be used to upload one or multiple files.
- ae18e99: Add TagGroup component (aka Chips)
- e665984: New `<Modal>` component that can be used for modal dialogs.

### Patch Changes

- 5e88755: Expose `<Label>`, `<Description>` and `<ErrorMessage>` components
- 39bb81c: Fix file count incrementation in FileUpload.
- 35d8078: upgrade react-aria dependencies

## 2.0.0-canary.54

### Patch Changes

- 84d5bea: Fixes style on `<Media>` children when hovering a `<Card>`

## 2.0.0-canary.53

### Patch Changes

- f75bf78: More specific CSS selectors to target `<img>` inside `<Media>` in `<Card>`. This fixes issues with unwnated styles being applied to other nested `<img>` elements.

## 2.0.0-canary.52

### Patch Changes

- 1c8171b: Fixes an issue where all `<Button>` components inside a `<Disclosure>` would trigger the Disclosure to close/open.
- 60ff9b3: Fixes the way spacing is managed in `<DisclosurePanel>`. Pseudo-elements were used to avoid an extra `<div>` wrapper around the content. But this caused some inherent spacing around the `Disclosure` which might not be desired in some cases.
- 7ace896: Decreases breakpoint for `Card` with horizontal layout, without `<Media>`
- 709dddc: Fix focus ring color on `<Disclosure>` so that it works on any background
- 7b8e090: Makes styling custom content in the `<Media>` component easier. This fixes width issues on content other than `<img/>`, `<video/>`.

## 2.0.0-canary.51

### Minor Changes

- 7e9cd22: Change types for backlink in order to display props correctly in the grunnmuren docs

### Patch Changes

- 880e932: Fix issue with image border-radius for `<Card layout="horizontal">` that can occur in some cases where the `<Card>` has very little horizontal space.

## 2.0.0-canary.50

### Minor Changes

- 18b0ed8: Render `<Badge>` as an overlay in `<Media>` in the `<Card>` component. This way `<Badge>` is placed on top of the other content in `<Media>` (image, illustration or video). It can be either left or right aligned, depending on it's child index of `<Media>`.
- 7ca186c: New `layout` prop in `<Card>` to support for responsive horizontal layout.

## 2.0.0-canary.49

### Minor Changes

- 6ebb8af: Add support for `className` prop on `Disclosure`
- 040cc31: New component: `<Disclosure>`, which is used to toggle (show/hide) content. Suitable for components like "Read more" buttons, Hamburger menu's etc. This is very similar to the `<Accordion/>` component. But the the `<Disclosure>` is more generic, has minimal styling and can be used as a standalone component. `<Disclosure>` is also typically used to toggle smaller pieces of content then `<Accordion/>`, and does not imply that the toggle button is a heading associated with the togglable content.

## 2.0.0-canary.48

### Minor Changes

- 8f81997: Alertbox: add `icon` prop to override the default icon for the variant

  Example:

  ```jsx
  import { Subscription } from "@obosbbl/grunnmuren-react/icons";

  <Alertbox variant="info" icon={Subscription}>
    {" "}
    ...{" "}
  </Alertbox>;
  ```

### Patch Changes

- 369fd61: chore: don't pin to a specific beta version of the cva dependency
- Updated dependencies [36f31d9]
- Updated dependencies [e6db3d4]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.7

## 2.0.0-canary.47

### Minor Changes

- 07d0d30: Adding a new `<VideoLoop/>` component that can play a muted video that loops (similar to a gif). The component respects reduced motion settings for users that have this setting enabled. It ensures further accessibility by requiring a visible or invisible description (`alt` or `caption`) of the video content.

  Usage:

  ```tsx
  <VideoLoop
      src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
      format="mp4"
      alt="Frysjaparken er et moderne nabolag med flotte uteområder og en nydelig kafé"
  />

  <Media>
      <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
      />
      <Caption>Frysjaparken er et moderne nabolag med flotte uteområder og en nydelig kafé</Caption>
  </Media>
  ```

### Patch Changes

- Updated dependencies [e92b0f2]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.5

## 2.0.0-canary.46

### Patch Changes

- b62c268: Change layout from grid to flex on `<Card>`, as this makes styling easier. Handy if you have Card content of variable size but need to display a set of Cards with the same height.
- Updated dependencies [2f4a527]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.4

## 2.0.0-canary.45

### Major Changes

- 58704e7: BREAKING CHANGE: updated look and feel of entire icon set. The icons are now outlined instead of filled.

  The following icons are renamed:

  - Expand -> ArrowsMaximize
  - BriefcaseMedical -> FirstAidKit
  - Columns -> LayoutGrid
  - Unlock -> LockOpen
  - Twitter -> X

  The following icons are removed:

  - BikeExercise (use Bike or Excerise instead)
  - BuildingAlt
  - CookingPot (use ChefHat instead)
  - CloseBold
  - CloseCircle
  - ExpandAlt
  - MenuAlt
  - StairsFloor

  Added new icons:

  - ArrowDownLeft
  - BuildingBank
  - Buildings
  - Businessplan
  - Cards
  - CheckSquare
  - ChefHat
  - CloseSquare
  - Error
  - HeartFilled
  - Lock
  - LockHeart
  - MobileMoney
  - PlayerPause
  - PlayerPlay
  - Rocket
  - Unlink

### Patch Changes

- 72dc293: Base `href` prop on `<Backlink>`, `<Breadcrumb>` and `<Button>` to enable type safe routes.
- 58704e7: Alertbox: adjust icons after updated icon set
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.3

## 2.0.0-canary.44

### Patch Changes

- 8cea558: Adding support for all RAC Link props on the CardLink component. This makes it possible to pass props like `onPress` and other events, which again enables tracking and so on.

## 2.0.0-canary.43

### Patch Changes

- 04a4e83: add forwardRef to Content and Heading. Fixes issue with these components in Next 15 and React 19.

## 2.0.0-canary.42

### Patch Changes

- 86315e1: Add [hyphens: auto](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens) to Card headings to ensure they don't overflow the card container.

## 2.0.0-canary.41

### Minor Changes

- 9653882: add React 19 as allowed peerDep

### Patch Changes

- 9d5a044: fix type issue with refs for Heading and Content components
- Updated dependencies [9653882]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.3

## 2.0.0-canary.40

### Minor Changes

- 3cb2008: Button: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.
  - improved accessibility for pending state by [utilizing React aria](https://react-spectrum.adobe.com/react-aria/Button.html#pending)
  - button events are now disabled when the button is in a pending state.
  - refactor to CSS instead of useLayoutEffect when button is in a pending state.

### Patch Changes

- bcd1ad3: Fixes line-height on `<CardLink>` so that underline on hover aligns better with the text.
- 87da523: Fixes focus styles on all components using either `<Link>` or `<Button>` from react-aria-components internally.
- 8bdd3e3: Combobox: deprecate isLoading in favor of isPending

  - change prop name to align with React Aria and the useActionState hook in React.

## 2.0.0-canary.39

### Patch Changes

- 4b40468: Fixes expand/collapse bug in `<Alertbox>` that occured when not passing a `<Footer>`.

## 2.0.0-canary.38

### Minor Changes

- 00e0eea: New component `<DateFormatter>`, that can be used to format dates.
- f32aa43: New `<Card>` component that can serve as either a clickable link or a decorative container. Supporting text content along with images, illustrations and icons.

## 2.0.0-canary.37

### Patch Changes

- 9efdc87: Removes group class from `Accordion` to prevent issues with content that has the `group`-class`.
- f096065: Standardizes focus styles.

## 2.0.0-canary.36

### Minor Changes

- 7932247: add `useLocale()` hook that returns the locale set in GrunnmurenProvider

### Patch Changes

- 4a30610: Fixes background color on inputs with type="search" in Safari

## 2.0.0-canary.35

### Minor Changes

- 860f58a: add `<Badge />` component

### Patch Changes

- 2f1951f: Fixes input height on inputs that sets the size prop.

## 2.0.0-canary.34

### Minor Changes

- f276e97: add `useHref` to GrunnmurenProvider to simplify usage with routers such as Next when using a basepath.

  Example with a Next app and the [basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath) setting set to `/medlem`.

  **Before**

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // Notice how you have to handle the basepath yourself with Grunnmuren's component, but not with Next's.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/medlem/bli-medlem">Bli medlem</Button>
  ```

  **After**

  ```js
  // app/providers.tsx
  'use client'
  import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
  import { useRouter } from 'next/navigation';

  export function Providers({children, locale}: { children: React.ReactNode, locale: string}) {
    const router = useRouter();
    const useHref = (href: string) => '/medlem' + href;

    return (
      <GrunnmurenProvider locale={locale} navigate={router.push} useHref={useHref}>
        {children}
      </GrunnmurenProvider>
    )
  }
  ```

  ```tsx
  import Link from 'next/link';
  import { Button } from '@obosbbl/grunnmuren-react';

  // The hrefs are the same, as basepath is handled by the useHref hook in the provider.

  <Link href="/bli-medlem">Bli medlem</Link>
  <Button href="/bli-medlem">Bli medlem</Button>
  ```

### Patch Changes

- de38e17: Removes white background color on `<Button variant="secondary"/>` to make it transparent and work well in a conatiner with any light color (not just white)
- ee2da0c: fix: Button should keep it's width when in isLoading state
- ee2da0c: refactor: use useLayoutEffect from react-aria instead of rolling our own. Reduces bundle size by a few bytes

## 2.0.0-canary.33

### Patch Changes

- 08cc710: Fixes input height issue in `<TextField/>` component on Safari mobile.
- 3d9a230: Increases click area on `Radio` and `Checkbox` so that it is minimum 44x44 px when used without children.
- 3d9a230: Fixes an issue with the click area on `Radio` and `Checkbox` where the area just to the left of the radio/checkbox gave a hover effect that indicated that the pointer was in the click area, but no click event fired.
- 845a3bb: Button/Backlink: render Button if href is undefined
- 34ae950: Fixes an issue with scrollbars overflowing the border radius on popovers, and incorrect painting of the popover border in some browsers. This affects both the `<Select/>` component and the `<ComboBox/>` component.
- 94b2a45: fix: render Backlink as <button> when no href is provided, as it is more semantically correct

## 2.0.0-canary.32

### Minor Changes

- ee10040: Button: change implementation to use Button/Link from react-aria-components.

  - `onClick` prop is now called `onPress`.
  - Button, when used with a href, now works as expected with the `navigate` prop in `<GrunnmurenProvider>`.

## 2.0.0-canary.31

### Patch Changes

- 94ec4f6: Breadcrumbs: remove browser's default outline for the links, use focus-visible for focus ring
- b8efb04: Backlink: use cursor-pointer

## 2.0.0-canary.30

### Patch Changes

- bfec6ef: Fixes popover overflow in `Combobox` and `Select`

## 2.0.0-canary.29

### Patch Changes

- 1d29985: fix: make TextArea/Select usable against non white backgrounds
- 7cef865: fix: error messages were missing when using native validation

## 2.0.0-canary.28

### Patch Changes

- b168eb1: upgrade react-aria-components to 1.2.0
- 41642ab: Fixes scrolling and autoscrolling bug in `<Combobox/>` and `<Select/>`.
- 02592b2: TextField, Select, TextArea, Combobox:
  Increase font size from 14px to 16px to prevent zooming on iOS
  when input field is focused.

  TextField: Fix issue with `type="date"` where the size of the input was off.

## 2.0.0-canary.27

### Patch Changes

- da3a2a0: Removes redundant wrapper div on Checkbox description.

## 2.0.0-canary.26

### Patch Changes

- d98c7a9: Fixes infinite re-renders in CheckboxGroup with Checkboxes that has the description prop set.
- d86d439: Fix width of TextField and NumberField with left/rightAddon

## 2.0.0-canary.25

### Minor Changes

- dcb804a: Adds support for custom size on `TextField` and `NumberField`.

### Patch Changes

- 53ae6f0: RadioGroup/CheckboxGroup: add support for displaying error messages when used in a `<Form>` component with the `validationErrors` prop. This enables the use of server side validation for these components.

## 2.0.0-canary.24

### Patch Changes

- 0cd21d8: Accordion: explictly set heading font size to prevents global heading styles to affect it's size

## 2.0.0-canary.23

### Patch Changes

- 2bfbfaf: Accordion: Fix icon size shrinking with long texts

## 2.0.0-canary.22

### Patch Changes

- 335b6b5: Fixes focus-visible on the Backlink component.

## 2.0.0-canary.21

### Patch Changes

- 687cdec: Reverts back to using the Link component from RAC in Backlink.

## 2.0.0-canary.20

### Patch Changes

- b2ce9a7: Fixes focus-visible styling for Backlinks.
- ce83bec: Fixes issue with custom underline on backlinks that wraps over multiple lines.

## 2.0.0-canary.19

### Patch Changes

- d3ed719: Fixes typo in docs and reduced underline height on `<Backlink/>`.
- eaa8d74: Fixes hover style on backlink so that underline is applied even when something other than the text is hovered in the link.

## 2.0.0-canary.18

### Minor Changes

- cb3286b: New `<Backlink/>` component.

Example:
`<Backlink href="/my-path"/>`

## 2.0.0-canary.17

### Minor Changes

- ef11713: Adds support for accordions that are wrapped by a container with a background color.

## 2.0.0-canary.16

### Minor Changes

- 8b84eb5: Add Accordion and AccordionItem components. Use as follows:

  ```jsx
  <Accordion>
    <AccordionItem>
      <Heading>Item 1</Heading>
      <Content>Item 1</Content>
    </AccordionItem>
    <AccordionItem>
      <Heading>Item 2</Heading>
      <Content>Item 2</Content>
    </AccordionItem>
  </Accordion>
  ```

## 2.0.0-canary.15

### Patch Changes

- a22d890: add white background to inputgroup

## 2.0.0-canary.14

### Minor Changes

- 60d6d9e: Rename `<I18nProvider />` to `<GrunnmurenProvider />`. Explicitly set supported languages to `nb,`, `sv` and `en`, with `nb` as the default.
- 5175169: Add Breadcrumbs and Breadcrumb components
- e0ab2b0: Add `navigate` prop to `<GrunnmurenProvider>` for integration with client side routers such as next/router.

### Patch Changes

- 969ec11: \* Update react-aria-components to 1.1.1
  - Add `use client;` directive to Grunnmuren for better RSC compatibility

## 2.0.0-canary.13

### Minor Changes

- 1217ade: \* Export `<Alertbox />`, `<Heading />`, `<Content />` and `<Footer />` components.
  - Prop renaming for dismissable alertboxes.
  - Add `isExpandable` prop to AlertBox to make content expandable.

## 2.0.0-canary.12

### Minor Changes

- dcb1e5c: Added new component `<Alertbox/>` for dismissable and non-dismissable alerts.

### Patch Changes

- 73d8c88: fix issue with missing spacing/gap when using TextField with addons

## 2.0.0-canary.11

### Minor Changes

- 24261c1: Added sub-components to `<Select/>` and `<Combobox/>` to enable grouping of the listbox items.

## 2.0.0-canary.10

### Patch Changes

- 1367c42: Fixed inconsistent spacing in buttons with icon and text.

## 2.0.0-canary.9

### Patch Changes

- 4bbfe32: Export NumberField component and Props type

## 2.0.0-canary.8

### Minor Changes

- 899a5e0: Added new component for numbers using the `<NumberField/>` from RAC. This component and it's stories are very similar to the `<TextField/>` component

## 2.0.0-canary.7

### Patch Changes

- 56b6cb6: fix invisible ring on input (safari v<17)

## 2.0.0-canary.6

### Patch Changes

- 248007d: fix screen reader issue with Checkbox

## 2.0.0-canary.5

### Patch Changes

- 39c848e: fix: add missing `use client` directive to Button component

## 2.0.0-canary.4

### Patch Changes

- 16e0788: add forwardRef support for better compat with react-hook-form

## 2.0.0-canary.3

### Minor Changes

- 38c2d3d: add I18nProvider

### Patch Changes

- c2a8150: rename Button component's `loading` prop to `isLoading` to align better with other prop names

## 2.0.0-canary.2

### Minor Changes

- c59ed0f: improve support for HTML forms and native form validation in form components

### Patch Changes

- 7621625: add Select component
- 834c1a9: - Import components from root package instead of subpaths for each component
  - Bundle the library with bunchee instead of unbuild, as it preserves `use client;` directives
  - Export `<Form />` component from RAC
- 0b9d56a: loosen version requirement for react-aria-components dependency
- 7a62218: - improve TextField focus/invalid styles
  - improve TextArea focus/invalid styles
  - improve Select focus/invalid styles
  - refactor: share styles between form components
  - add Comobox component
- Updated dependencies [834c1a9]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.1

## 2.0.0-canary.1

### Minor Changes

- 425dac9: Button: add support for `isIconOnly` to render a button with a single icon

## 2.0.0-canary.0

### Major Changes

- 237d9cb7: V2 canary release

### Patch Changes

- Updated dependencies [3e7d9743]
- Updated dependencies [56474385]
- Updated dependencies [237d9cb7]
  - @obosbbl/grunnmuren-icons-react@2.0.0-canary.0
