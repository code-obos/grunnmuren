---
'@obosbbl/grunnmuren-tailwind': patch
---

`prose` reads the `--gm-paragraph-*` tokens on its root too, so its line height is 24px instead of 28px and lists line up with the paragraphs. A theme that changes the paragraph tokens reaches lists and other body text in `prose`, not just paragraphs.
