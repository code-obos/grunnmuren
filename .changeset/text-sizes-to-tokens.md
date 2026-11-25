---
'@obosbbl/grunnmuren-react': patch
---

The components use the `paragraph` and `description` text styles instead of Tailwind's `text-xs`, `text-sm` and `text-base`, so their text follows the design tokens and a theme. Line heights follow the tokens too, so Accordion, Alertbox, Breadcrumbs, Table, Tag Group and the error message on form fields are a bit tighter, and the Alertbox footer is 14px instead of 12px. Tailwind's own `text-*` classes are unchanged.
