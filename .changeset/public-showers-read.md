---
"@obosbbl/grunnmuren-react": patch
---

Passes rest props to the root element of the component, not the `<ul>` tag. If you are passing other HTML props than `className` to the `<LinkList>` this will be a breaking change.
