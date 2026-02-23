# @obosbbl/grunnmuren-react

## 3.4.2

### Patch Changes

- f387774: bundle packages using tsdown
- dd9d1fe: Fixes `<Media>` styles set by the `<Carousel>` so that they only target immediate `<Media>`-children, not any nested `<Media>`. This solves issues with incorrect aspect ratios when putting components such as `<Card>` as a `<CarouselItem>`.
- Updated dependencies [f387774]
  - @obosbbl/grunnmuren-icons-react@2.1.1

## 3.4.1

### Patch Changes

- 1a11122: Minor improvements and layout fixes to scroll indicators affecting `<UNSAFE_Table>` and `<UNSAFE_Tabs>`
- ff64fb1: small changes to LinkList:
  - refactor: use Tailwind utility classes
  - feat: add prop `layout` to `<LinkListContainer>` to select between `grid` and `stack`, defaults to `stack`.
  - refactor: use cloneElement instead of React Context
  - fix: don't overwrite `animateIcon` prop on `<Link>` if specified
- 1a11122: add new (beta) component: `<Stepper>`.

  A stepper can be used to indicate progress through a predefined process.
  It makes it possible for the user to perceive how much is completed, how much that remains and what the current step is.
  It is commononly used as a form wizard.

  ```tsx
  import { UNSAFE_Step as Step, UNSAFE_Stepper as Stepper, UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';

  const MySteps = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
        <Step state="completed">
          <Link href="/skjema-steg-1">Personalia</Link>
        </Step>
        <Step progress={50}>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step isDisabled>
          <Link>Fakturainformasjon</Text>
        </Step>
        <Step isDisabled>
          <Link>Oppsummering</Text>
        </Step>
      </Stepper>
    );
  }
  ```

- 17a8712: Fix font on label components

## 3.4.0

### Minor Changes

- 344da40: feat: add `animateIcon` prop to `<Button>` and `<Link>` components

  This enables a hover animation in the direction specified by the prop.

  ```tsx
  <Button animateIcon="right">
    Se alle medlemsfordeler <ArrowRight />
  </Button>
  ```

### Patch Changes

- d83a901: Ensure focus is always visible when scrolling the `<Carousel>` using arrow keys
- 29454aa: fix: carousel controls didn't always disable at the start/end of the carousel
- e1e1055: Fixes a11y issues on `<Carousel>` components with auto play.
- 912b5f3: Exposing `UNSAFE_CarouselContext`, usage:

  ```tsx
  const { slidesInView, orientation } = useContext(UNSAFE_CarouselContext);
  ```

  The `slidesInView` is an array of the indexes of the the CarouselItems that are currently in view. While `orientation` is `'horizontal'` or `'vertical'`

## 3.3.5

### Patch Changes

