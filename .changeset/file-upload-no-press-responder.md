---
"@obosbbl/grunnmuren-react": patch
---

`FileUpload` no longer relies on react-aria's `PressResponder` to open the file dialog. It passes `onPress` through RAC's `ButtonContext` instead, which it already provides. `PressResponder` only works if the responder and the button read the exact same `PressResponderContext`, and since RAC pins `react-aria` to an exact version while we use a range, an app could easily end up with two react-aria copies. The button would then silently stop opening the file dialog, with no error to go on.
