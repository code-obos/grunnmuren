---
'@obosbbl/grunnmuren-react': minor
---

Badge, TagGroup, Avatar, Backlink and LinkList now read the role tokens instead of the palette, so they follow a `data-theme`. Some colours change on purpose:

- the `gray-dark` badge goes darker, from gray-700 to gray-900
- the `sky` badge and hovered tags go a step lighter, since there is no surface at sky-300
- a selected tag goes from blue-500 to the primary button's dark blue, and hovers lighter to blue-700 like the button does
- the avatar placeholder goes from gray-200 to gray-100

All of them still pass WCAG AA.
