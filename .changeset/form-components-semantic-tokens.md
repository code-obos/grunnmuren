---
'@obosbbl/grunnmuren-react': minor
---

Checkbox, Radio, FileUpload, Select and the listbox in Select and Combobox now read the role tokens instead of the palette, so they follow a `data-theme`. Some colours change on purpose:

- a selected checkbox or radio goes from blue-500 to the primary button's dark blue, and hovers lighter to blue-700 like the button. Today it's lighter at rest and darker on hover
- a hovered checkbox or radio goes from sky-300 to sky-200
- the focused option in a listbox goes from sky-100 to sky-200
- the Select placeholder goes from a hardcoded `#727070` to gray-700, like the other form fields

All of them still pass WCAG AA.
