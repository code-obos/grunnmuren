---
'@obosbbl/grunnmuren-react': patch
---

`UNSAFE_Modal` / `UNSAFE_Drawer`: padding moved from the scroll container to `UNSAFE_Dialog`. Default appearance is unchanged, but consumers who used to override container padding can now drop that workaround. Fullscreen modals now get the same default padding as non-fullscreen.
