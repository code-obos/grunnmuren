---
"@obosbbl/grunnmuren-react": patch
---

# Bugfixes for the `<Modal>` component:

- Enabling fully controlled state without use of `slot="close"`. This makes it possible to control the `open` state of the modal programatically. For instance if you need to await an asynchronous operation to complete before closing the modal.
- Expose the `isDismissable` prop from RAC - this is partially what enabled the fully controlled state described above.
- Support overriding of the `<ModalOverlay>` `z-index`.

## Breaking BETA changes

- You now have to render the <ModalOverlay> yourself, as it is no longer rendered by the `<Modal>` component.
- You need to explicitly pass `isDismissable` on `<ModalOverlay>` to make the dialog dismissable. If you are not using `<ModalOveraly>` you need to pass this prop to the `<Modal>` component instead. The `isDismissable` prop on `<ModalOverlay>` will make the modal closable by clicking the overaly, pressing `Esc` or clicking the x-button that renders in the dialog when this prop is passed.

### Before
``` tsx
<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
    <Dialog>
    <Heading slot="title" level={2}>
        Tittel
    </Heading>
    <p>Denne modalen er controlled.</p>
    <Button onPress={() => setIsOpen(false)} slot="close">
        Lukk
    </Button>
    </Dialog>
</Modal>
```

### Now
``` tsx
<ModalOverlay isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
    <Modal>
        <Dialog>
        <Heading slot="title" level={2}>
            Tittel
        </Heading>
        <p>Denne modalen er controlled.</p>
        <Button onPress={() => setIsOpen(false)}>
            Lukk
        </Button>
        </Dialog>
    </Modal>
</ModalOverlay>
```