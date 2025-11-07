---
"@obosbbl/grunnmuren-react": patch
---

Support for rendering standalone `<DisclosureButton>` without wrapping it in a `<Disclosure>` parent. The expand/collapse state can then be managed through the `aria-expanded`, `aria-controls` and `onPress`/`onClick` props. This will allow for a bit more flexibility to compose expandable and collapsable widgets. Such as tables:

``` tsx
import { Fragment, useState } from 'react';

import {
  UNSAFE_DisclosureButton as DisclosureButton
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableColumnResizer as TableColumnResizer,
  UNSAFE_TableContainer as TableContainer,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from '@obosbbl/grunnmuren-react';

export const ExpandableRows = () => {
  const years = [2025, 2026, 2027];
  const [expandedYears, setExpandedYears] = useState(
    Object.fromEntries(years.map((year) => [year, false])),
  );

  const months = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
  ];

  return (
    <TableContainer className="container">
      <Table aria-label="Lånekostnader" variant="zebra-striped">
        <TableHeader>
          <TableColumn maxWidth={200}>Termin</TableColumn>
          <TableColumn maxWidth={200}>Renter</TableColumn>
          <TableColumn maxWidth={200}>Avdrag</TableColumn>
          <TableColumn maxWidth={200}>Månedskostnader</TableColumn>
        </TableHeader>
        <TableBody>
          {years.map((year) => (
            <Fragment key={year}>
              <TableRow className="*:align-middle">
                <TableCell>{year}</TableCell>
                <TableCell>1 200 kr</TableCell>
                <TableCell>18 000 kr</TableCell>
                <TableCell>
                  <DisclosureButton
                    withChevron
                    aria-controls={months
                      .map((month) => `${year}-${month}`)
                      .join(' ')}
                    aria-expanded={expandedYears[year]}
                    aria-label={`Månedlige kostnader for ${year}`}
                    onPress={() =>
                      setExpandedYears((prevState) => ({
                        ...prevState,
                        [year]: !expandedYears[year],
                      }))
                    }
                    isIconOnly
                  />
                </TableCell>
              </TableRow>
              {expandedYears[year] &&
                months.map((month) => (
                  <TableRow key={`${year}-${month}`} id={`${year}-${month}`}>
                    <TableCell className="capitalize">{month}</TableCell>
                    <TableCell>120 kr</TableCell>
                    <TableCell colSpan={2}>1 500 kr</TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
```


***Note that an uncontrolled `<DisclosureButton>` without a `<Disclosure>` parent is not supported, as this would not have any practical application.***
