---
'@obosbbl/grunnmuren-react': patch
---

Carousel: the previous and next buttons update when the carousel is measured again, for instance after a resize. Before, a carousel set up before its layout was final could keep its next button disabled until someone scrolled.
