---
"@obosbbl/grunnmuren-react": patch
---

Accordions: use Disclosure internally. This means that we are dogfooding components with our own components. Disclosure is beeing using under the hood of Accordion. We have added more props to Accordion, but at the same time some props are deprecated. Accordion now accepts all the same props as Disclosure. 

Accordion -> DisclosureGroupProps
AccordionItem -> DisclosureProps

```ts
AccordionItem:
isOpen -> isExpanded
defaultOpen -> defaultExpanded
onOpenChange -> onExpandedChange
```

Accordion will let all accordions be open by default, but can be switched off:

```ts
<Accordion allowsMultipleExpanded={false}>
    ...,
</Accordion>
```

They will still work throughout this major version, but will be removed in GM@4

We will move Disclosure out of BETA after we have tested that this is working as it should throughout our user's usage
