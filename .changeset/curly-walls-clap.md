---
'@obosbbl/grunnmuren-tailwind': minor
'@obosbbl/grunnmuren-react': minor
---

Add new colors mint and sky. Old colors are deprecated

`blue-light` -> `sky`
`blue-lightest` -> `sky-light`

`green-light` -> `mint`
`green-lightest` -> `mint-light`

`gray-concrete` -> -> `gray-lightest`

`<Button>` has a new Color-prop `mint` which is the same as `light-green`.

`<Chip>` has new Color-props `mint` and `sky` which are the same as `green-light` and `blue-light` respectively.

`<CardList> | <Banner>` have new Color-props `mint` and `sky` which are the same as `green` and `blue` respectively

The old props and colors are deprecated and will be removed in the next major version. 