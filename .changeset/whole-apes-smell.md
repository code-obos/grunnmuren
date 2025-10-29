---
"@obosbbl/grunnmuren-react": patch
---

**Accordion now uses Disclosure internally**

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
