---
'@obosbbl/grunnmuren-tailwind': major
---

BREAKING CHANGE: Update font setup to include new font-family, `OBOSDisplay`.

* Remove OBOSText-Bold in favor of OBOSDisplay-SemiBold.
* Change font-family of `heading-xl` and `heading-l` to OBOSDisplay.
* Change name of font-family `OBOSFont` to `OBOSText` to make the distinction between OBOSDisplay and OBOSText clearer.
* Remove Tailwind's default `font-sans` utility in favor of `font-display` and `font-text` to change the font family.
    * If you were previously using next/font and extending the font family in your Tailwind configuration to support that, you should remove all this as the preset now includes an in built font-fallback.