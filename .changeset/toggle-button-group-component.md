---
'@obosbbl/grunnmuren-react': patch
---

Add `UNSAFE_ToggleButtonGroup` and `UNSAFE_ToggleButton` components (beta). A segmented control where one or several buttons can be selected.

```tsx
<UNSAFE_ToggleButtonGroup aria-label="Rentetype" defaultSelectedKeys={['fixed']}>
  <UNSAFE_ToggleButton id="fixed">Fastrente</UNSAFE_ToggleButton>
  <UNSAFE_ToggleButton id="floating">Flytende rente</UNSAFE_ToggleButton>
</UNSAFE_ToggleButtonGroup>
```
