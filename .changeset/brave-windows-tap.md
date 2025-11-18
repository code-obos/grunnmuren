---
"@obosbbl/grunnmuren-react": patch
---

## Breaking Beta change
The `<LinkList>` API has now been refactored to support headings inside link lists.

- `<LinkListItem>` no longer supports link props, the component must now receive a `<Link>` as a child to which link props are passed
- The `isExternal` prop has been removed `<LinkListItem>`. External links are now identified byt the `rel` prop on the `<Link>` child (e.g `<Link rel="external">`)


### Before
``` tsx
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
``` tsx
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

``` tsx
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