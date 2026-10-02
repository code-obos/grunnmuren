---
'@obosbbl/grunnmuren-react': minor
---

The form fields (textfield, textarea, numberfield, select, combobox) now read the role tokens instead of the palette, so they follow a `data-theme`. Two colours change on purpose: the error message text goes from red-500 to red-600, and the placeholder from a hardcoded `#727070` to gray-700. Both are darker and easier to read.

If your app overrides `--color-neutral-*` or `--color-danger-*` names in its own `@theme`, the form fields pick those values up now.
