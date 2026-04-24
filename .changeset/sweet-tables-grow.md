---
"@obosbbl/grunnmuren-react": patch
---

## Fix Table responsiveness inside a container and add native expand/collapse

**Fixes responsiveness when `UNSAFE_Table` is wrapped in `UNSAFE_TableContainer`.** Previously, both components created their own horizontal scroll wrapper, causing two conflicting scroll contexts and making the `ResizableTableContainer` compute column widths against the wrong element. Now `UNSAFE_Table` always owns the internal scroll wrapper, and the container only provides an internal context that switches the underlying overflow element between React Aria's `ResizableTableContainer` and a plain div.

**Adds native expand/collapse support via react-aria-components 1.17.** `UNSAFE_Table` now accepts `treeColumn`, `expandedKeys`, `defaultExpandedKeys`, and `onExpandedChange` (forwarded from RAC). The chevron button is rendered automatically inside `UNSAFE_TableCell` for cells in the tree column when the row has nested children, so consumers only need to write:

```tsx
<UNSAFE_Table
  aria-label="…"
  treeColumn="name"
  expandedKeys={expandedKeys}
  onExpandedChange={setExpandedKeys}
>
  <UNSAFE_TableHeader>
    <UNSAFE_TableColumn id="name" isRowHeader>Name</UNSAFE_TableColumn>
    {/* … */}
  </UNSAFE_TableHeader>
  <UNSAFE_TableBody>
    <UNSAFE_TableRow id={parent.id}>
      <UNSAFE_TableCell>{parent.name}</UNSAFE_TableCell>
      {/* … */}
      <UNSAFE_TableRow id={child.id}>
        <UNSAFE_TableCell>{child.name}</UNSAFE_TableCell>
        {/* … */}
      </UNSAFE_TableRow>
    </UNSAFE_TableRow>
  </UNSAFE_TableBody>
</UNSAFE_Table>
```

The chevron follows the tree/grid pattern (`ChevronRight` when collapsed, rotated 90° down when expanded), with the same transition speed as `Disclosure`.

## Rename `UNSAFE_TableContainer` to `UNSAFE_ResizableTableContainer`

The new name clarifies that the container enables column resizing (`UNSAFE_TableColumnResizer`) and fixed column widths (`maxWidth`/`minWidth` on `UNSAFE_TableColumn`) — it is not just a generic wrapper. `UNSAFE_TableContainer` and `UNSAFE_TableContainerProps` are kept as deprecated aliases during the `UNSAFE_` phase and will be removed when the component is stabilized.

```tsx
// Before
import { UNSAFE_TableContainer } from '@obosbbl/grunnmuren-react';

// After
import { UNSAFE_ResizableTableContainer } from '@obosbbl/grunnmuren-react';
```
