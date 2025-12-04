---
"@obosbbl/grunnmuren-react": patch
---

# Bugfixes for the `<UNSAFE_Modal>` component:

- Fix bugs with controlled modals.
- Expose the `isDismissable` prop from RAC - this defaults to `true` but can now be overridden to `false` if you wish to prevent a user from dismissing a modal.
- Support overriding of the `z-index` of the modal overlay: a new `zIndex` prop is added to <UNSAFE_Modal>