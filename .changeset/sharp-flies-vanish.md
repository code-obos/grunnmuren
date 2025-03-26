---
"@obosbbl/grunnmuren-react": patch
---

Support dynamic children based on component state in `<Disclosure>`. For example, you can now do:

``` TSX
<Disclosure>
    {({ isExpanded }) => (
    <>
        <DisclosureButton className="lg:hidden">
            {isExpanded ? (
            <Close className="h-6 w-6" aria-label="Close" />
            ) : (
            <Menu className="h-6 w-6" aria-label="Menu" />
            )}
        </DisclosureButton>
        <DisclosurePanel className="lg:hidden">
        <MainNav />
        </DisclosurePanel>
    </>
    )}
</Disclosure>
```