- 82f1ab5: BREAKING CHANGE: Rewrote the carousel component from the ground up. It is now using [Embla carousel library](https://www.embla-carousel.com/) under the hood.
  This unlocks the component to be used as a more "traditional carousel", for instance, for an image gallery. The previous implementation was primarily designed for use in the hero.

  To migrate, do the following:
  - wrap your carousel items in a `CarouselItemsContainer` component
  - add the `CarouselControls` component with the `CarouselButton` components to render the next and previous buttons
  - rename `onChange` to `onSelect`. If you only used this for analytics purposes, consider using the `onSettled` callback instead.

  ```tsx
  <Carousel
    onSelect={(index) => console.log(index)}
    onSettled={(index) => console.log(index)}
  >
    <CarouselItemsContainer>
      <CarouselItems>
        <CarouselItem>
          <Media>
            <img src="..." alt="..." data-slot="media" />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img src="..." loading="lazy" alt="..." data-slot="media" />
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

  - feat: The carousel now supports rendering multiple items in the viewport simultaneously. Previously, the carousel always rendered a single item at a time.
  - feat: The carousel no longer renders the carousel controls (next/prev buttons) by default. You now have to render them yourself using the `CarouselControls` component. This allows you to customize the appearance of the controls, or even create your own custom controls using the `next` and `prev` component slots.
  - feat: add `initialIndex` prop to set the initial scroll index.
  - feat: add `autoPlayMs` prop to enable automatic scrolling at the given interval.
  - feat: add `loop` prop to enable infinite looping/scrolling.
  - feat: add `orientation` prop to set the orientation of the carousel, either `vertical` or `horizontal`. Default is `horizontal`.
  - feat: add `align` prop to set the alignment of the carousel items relative to the viewport. Either `start`, `center`, or `end`. Default is `center`.
  - feat: add `onSettled` prop to invoke a callback when interaction with the carousel has "settled".
  - refactor: update `<Hero>` styling to accommodate for carousel changes.

- 792bb25: fix: forward className prop to element in `<Dialog>` component
- b40ec32: Fix typography class for the `Tab` component.
- 349307f: Updated FileUpload design

## 3.3.4

### Patch Changes

- b044ca0: Replace `scrollIntoView` with `scrollTo` in `<UNSAFE_Carousel>` to prevent vertical scrolling.

## 3.3.3

### Patch Changes

- 257cec7: Alertbox: always keep the icon to the top, even when heading/content is in multiple lines
- d6cf4cf: Fixes the `<Disclosure>` component so that it can receive `children` through `DisclosureContext`

## 3.3.2

### Patch Changes

- 7939bee: fix bug where <Carousel> applied a media query outside of an effect, causing SSR issues

## 3.3.1

### Patch Changes

- 751eeca: Accordion bug fixes:
  - Removes a redundant role="group" that was added to the AccordionPanel content
  - Restore the accordion button text - accordion panel relation: the accordion panel should be labelledby the text in the accordion button.
- 0954c2d: New `<ProgressBar>` component in beta, usage:

  ```tsx
  import { UNSAFE_ProgressBar as ProgressBar } from "@obosbbl/grunnmuren-react";

  const MyProgressBar = () => (
    <ProgressBar value={30} classsName="w-96" aria-label="Laster..." />
  );
  ```

  ```tsx
  import {
    UNSAFE_ProgressBar as ProgressBar,
    UNSAFE_ProgressBarValueText as ProgressBarValueText,
  } from "@obosbbl/grunnmuren-react";

  const MyProgressBar = () => (
    <ProgressBar value={50} classsName="w-96">
      <Label>Laster:</Label>
      <ProgressBarValueText />
    </ProgressBar>
  );
  ```

  Note that the `<ProgressBar>` does not have a natural width, so you might have to give it an explicit `width` using the `className` prop. It does however have a `max-width`, set to `100%`.

- b22c21e: # Bugfixes for the `<UNSAFE_Modal>` component:
  - Fix bugs with controlled modals.
  - Expose the `isDismissable` prop from RAC - this defaults to `true` but can now be overridden to `false` if you wish to prevent a user from dismissing a modal.
  - Support overriding of the `z-index` of the modal overlay: a new `zIndex` prop is added to <UNSAFE_Modal>

## 3.3.0

### Minor Changes

- 7a22a4a: `LinkList` is now stable. Usage:

  Basic list of links:

  ```tsx
  import { Link, LinkList, LinkListItem } from "@obosbbl/grunnmuren-react";

  <LinkList>
    <LinkListItem>
      <Link href="/bolig">Bolig</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/bank">Bank</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/medlem">Medlem</Link>
    </LinkListItem>
  </LinkList>;
  ```

  External links:

  ```tsx
  import { Link, LinkList, LinkListItem } from "@obosbbl/grunnmuren-react";

  <LinkList>
    <LinkListItem>
      <Link href="https://minside.obosnett.no/login" rel="external">
        OBOS Nett - Min side
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link
        href="https://www.tryg.no"
        rel="external noopener noreferrer"
        target="_blank"
      >
        Les mer om trygg forsikring
      </Link>
    </LinkListItem>
  </LinkList>;
  ```

  Downloadable files:

  ```tsx
  import { Link, LinkList, LinkListItem } from "@obosbbl/grunnmuren-react";

  <LinkList>
    <LinkListItem>
      <Link download href="/vilkar.pdf">
        Medlemsvilkår
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link download href="/consent.pdf">
        Samtykke
      </Link>
    </LinkListItem>
  </LinkList>;
  ```

  With headings:

  ```tsx
  import {
    Heading,
    Link,
    LinkList,
    LinkListContainer,
    LinkListItem,
  } from "@obosbbl/grunnmuren-react";

  <LinkListContainer>
    <Heading level={2}>
      <Link href="/om">OBOS</Link>
    </Heading>
    <LinkList>
      <LinkListItem>
        <Link href="/bolig">Bolig</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/bank">Bank</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/medlem">Medlem</Link>
      </LinkListItem>
    </LinkList>
  </LinkListContainer>;
  ```

### Patch Changes

- 6dc3cf2: Movments in the `Carousel` are now eliminated when using arrow keys for users that has a reduced motion preferrence
- 5cb5f28: Respect prefers-reduced-motion when user clicks the prev/next buttons in the `<Carousel>` component.

## 3.2.1

### Patch Changes

- 0f8cd6d: ## Breaking Beta change
  The `<LinkList>` API has now been refactored to support headings inside link lists.
  - `<LinkListItem>` no longer supports link props, the component must now receive a `<Link>` as a child to which link props are passed
  - The `isExternal` prop has been removed `<LinkListItem>`. External links are now identified byt the `rel` prop on the `<Link>` child (e.g `<Link rel="external">`)

  ### Before

  ```tsx
  <LinkList>
    <LinkListItem href="/medlem">Les mer</LinkListItem>
    <LinkListItem download href="/medlemsvilkar.pdf">
      Medlemsvilkår
    </LinkListItem>
    <LinkListItem
      href="https://www.tryg.no/forsikringer/fordeler-hos-tryg/bruk-medlemsfordelene-dine/obos/index.html?cmpid=obos_tryggjennomlivet"
      rel="external"
    >
      Tryg forsikring
    </LinkListItem>
  </LinkList>
  ```

  ### Now

  ```tsx
  <LinkList>
    <LinkListItem>
      <Link href="/bolig">Bolig</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/bank" download href="/medlemsvilkar.pdf">
        Medlemsvilkår
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link
        href="/medlem"
        href="https://www.tryg.no/forsikringer/fordeler-hos-tryg/bruk-medlemsfordelene-dine/obos/index.html?cmpid=obos_tryggjennomlivet"
        rel="external"
      >
        Tryg forsikring
      </Link>
    </LinkListItem>
  </LinkList>
  ```

  ## Use Headings (with links)

  ```tsx
  <LinkListContainer>
    <Heading level={2}>
      <Link href="/om">OBOS</Link>
    </Heading>
    <LinkList>
      <LinkListItem>
        <Link href="/bolig">Bolig</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/bank">Bank</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/medlem">Medlem</Link>
      </LinkListItem>
    </LinkList>
  </LinkListContainer>
  ```

- 1c04f75: # Breaking Beta Change
  Exposing `<LinkListContainer>` as part of the `<LinkList>` API. This allows for easier customization and flexibility. Since it is now possible to style the container and the list individually. This means you can still just render shorter lists (less than 6 LinkListItems) like before:

  ```tsx
  <LinkList>
    <LinkListItem href="/bolig">Bolig</LinkListItem>
    <LinkListItem href="/bank">Bank</LinkListItem>
    <LinkListItem href="/medlem">Medlem</LinkListItem>
  </LinkList>
  ```

  But the `<LinkList>` itself will no longer divide larger list (more than 5 LinkListItems) into multiple columns like before. For that you will now need to wrap it in the `<LinkListContainer>`:

  ```tsx
  <LinkListContainer>
    <LinkList>
      <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
      <LinkListItem href="/styret">Styret</LinkListItem>
      <LinkListItem href="/representantskapet">Representantskapet</LinkListItem>
      <LinkListItem href="/boligpriser-og-statistikk">
        Boligpriser og statistikk
      </LinkListItem>
      <LinkListItem href="/investor-relations">Investor Relations</LinkListItem>
      <LinkListItem href="/digital-arsrapport">Digital årsrapport</LinkListItem>
    </LinkList>
  </LinkListContainer>
  ```

  This also paves way for supporting `<Heading>` inside the `<LinkListContainer>`, above the `<LinkListContainer>`. Stay tuned!

- 0f8cd6d: Better screen reader support in the `<Link>` component: annonuce external links.

## 3.2.0

### Minor Changes

- 2cd13e7: Disclosure: out of BETA 🚀

### Patch Changes

- 21fde1f: Link: fix transition animation not triggering in LinkList
- 5a1734a: Expose `<UNSAFE_TableContainer>`, a tiny wrapper for the `<ResizableTableContainer>` [from RAC](https://react-spectrum.adobe.com/react-aria/Table.html#resizabletablecontainer-1). Along with `<UNSAFE_TableColumnResizer>` that can be used to resize and set width limits to columns in the `<UNSAFE_Table>` component.

  Usage:

  ```tsx
  import {
    Content,
    UNSAFE_Table as Table,
    UNSAFE_TableBody as TableBody,
    UNSAFE_TableCell as TableCell,
    UNSAFE_TableColumn as TableColumn,
    UNSAFE_TableColumnResizer as TableColumnResizer,
    UNSAFE_TableContainer as TableContainer,
    UNSAFE_TableHeader as TableHeader,
    UNSAFE_TableRow as TableRow,
  } from "@obosbbl/grunnmuren-react";

  export const FixedColumns = () => (
    <TableContainer>
      <Table aria-label="Eiendomsforvaltere">
        <TableHeader>
          <TableColumn maxWidth={144}>Navn</TableColumn>
          <TableColumn maxWidth={144}>E-post</TableColumn>
          <TableColumn maxWidth={144}>Område</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Kari Hansen</TableCell>
            <TableCell>kari.hansen@obos.no</TableCell>
            <TableCell>Grünerløkka</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lars Olsen</TableCell>
            <TableCell>lars.olsen@obos.no</TableCell>
            <TableCell>Frogner</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ingrid Svendsen</TableCell>
            <TableCell>ingrid.svendsen@obos.no</TableCell>
            <TableCell>Majorstuen</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  export const ResizeableColumns = () => (
    <TableContainer>
      <Table aria-label="Table with resizable columns">
        <TableHeader>
          <TableColumn id="file" isRowHeader>
            <Content>
              <span tabIndex={-1} className="column-name">
                Filnavn
              </span>
              <TableColumnResizer />
            </Content>
          </TableColumn>
          <TableColumn id="size">Størrelse</TableColumn>
          <TableColumn id="date">
            <Content>
              <span tabIndex={-1} className="column-name">
                Dato
              </span>
              <TableColumnResizer />
            </Content>
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>2022-Roadmap-Proposal-Revision-012822-Copy(2)</TableCell>
            <TableCell>214 KB</TableCell>
            <TableCell>November 27, 2022 at 4:56PM</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>62259692_p0_master1200</TableCell>
            <TableCell>120 KB</TableCell>
            <TableCell>January 27, 2021 at 1:56AM</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
  ```

- e51ad09: Support for rendering standalone `<DisclosureButton>` without wrapping it in a `<Disclosure>` parent. The expand/collapse state can then be managed through the `aria-expanded`, `aria-controls` and `onPress`/`onClick` props. This will allow for a bit more flexibility to compose expandable and collapsable widgets. Such as tables:

  ```tsx
  import { Fragment, useState } from 'react';

  import {
    DisclosureButton as DisclosureButton
    UNSAFE_Table as Table,
    UNSAFE_TableBody as TableBody,
    UNSAFE_TableCell as TableCell,
    UNSAFE_TableColumn as TableColumn,
    UNSAFE_TableColumnResizer as TableColumnResizer,
    UNSAFE_TableContainer as TableContainer,
    UNSAFE_TableHeader as TableHeader,
    UNSAFE_TableRow as TableRow,
  } from '@obosbbl/grunnmuren-react';

  export const ExpandableRows = () => {
    const years = [2025, 2026, 2027];
    const [expandedYears, setExpandedYears] = useState(
      Object.fromEntries(years.map((year) => [year, false])),
    );

    const months = [
      'januar',
      'februar',
      'mars',
      'april',
      'mai',
      'juni',
      'juli',
      'august',
      'september',
      'oktober',
      'november',
      'desember',
    ];

    return (
      <TableContainer className="container">
        <Table aria-label="Lånekostnader" variant="zebra-striped">
          <TableHeader>
            <TableColumn maxWidth={200}>Termin</TableColumn>
            <TableColumn maxWidth={200}>Renter</TableColumn>
            <TableColumn maxWidth={200}>Avdrag</TableColumn>
            <TableColumn maxWidth={200}>Månedskostnader</TableColumn>
          </TableHeader>
          <TableBody>
            {years.map((year) => (
              <Fragment key={year}>
                <TableRow className="*:align-middle">
                  <TableCell>{year}</TableCell>
                  <TableCell>1 200 kr</TableCell>
                  <TableCell>18 000 kr</TableCell>
                  <TableCell>
                    <DisclosureButton
                      withChevron
                      aria-controls={months
                        .map((month) => `${year}-${month}`)
                        .join(' ')}
                      aria-expanded={expandedYears[year]}
                      aria-label={`Månedlige kostnader for ${year}`}
                      onPress={() =>
                        setExpandedYears((prevState) => ({
                          ...prevState,
                          [year]: !prevState[year],
                        }))
                      }
                      isIconOnly
                    />
                  </TableCell>
                </TableRow>
                {expandedYears[year] &&
                  months.map((month) => (
                    <TableRow key={`${year}-${month}`} id={`${year}-${month}`}>
                      <TableCell className="capitalize">{month}</TableCell>
                      <TableCell>120 kr</TableCell>
                      <TableCell colSpan={2}>1 500 kr</TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  ```

  **_Note that an uncontrolled `<DisclosureButton>` without a `<Disclosure>` parent is not supported, as this would not have any practical application._**

## 3.1.3

### Patch Changes

- 73bd887: Link: fix link having a force flex, should respect the consumers css
- 56d249c: Refactor state management for next / prev buttons in `Carousel`. This ensures the current items index is set correctly even during batched state updates.

## 3.1.2

### Patch Changes

- 1ef9bd0: Backlink/Breadcrumbs: use our own Link internally to dogfood our library
- 2c6661e: Link/LinkList: use our own Link component to build up our LinkList component. One step closer to stable versions of both components.
- 96d1ef6: Set carousel items out of view to inert. This makes it easier for keyboard users and screen reader users to skip long carousels.

## 3.1.1

### Patch Changes

- 6d732f2: Reverts the `DisclosureGroup` implementation of `Accordion`. This means `allowsMultipleExpanded` can not be supported after all. For those use cases: see [`DisclosureGroup`](https://grunnmuren.obos.no/komponenter/disclosure#11cea02cc7fc)

## 3.1.0

### Minor Changes

- 394f256: TagGroup is now stable

### Patch Changes

- f6c78d9: Pass on all HTML props to the `Hero` component.
- 4534344: Accept HTML props in Carousel component
- 40cd836: Fix `CarouselProps` type so that the `onChange` prop works as expected again.
- 332f895: Disclosure: fix bug where children would get tabIndex even though the disclouse is not expanded
- c2ebf9a: Scroll bug-fixes for the `Carousel` component
- 27b6c42: **Accordion now uses Disclosure internally**

  The `Accordion` component has been refactored to use `Disclosure` components under the hood, improving consistency across the component library.

  **Breaking changes (deprecated, will be removed in v4.0):**

  The following `AccordionItem` props have been renamed to align with `Disclosure`:
  - `isOpen` → `isExpanded`
  - `defaultOpen` → `defaultExpanded`
  - `onOpenChange` → `onExpandedChange`

  The old prop names still work in this version but will be removed in Grunnmuren v4.0.

  **New features:**
  - `Accordion` now accepts all `DisclosureGroup` props
  - `AccordionItem` now accepts all `Disclosure` props
  - By default, multiple accordion items can be expanded simultaneously
  - Use `allowsMultipleExpanded={false}` to allow only one item open at a time:

  ```tsx
  <Accordion allowsMultipleExpanded={false}>
    <AccordionItem>...</AccordionItem>
    <AccordionItem>...</AccordionItem>
  </Accordion>
  ```

  **Note:** The `Disclosure` component will be moved out of BETA status once we've validated this implementation through user testing.

## 3.0.16

### Patch Changes

- 1f476d5: Support unslotted buttons in `<Carousel>`. With this fix you can pass buttons as children to the `<CarouselItem>` component.

## 3.0.15

### Patch Changes

- fc27a88: SEO fix for `<Tabs>`: Force hidden TabPanels to render, while being `inert` and visually hidden. This ensures that `<TabPanel>` content is always crawlable by search engines.

## 3.0.14

### Patch Changes

- 49ad337: New component `Table` component is in beta.

  ```ts
  import {
    UNSAFE_Table as Table,
    UNSAFE_TableBody as TableBody,
    UNSAFE_TableCell as TableCell,
    UNSAFE_TableColumn as TableColumn,
    UNSAFE_TableHeader as TableHeader,
    UNSAFE_TableRow as TableRow,
  } from '@obosbbl/grunnmuren-react';

  <Table>
    <TableHeader>
      <TableColumn>Produkt</TableColumn>
      <TableColumn>Gjeldende rente</TableColumn>
      <TableColumn>Vilkår</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <div>
            <div className="font-medium">Sparekonto Egenkapital</div>
            <div className="text-xs">For OBOS-medlemmer</div>
          </div>
        </TableCell>
        <TableCell>
          <div className="font-medium">4,70 % per år</div>
        </TableCell>
        <TableCell>
          <ul className="space-y-1 text-xs">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>1 gebyrfritt uttak per kalendermåned</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Uttak utover dette belastes med gebyr på 1,5 % av uttaksbeløpet<span>
            </li>
          </ul>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  ```

## 3.0.13

### Patch Changes

- f3d2db5: Fix current color on focus ring color for `<Link>` and make underline disappear on hover (to match `<Button variant="tertiary">`)

## 3.0.12

### Patch Changes

- f5af2da: Add flex styles to `<UNSAFE_Link>` for better out-of-the-box layout with icons.

## 3.0.11

### Patch Changes

- a600f77: Add `UNSAFE_` prefix to the `Link` component

## 3.0.10

### Patch Changes

- c212899: Changes alignment of the delete button for files in `<FileUpload>` from center to top.
- e867dac: New `<Link>` component in beta. This is a very small style-wrapper for the `<Link>` component from `react-aria-components`.
- e086013: Passes rest props to the root element of the component, not the `<ul>` tag. If you are passing other HTML props than `className` to the `<LinkList>` this will be a breaking change.
- c212899: Removes implicit width from files in `<FileUpload>`. These now span the maximum width of the widest filename, while also respecting max-width of any container.
- b971ad6: The `<Card>` component now supports all HTML (`<div>`) props.

## 3.0.9

### Patch Changes

- 2dadcbd: Adjust `row-gap` in horizontal `<Card>` with `<Media>` to match layout grid.
- 7581bdc: Increase the height of `<Media>` inside `full-bleed` `<Hero>` on small screens.

## 3.0.8

### Patch Changes

- 1449289: Render `<LinkList>` with 9 items over three columns on large screens

## 3.0.7

### Patch Changes

- 867a895: Fixes the `className` passing for the `<Card>` component. This was previously passed to the inner container, the "card" itself. It is now passed to the newly added outer container, used for container queries. This avoids some layout bugs where the cards have an implicit width.

## 3.0.6

### Patch Changes

- 811d3a5: The responsive behavior of the `<Card>` component is now controlled with container queries. This makes the responsive behavior more consistent and predictable.

## 3.0.5

### Patch Changes

- cdf9237: Fixes a layout issue in the `LinkList` component that caused the list items to stretch if the component was placed in a container that caused it to stretch to a height greater than its natural height.

## 3.0.4

### Patch Changes

- 1f965ac: Bugfixes for `LinkList`: `className` passing and layout fixes for rendering inside `flex` and `grid` containers.

## 3.0.3

### Patch Changes

- 93947b9: Fix `LinkList` exports

## 3.0.2

### Patch Changes

- c949568: Changes active and hover colors on `Radio` and `Checkbox` from `green` to `blue`. Also changes the border in the `Accordion.Content` from `mint` to `sky`.
- 739eefb: Make selected `Tags` visible not only through color. The visual style of a selected/removable `Tag` is now enhanced with a reversed contrast.
- c16967a: # LinkList

  New `LinkList` component in beta. Use it to display a set of related links. You can choose between rendering regular, download or external links on each `LinkListItem`. The `LinkListItem` uses `Link` from react aria components under the hood. Which means that you can use it with `routerOptions`. Refer to [https://react-spectrum.adobe.com/react-aria/routing.html](https://react-spectrum.adobe.com/react-aria/routing.html) for more.

  ## Usage

  ### Import

  ```tsx
  import {
    UNSAFE_LinkList as LinkList,
    UNSAFE_LinkListItem as LinkListItem,
  } from "./link-list";
  ```

  ### Standard links

  ```tsx
  <LinkList>
    <LinkListItem href="/bolig">Bolig</LinkListItem>
    <LinkListItem href="/bank">Bank</LinkListItem>
    <LinkListItem href="/medlem">Medlem</LinkListItem>
  </LinkList>
  ```

  ### Download

  ```tsx
  <LinkList>
    <LinkListItem download href="/">
      Medlemsvilkår
    </LinkListItem>
    <LinkListItem download href="/about">
      Samtykke
    </LinkListItem>
  </LinkList>
  ```

  ### External

  ```tsx
  <LinkList>
    <LinkListItem href="/forsikring">Forsikring</LinkListItem>
    <LinkListItem
      href="https://www.tryg.no/forsikringer/fordeler-hos-tryg/bruk-medlemsfordelene-dine/obos/index.html?cmpid=obos_tryggjennomlivet"
      isExternal
      target="_blank"
    >
      Les mer om trygg forsikring
    </LinkListItem>
  </LinkList>
  ```

## 3.0.1

### Patch Changes

- 60d6e26: New `<Tab>` component in beta, usage:

  ```tsx
  import {
    UNSAFE_Tab as Tab,
    UNSAFE_TabList as TabList,
    UNSAFE_TabPanel as TabPanel,
    UNSAFE_Tabs as Tabs,
  } from "./tabs";

  const MyTabs = () => (
    <Tabs>
      <TabList aria-label="Boligkjøp">
        <Tab id="grunnpris">Grunnpris</Tab>
        <Tab id="tilvalg">Tilvalg</Tab>
        <Tab id="finansiering">Finansiering</Tab>
      </TabList>
      <TabPanel id="grunnpris">
        <h3 className="mb-4 font-semibold text-lg">Grunnpris</h3>
        <p>
          Grunnprisen inkluderer alle standardspesifikasjoner som er definert
          for boligen. Dette omfatter kjøkken, bad, gulv og andre grunnutstyr.
        </p>
      </TabPanel>
      <TabPanel id="tilvalg">
        <p>
          <h3 className="mb-4 font-semibold text-lg">Tilvalg</h3>
          Her kan du velge oppgraderinger som hvitevarer, gulvtyper, fliser og
          andre tilpasningsmuligheter for å skape ditt drømmehjem.
        </p>
      </TabPanel>
      <TabPanel id="finansiering">
        <h3 className="mb-4 font-semibold text-lg">Finansiering</h3>
        <p>
          OBOS Bank tilbyr konkurransedyktige boliglån med gunstige vilkår for
          våre medlemmer. Få hjelp til å finansiere ditt boligkjøp.
        </p>
      </TabPanel>
    </Tabs>
  );
  ```

  Note that the `id` of each `<Tab>` must correspond to the `id` of a `<Tabpanel>`. The order of the `<Tab>` components determines the order, and the order of the `<TabPanel>` components is insignificant.

  The component supports both horizontal and vertical orientation:

  ```tsx
  const MyVerticalTabs = () => (
    <Tabs orientation="vertical">
      <TabList aria-label="Boligkjøp">
        <Tab id="grunnpris">Grunnpris</Tab>
        <Tab id="tilvalg">Tilvalg</Tab>
        <Tab id="finansiering">Finansiering</Tab>
      </TabList>
      <TabPanel id="grunnpris">
        <h3 className="mb-4 font-semibold text-lg">Grunnpris</h3>
        <p>
          Grunnprisen inkluderer alle standardspesifikasjoner som er definert
          for boligen. Dette omfatter kjøkken, bad, gulv og andre grunnutstyr.
        </p>
      </TabPanel>
      <TabPanel id="tilvalg">
        <p>
          <h3 className="mb-4 font-semibold text-lg">Tilvalg</h3>
          Her kan du velge oppgraderinger som hvitevarer, gulvtyper, fliser og
          andre tilpasningsmuligheter for å skape ditt drømmehjem.
        </p>
      </TabPanel>
      <TabPanel id="finansiering">
        <h3 className="mb-4 font-semibold text-lg">Finansiering</h3>
        <p>
          OBOS Bank tilbyr konkurransedyktige boliglån med gunstige vilkår for
          våre medlemmer. Få hjelp til å finansiere ditt boligkjøp.
        </p>
      </TabPanel>
    </Tabs>
  );
  ```

  Horizontal tabs will be scrollable if the `<Tabs>` overflows it's container.

## 3.0.0

### Major Changes

- fd89afd: Changes background colors on buttons. The `green` color prop value is now replaced by `blue`. So upgrading to this version means you have to migrate any `<Button color="green">` to `<Button color="blue">`. You also have to make sure the new colors have sufficent contranst against your backgrounds.

  Buttons like these will need a visual check against their backgrounds:
  - `<Button>`
  - `<Button variant="primary">`
  - `<Button color="blue">`
  - `<Button color="blue" variant="primary" >`
  - `<Button variant="secondary">`
  - `<Button color="blue" variant="secondary">`

  Since `blue` is the new default for `color`, you _probably_ only have <Button> or <Button variant="secondary"> and maybe <Button variant="primary"> in your code base. As the rest of the combinations would be verbose considering the the defaults.

- 90cfb8e: Removes the deprecated `isLoading` prop from `<Button>` and `<Combobox>`, it is now fully replaced by the `isPending` prop.

### Patch Changes

- 149c818: FileUpload: don't create ul-tag for files if there are no files added to file upload

## 2.3.4

### Patch Changes

- 5abf6d0: The `Hero` component now renders `<Media>` in responsive aspect ratios for the `standard` and `two-column` variants. The same behaviour is also applied to the `<Carousel>` component.
- 90538a4: Change font-weight from semibold to medium in `<Accordion>`
- 6831caf: Auto hyphenation for headings in `Hero`

## 2.3.3

### Patch Changes

- 0b84a39: Adding an `onChange` prop to the `<Carousel>` component. This prop can be used to track navigation within the `<Carousel>`.
  The `onChange` callback is triggered when a user navigates to a new item in the Carousel. The argument to the callback is an object containing `index` of the new item scrolled into view and the `id` of that item (if set on the `<CarouselItem>`). It also provides `prevIndex` which is the index of the previous item that was in view. And `prevId`, which is the id of the previous item that was in view (if set on the `<CarouselItem>`)

  Usage:

  ```tsx
  <Carousel
    onChange={({ id, index, prevId, prevIndex }) => {
      console.log(`
        Carousel changed to item with id: "${id}" and index: ${index}.
        The previous item id was: "${prevId}" and index: ${prevIndex}.
        This indicates that the user navigated to the ${prevIndex < index ? "next" : "previous"} item.
      `);
    }}
  >
    <CarouselItems>
      <CarouselItem id="first">
        <Media>
          <img
            src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
            alt=""
          />
        </Media>
      </CarouselItem>
      <CarouselItem id="second">
        <Media>
          <img
            src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
            alt=""
          />
        </Media>
      </CarouselItem>
      <CarouselItem id="third">
        <Media fit="contain">
          <img
            src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
            alt=""
          />
        </Media>
      </CarouselItem>
    </CarouselItems>
  </Carousel>
  ```

## 2.3.2

### Patch Changes

- 2a0445e: FileUpload: fix bug with not adding fileType to files that have been renamed

## 2.3.1

### Patch Changes

- d470365: Fixes a layout bug in `<Hero variant="full-bleed">` that causes content below it to be placed behind `<Carousel>` children.

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
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
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
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
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
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
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
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
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
