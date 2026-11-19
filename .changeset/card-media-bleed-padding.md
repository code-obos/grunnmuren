---
'@obosbbl/grunnmuren-react': patch
---

Fix `<Card>` media not reaching the card edges after the padding increase. The negative margin on `<Media>` still used the old `p-3` spacing, so images sat about 12px in from the top and sides. It now matches the `p-6` card padding.
