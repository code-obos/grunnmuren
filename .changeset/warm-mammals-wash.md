---
"@obosbbl/grunnmuren-react": patch
---

New component `Table` component is in beta.

```ts
import {
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from '@obosbbl/grunnmuren-react';

<Table>
  <TableHeader>
    <TableColumn>Produkt</TableColumn>
    <TableColumn>Gjeldende rente</TableColumn>
    <TableColumn>Vilkår</TableColumn>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">Sparekonto Egenkapital</div>
          <div className="text-xs">For OBOS-medlemmer</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">4,70 % per år</div>
      </TableCell>
      <TableCell>
        <ul className="space-y-1 text-xs">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>1 gebyrfritt uttak per kalendermåned</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Uttak utover dette belastes med gebyr på 1,5 % av uttaksbeløpet<span>
          </li>
        </ul>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```