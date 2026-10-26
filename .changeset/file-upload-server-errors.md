---
"@obosbbl/grunnmuren-react": patch
---

`FileUpload` now shows server errors from `<Form validationErrors>` even if an app has two `react-stately` copies. RAC's `Form` provides the errors through `react-stately`'s `FormValidationContext`, but `FileUpload` read them from our own copy, which could be a different one since RAC pins `react-stately` to an exact version while we use a range. `FileUpload` now picks up the errors from RAC's `FormContext` and passes them on to its own copy.
