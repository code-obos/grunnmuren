---
"@obosbbl/grunnmuren-react": patch
---

Fixes the `className` passing for the `<Card>` component. This was previously passed to the inner container, the "card" itself. It is now passed to the newly added outer container, used for container queries. This avoids some layout bugs where the cards have an implicit width.
