---
'@obosbbl/grunnmuren-react': patch
---

Add sortable column support to `UNSAFE_Table` with a sort indicator, and export the `UNSAFE_SortDescriptor` type.

```tsx
<UNSAFE_Table sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
  <UNSAFE_TableHeader>
    <UNSAFE_TableColumn id="name" allowsSorting>Name</UNSAFE_TableColumn>
  </UNSAFE_TableHeader>
</UNSAFE_Table>
```
