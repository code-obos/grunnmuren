---
"@obosbbl/grunnmuren-react": patch
---

`<Card>` now respects the `size` prop (if set) on it's `<Heading>`. This makes it possible to customize the size of the heading in a `<Card>`:

``` tsx
<Card>
  <Content>
    <Heading level={3} size="m">Medium heading</Heading>
    <p>
      This heading is customized
    </p>
  </Content>
</Card>
```
