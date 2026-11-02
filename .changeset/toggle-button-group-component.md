---
'@obosbbl/grunnmuren-react': patch
---

Add `UNSAFE_ToggleButtonGroup` and `UNSAFE_ToggleButton` components (beta). A segmented control where one or several buttons can be selected.

```tsx
<UNSAFE_ToggleButtonGroup
  aria-label="Rentetype"
  defaultSelectedKeys={['fixed']}
  disallowEmptySelection
>
  <UNSAFE_ToggleButton id="fixed">
    <Lock />
    Fastrente
  </UNSAFE_ToggleButton>
  <UNSAFE_ToggleButton id="floating">
    <ArrowsRightLeft />
    Flytende rente
  </UNSAFE_ToggleButton>
</UNSAFE_ToggleButtonGroup>
```
