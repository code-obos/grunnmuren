---
"@obosbbl/grunnmuren-react": patch
---

# LinkList

New `LinkList` component in beta. Use it to display a set of releated links. You can choose between rendering regular, download or external links on each `LinkListItem`. The `LinkListItem` uses `Link` from react aria components under the hood. Which means that you can use it with `routerOptions`. Refer to [https://react-spectrum.adobe.com/react-aria/routing.html](https://react-spectrum.adobe.com/react-aria/routing.html) for more.

## Usage

### Import
``` tsx
import {
  UNSAFE_LinkList as LinkList,
  UNSAFE_LinkListItem as LinkListItem,
} from './link-list';
```

### Standard links
``` tsx
  <LinkList>
    <LinkListItem href="/bolig">Bolig</LinkListItem>
    <LinkListItem href="/bank">Bank</LinkListItem>
    <LinkListItem href="/medlem">Medlem</LinkListItem>
  </LinkList>
```

### Download
``` tsx
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
``` tsx
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