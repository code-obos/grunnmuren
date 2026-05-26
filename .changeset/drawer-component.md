---
'@obosbbl/grunnmuren-react': minor
---

## Add `UNSAFE_Drawer` component

A side-anchored overlay built on the same react-aria-components and `HeadingContext` pattern as `UNSAFE_Modal`. Reuses `UNSAFE_Dialog` and `UNSAFE_DialogTrigger`. `placement` (`'right'` | `'left'` | `'top'` | `'bottom'`) controls which edge the drawer slides in from. `isDismissable`, `zIndex` and `className` work the same as in `UNSAFE_Modal`.

### Usage

Basic uncontrolled drawer with auto-rendered close button:

```tsx
<UNSAFE_DialogTrigger>
  <Button>Open</Button>
  <UNSAFE_Drawer>
    <UNSAFE_Dialog>
      <Heading slot="title" level={2}>
        Title
      </Heading>
      <p>Content…</p>
      <Button slot="close">Close</Button>
    </UNSAFE_Dialog>
  </UNSAFE_Drawer>
</UNSAFE_DialogTrigger>
```

Slide in from another edge:

```tsx
<UNSAFE_Drawer placement="bottom">…</UNSAFE_Drawer>
```

Controlled:

```tsx
<UNSAFE_Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
  …
</UNSAFE_Drawer>
```

Not dismissable — no close button, `Escape` and outside-click disabled:

```tsx
<UNSAFE_Drawer isDismissable={false}>…</UNSAFE_Drawer>
```
