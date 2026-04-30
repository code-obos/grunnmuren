---
"@obosbbl/grunnmuren-react": patch
---

Refactor `LinkListItem` to no longer use `React.Children.only` / `cloneElement`. Previously, `LinkListItem` inspected its `Link` child's props to inject the appropriate icon and animation. This pattern crashed when `Link` children crossed an RSC serialization boundary (Server Component → Client Component) and forced consumers to wrap the composition in their own `'use client'` component.

The icon/animation auto-derivation now flows through a new `LinkListContext`. `LinkList` and `LinkListContainer` provide it; `Link` reads it and auto-derives `animateIcon` and the trailing icon from its own `download` / `rel` props.

### ⚠️ Breaking change

A `Link` placed directly inside a `Heading` inside a `LinkListContainer` now also gets an auto-icon. If you previously added the icon (and `animateIcon`) manually, you will see **two icons** until the manual one is removed.

**Before:**

```tsx
<LinkListContainer>
  <Heading level={2}>
    <Link href="/om" animateIcon="right">
      OBOS <ArrowRight />
    </Link>
  </Heading>
  <LinkList>{/* ... */}</LinkList>
</LinkListContainer>
```

**After:**

```tsx
<LinkListContainer>
  <Heading level={2}>
    <Link href="/om">OBOS</Link>
  </Heading>
  <LinkList>{/* ... */}</LinkList>
</LinkListContainer>
```

Additionally, an `animateIcon` set explicitly on a `Link` inside a `LinkListItem` is now respected (previously `LinkListItem` would override it).

### Overriding auto-icons

`LinkListContext` is exported so consumers can override behavior at any granularity by providing their own value above the section they want to control:

```tsx
import { LinkListContext, LinkList, LinkListItem, UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';

// Disable auto-icons for an entire list
<LinkListContext.Provider value={{ shouldRenderAutoIcons: false }}>
  <LinkList>
    <LinkListItem>
      <Link href="/a">A</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/b">B</Link>
    </LinkListItem>
  </LinkList>
</LinkListContext.Provider>;

// Disable auto-icons for a single LinkListItem
<LinkList>
  <LinkListItem>
    <Link href="/a">A (auto icon)</Link>
  </LinkListItem>
  <LinkListItem>
    <LinkListContext.Provider value={{ shouldRenderAutoIcons: false }}>
      <Link href="/b">B (no icon)</Link>
    </LinkListContext.Provider>
  </LinkListItem>
</LinkList>;

// Disable auto-icon for a Link inside a Heading (and provide a custom one)
<LinkListContainer>
  <Heading level={2}>
    <LinkListContext.Provider value={{ shouldRenderAutoIcons: false }}>
      <Link href="/om">
        OBOS <CustomIcon />
      </Link>
    </LinkListContext.Provider>
  </Heading>
  <LinkList>{/* ... */}</LinkList>
</LinkListContainer>;
```
