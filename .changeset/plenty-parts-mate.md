---
"@obosbbl/grunnmuren-react": patch
---

Fixes the way spacing is managed in `<DisclosurePanel>`. Pseudo-elements were used to avoid an extra `<div>` wrapper around the content. But this caused some inherent spacing around the `Disclosure` which might not be desired in some cases.
