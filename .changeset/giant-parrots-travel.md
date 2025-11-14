---
"@obosbbl/grunnmuren-react": patch
---

# Breaking Beta Change
Exposing `<LinkListContainer>` as part of the `<LinkList>` API. This allows for easier customization and flexibility. Since it is now possible to style the container and the list individually. This means you can still just render shorter lists (less than 6 LinkListItems) like before:

``` tsx
<LinkList>
  <LinkListItem href="/bolig">Bolig</LinkListItem>
  <LinkListItem href="/bank">Bank</LinkListItem>
  <LinkListItem href="/medlem">Medlem</LinkListItem>
</LinkList>
```

But the `<LinkList>` itself will no longer divide larger list (more than 5 LinkListItems) into multiple columns like before. For that you will now need to wrap it in the `<LinkListContainer>`:

``` tsx
<LinkListContainer>
  <LinkList>
    <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
    <LinkListItem href="/styret">Styret</LinkListItem>
    <LinkListItem href="/representantskapet">
      Representantskapet
    </LinkListItem>
    <LinkListItem href="/boligpriser-og-statistikk">
      Boligpriser og statistikk
    </LinkListItem>
    <LinkListItem href="/investor-relations">
      Investor Relations
    </LinkListItem>
    <LinkListItem href="/digital-arsrapport">
      Digital årsrapport
    </LinkListItem>
  </LinkList>
</LinkListContainer>
```

This also paves way for supporting `<Heading>` inside the `<LinkListContainer>`, above the `<LinkListContainer>`. Stay tuned!