---
"@obosbbl/grunnmuren-react": patch
---

Fix `Button` context in `<Disclosure>` which solves an issue with `<Button>` placed inside the `<DisclosurePanel>` would toggle the `<Disclosure>`, this acting like the "trigger" button for the `<Disclosure>`.
