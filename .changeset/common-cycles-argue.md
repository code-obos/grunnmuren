---
"@obosbbl/grunnmuren-tailwind": patch
"@obosbbl/grunnmuren-react": patch
---

small changes to LinkList:
* refactor: use Tailwind utility classes
* feat: add prop `layout` to `<LinkListContainer>` to select between `grid` and `stack`, defaults to `stack`.
* refactor: use cloneElement instead of React Context
* fix: don't overwrite `animateIcon` prop on `<Link>` if specified
