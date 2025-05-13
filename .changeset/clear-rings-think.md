---
"@obosbbl/grunnmuren-react": patch
---

Fixes the logic behind validation states for inputs, where passing `errorMessage=""` would set the field in an invalid state. This doesn't really make sense, and can cause strange validation behaviour when using libraries like Zod. With this change setting `errorMessage` to `"" | null | undefined` is now equivalent: the field is valid, unless combined with the `isInvalid` prop set to `true`.
