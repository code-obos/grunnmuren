---
"@obosbbl/grunnmuren-react": patch
---

Expose `<UNSAFE_TableContainer>`, a tiny wrapper for the `<ResizableTableContainer>` [from RAC](https://react-spectrum.adobe.com/react-aria/Table.html#resizabletablecontainer-1). Along with `<UNSAFE_TableColumnResizer>` that can be used to resize and set width limits to columns in the `<UNSAFE_Table>` component.

Usage:

``` tsx
import {
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableColumnResizer as TableColumnResizer,
  UNSAFE_TableContainer as TableContainer,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from './table';
export const FixedColumns = () => (
  <TableContainer>
    <Table aria-label="Eiendomsforvaltere">
      <TableHeader>
        <TableColumn maxWidth={144}>Navn</TableColumn>
        <TableColumn maxWidth={144}>E-post</TableColumn>
        <TableColumn maxWidth={144}>Område</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Kari Hansen</TableCell>
          <TableCell>kari.hansen@obos.no</TableCell>
          <TableCell>Grünerløkka</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lars Olsen</TableCell>
          <TableCell>lars.olsen@obos.no</TableCell>
          <TableCell>Frogner</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ingrid Svendsen</TableCell>
          <TableCell>ingrid.svendsen@obos.no</TableCell>
          <TableCell>Majorstuen</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export const ResizeableColumns = () => (
  <TableContainer>
    <Table aria-label="Table with resizable columns">
      <TableHeader>
        <TableColumn id="file" isRowHeader>
          <div className="flex-wrapper">
            <span tabIndex={-1} className="column-name">
              Filnavn
            </span>
            <TableColumnResizer />
          </div>
        </TableColumn>
        <TableColumn id="size">Størrelse</TableColumn>
        <TableColumn id="date">
          <div className="flex-wrapper">
            <span tabIndex={-1} className="column-name">
              Dato
            </span>
            <TableColumnResizer />
          </div>
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2022-Roadmap-Proposal-Revision-012822-Copy(2)</TableCell>
          <TableCell>214 KB</TableCell>
          <TableCell>November 27, 2022 at 4:56PM</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>62259692_p0_master1200</TableCell>
          <TableCell>120 KB</TableCell>
          <TableCell>January 27, 2021 at 1:56AM</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
```
