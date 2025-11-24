---
"@obosbbl/grunnmuren-react": minor
---

`LinkList` is now stable. Usage:

Basic list of links:

```tsx
import { Link, LinkList, LinkListItem } from '@obosbbl/grunnmuren-react';

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
```

External links:

```tsx
import { Link, LinkList, LinkListItem } from '@obosbbl/grunnmuren-react';

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
</LinkList>
```

Downloadable files:

```tsx
import { Link, LinkList, LinkListItem } from '@obosbbl/grunnmuren-react';

<LinkList>
  <LinkListItem>
    <Link download href="/">
      Medlemsvilkår
    </Link>
  </LinkListItem>
  <LinkListItem>
    <Link download href="/about">
      Samtykke
    </Link>
  </LinkListItem>
</LinkList>
```

With headings:

```tsx
import { Heading, Link, LinkList, LinkListContainer, LinkListItem } from '@obosbbl/grunnmuren-react';

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
