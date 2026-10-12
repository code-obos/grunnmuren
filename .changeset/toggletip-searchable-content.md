---
'@obosbbl/grunnmuren-react': patch
---

Toggletip: while closed, the content is also rendered in a hidden `<span>` right after the trigger, so it is part of the server-rendered HTML and can be indexed by search engines. Since the trigger usually sits inside a paragraph, the content must be inline (text, links, `<strong>` and the like). A `<p>` or `<div>` in the content makes the browser close the paragraph early, which breaks hydration.
