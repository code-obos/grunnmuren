---
"@obosbbl/grunnmuren-react": patch
---

Fix the way spacing is managed in `<DisclosurePanel>`. Previously pseudo-elements were used to avoid an extra `<div>` wrapper around the content. But this causes some inherent spacing around the `Disclosure` which might not be desired in some cases.
