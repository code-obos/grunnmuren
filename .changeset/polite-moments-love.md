---
"@obosbbl/grunnmuren-react": patch
---

# Bugfixes for the `<UNSAFE_Modal>` component:

- Enabling fully controlled state without use of `slot="close"`. This makes it possible to control the `open` state of the modal programmatically. For instance if you need to await an asynchronous operation to complete before closing the modal.
- Expose the `isDismissable` prop from RAC - this is partially what enabled the fully controlled state described above.
- Support overriding of the `<UNSAFE_ModalOverlay>` `z-index`.

## Breaking BETA changes

- You now have to render the <UNSAFE_ModalOverlay> yourself, as it is no longer rendered by the `<UNSAFE_Modal>` component.
- You need to explicitly pass `isDismissable` on `<UNSAFE_ModalOverlay>` to make the dialog dismissable. If you are not using `<UNSAFE_ModalOverlay>` you need to pass this prop to the `<UNSAFE_Modal>` component instead. The `isDismissable` prop on `<UNSAFE_ModalOverlay>` will make the modal closable by clicking the overlay, pressing `Esc` or clicking the x-button that renders in the dialog when this prop is passed.

### Before
``` tsx
<UNSAFE_Modal isOpen={isOpen} onOpenChange={setIsOpen}>
    <UNSAFE_Dialog>
    <Heading slot="title" level={2}>
        Tittel
    </Heading>
    <p>Denne modalen er controlled.</p>
    <Button onPress={() => setIsOpen(false)} slot="close">
        Lukk
    </Button>
    </UNSAFE_Dialog>
</UNSAFE_Modal>
```

### Now
``` tsx
<UNSAFE_ModalOverlay isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
    <UNSAFE_Modal>
        <UNSAFE_Dialog>
        <Heading slot="title" level={2}>
            Tittel
        </Heading>
        <p>Denne modalen er controlled.</p>
        <Button onPress={() => setIsOpen(false)}>
            Lukk
        </Button>
        </UNSAFE_Dialog>
    </UNSAFE_Modal>
</UNSAFE_ModalOverlay>
```