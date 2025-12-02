---
"@obosbbl/grunnmuren-react": patch
---

Bugfixes for the `<Modal>` component:

- Enabling fully controlled state without use of `slot="close"`. This makes it possible to control the `open` state of the modal programatically. For instance if you need to await an asynchronous operation to complete before closing the modal.
- Expose the `isDismissable` prop from RAC - this is partially what enabled the fully controlled state described above.
- Support overriding of the `<ModalOverlay>` `z-index`.
