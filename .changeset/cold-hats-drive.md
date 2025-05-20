---
"@obosbbl/grunnmuren-react": patch
---

Fixes an accessibility issue with the `<RadioGroup>` component, where passing `value=""` as a prop caused the radio input to get `tabindex="-1"`. Which would make it inaccessible to keyboard and screen reader users.
