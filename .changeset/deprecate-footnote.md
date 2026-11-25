---
'@obosbbl/grunnmuren-tailwind': patch
'@obosbbl/grunnmuren-react': patch
---

`footnote` is deprecated, use `description` instead. It has no design token and isn't in Figma. It still works as before, and is removed in the next major.

`<FileUpload>` uses `description` for the file extension and size, so that text is 14px instead of 12px.
