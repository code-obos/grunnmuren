---
"@obosbbl/grunnmuren-react": patch
---

## Deprecating automatic `<Badge>` overlay positioning inside `<Card>`

Removes the custom border radius and edge bleeding that was previously added to `<Badge>` when rendered in a `<Media>` inside a `<Card>`. This simplifies styling when a consumer wants to have multiple badges overlaid on the `<Media>` of `<Card>`.

The automatic absolute positioning of `<Badge>` inside `<Media>` in `<Card>` will be removed in future releases. The reason for this change is flexibility and accessibility:

- By removing the auto-overlay effect, it is up to the consumer to define the position of the `<Badge>`.
- By not assuming that the `<Badge>` should go in the `<Media>` tag, it is possible to render the `<Badge>` after the `<Heading>` element, which is the semantically correct place for it.

Even though the auto-overlay will persist for now for backward compatibility, we strongly advise everyone to rewrite their rendering of `<Badge>` inside `<Media>`. Render the `<Badge>` after the `<Heading>` inside `<Content>` with explicit positioning instead, which ensures the HTML is read correctly by screen readers:

```tsx
// Before (still backward compatible for now, with minor style changes)
<Card>
  <Media>
    <Badge color="blue-dark">Meldefrist</Badge>
    <img alt="" src="..." />
  </Media>
  <Content>
    <Heading level={3}>...</Heading>
  </Content>
</Card>

// After (correct semantic HTML with minimal custom styles)
<Card>
  <Media>
    <img alt="" src="..." />
  </Media>
  <Content>
    <Heading level={3}>...</Heading>
    <Badge color="blue-dark" size="small" className="absolute top-3.5 left-3.5">
      Meldefrist
    </Badge>
  </Content>
</Card>
```
