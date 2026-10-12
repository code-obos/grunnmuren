---
'@obosbbl/grunnmuren-react': patch
---

Toggletip: the content is now also rendered in a `hidden` element right after the trigger while the toggletip is closed, so it is part of the server-rendered HTML and can be indexed by search engines. Before, the content was only in the DOM while open. Use phrasing content only (no `<p>` or `<div>`), since the trigger is often placed inside a paragraph.
