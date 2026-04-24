import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';

import { Content } from '../content';
import {
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableColumnResizer as TableColumnResizer,
  UNSAFE_ResizableTableContainer as ResizableTableContainer,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from './table';

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

const sampleData = [
  {
    id: '1',
    product: 'Sparekonto Egenkapital',
    subtitle: 'For OBOS-medlemmer',
    rate: '4,70 % per år',
    conditions: [
      '1 gebyrfritt uttak per kalendermåned',
      'Uttak utover dette belastes med gebyr på 1,5 % av uttaksbeløpet',
      'Ingen krav om at pengene du sparer opp brukes på bolig',
      'Maksimalt 1 konto',
    ],
  },
  {
    id: '2',
    product: 'Sparekonto',
    subtitle: 'For OBOS-medlemmer',
    rate: '4,07 % per år',
    conditions: [
      '24 gebyrfrie uttak per kalendermåned',
      'Uttak utover dette belastes med gebyr på 1,5 % av uttaksbeløpet',
      'Maksimalt 9 kontoer',
    ],
  },
  {
    id: '3',
    product: 'Høyrentekonto',
    subtitle: 'For OBOS-medlemmer',
    rate: '5,00 % per år',
    conditions: [
      'Ubegrenset antall gebyrfrie uttak',
      'Ingen minsteinnskudd',
      'Ingen gebyrer for kontoadministrasjon',
    ],
  },
  {
    id: '4',
    product: 'Ungdomskonto',
    subtitle: 'For OBOS-medlemmer',
    rate: '3,50 % per år',
    conditions: [
      '3 gebyrfrie uttak per kalendermåned',
      'For kunder under 30 år',
      'Maksimalt 2 kontoer',
    ],
  },
  {
    id: '5',
    product: 'Pensjonskonto',
    subtitle: 'For OBOS-medlemmer',
    rate: '4,90 % per år',
    conditions: ['Ingen gebyrer for uttak', 'Skattefordeler ved innskudd', 'Maksimalt 1 konto'],
  },
  {
    id: '6',
    product: 'Familiekonto',
    subtitle: 'For OBOS-medlemmer',
    rate: '4,25 % per år',
    conditions: [
      '15 gebyrfrie uttak per kalendermåned',
      'Samarbeid mellom familiemedlemmer',
      'Ingen krav om at innskuddene brukes på bolig',
    ],
  },
];

export const Default = () => (
  <Table aria-label="Sparekonto oversikt">
    <TableHeader>
      <TableColumn>Produkt</TableColumn>
      <TableColumn>Gjeldende rente</TableColumn>
      <TableColumn>Vilkår</TableColumn>
    </TableHeader>
    <TableBody>
      {sampleData.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <div>
              <div className="font-medium">{item.product}</div>
              <div className="text-xs">{item.subtitle}</div>
            </div>
          </TableCell>
          <TableCell>
            <div className="font-medium">{item.rate}</div>
          </TableCell>
          <TableCell>
            <ul className="space-y-1 text-xs">
              {item.conditions.map((condition) => (
                <li key={condition} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Simple = () => (
  <Table aria-label="Eiendomsforvaltere">
    <TableHeader>
      <TableColumn>Navn</TableColumn>
      <TableColumn>E-post</TableColumn>
      <TableColumn>Område</TableColumn>
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
);

export const ZebraVariant = () => (
  <Table aria-label="Eiendomsforvaltere med zebra-stripete rader" variant="zebra-striped">
    <TableHeader>
      <TableColumn>Navn</TableColumn>
      <TableColumn>E-post</TableColumn>
      <TableColumn>Område</TableColumn>
      <TableColumn>Telefon</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Kari Hansen</TableCell>
        <TableCell>kari.hansen@obos.no</TableCell>
        <TableCell>Grünerløkka</TableCell>
        <TableCell>+47 123 45 678</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Lars Olsen</TableCell>
        <TableCell>lars.olsen@obos.no</TableCell>
        <TableCell>Frogner</TableCell>
        <TableCell>+47 234 56 789</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Ingrid Svendsen</TableCell>
        <TableCell>ingrid.svendsen@obos.no</TableCell>
        <TableCell>Majorstuen</TableCell>
        <TableCell>+47 345 67 890</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Ola Nordmann</TableCell>
        <TableCell>ola.nordmann@obos.no</TableCell>
        <TableCell>Sagene</TableCell>
        <TableCell>+47 456 78 901</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Anne Berger</TableCell>
        <TableCell>anne.berger@obos.no</TableCell>
        <TableCell>Bislett</TableCell>
        <TableCell>+47 567 89 012</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const WithScrolling = () => (
  <div className="max-w-md">
    <Table aria-label="Tilgjengelige OBOS-boliger (scroll for å se navigasjon)">
      <TableHeader>
        <TableColumn>Adresse</TableColumn>
        <TableColumn>Bydel</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Pris</TableColumn>
        <TableColumn>Kvadratmeter</TableColumn>
        <TableColumn>Soverom</TableColumn>
        <TableColumn>Felleskost</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Trondheimsveien 42A</TableCell>
          <TableCell>Grünerløkka</TableCell>
          <TableCell>3-roms</TableCell>
          <TableCell>4 850 000 kr</TableCell>
          <TableCell>75 kvm</TableCell>
          <TableCell>2</TableCell>
          <TableCell>3 500 kr/mnd</TableCell>
          <TableCell>Ledig</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Frognerveien 15B</TableCell>
          <TableCell>Frogner</TableCell>
          <TableCell>4-roms</TableCell>
          <TableCell>7 200 000 kr</TableCell>
          <TableCell>95 kvm</TableCell>
          <TableCell>3</TableCell>
          <TableCell>4 200 kr/mnd</TableCell>
          <TableCell>Reservert</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Majorstuen gate 8C</TableCell>
          <TableCell>Majorstuen</TableCell>
          <TableCell>2-roms</TableCell>
          <TableCell>3 900 000 kr</TableCell>
          <TableCell>55 kvm</TableCell>
          <TableCell>1</TableCell>
          <TableCell>2 800 kr/mnd</TableCell>
          <TableCell>Ledig</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export const FixedColumns = () => (
  <ResizableTableContainer>
    <Table aria-label="Eiendomsforvaltere">
      <TableHeader>
        <TableColumn minWidth={144}>Navn</TableColumn>
        <TableColumn minWidth={144}>E-post</TableColumn>
        <TableColumn minWidth={144}>Område</TableColumn>
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
  </ResizableTableContainer>
);

export const ResizeableColumns = () => (
  <ResizableTableContainer>
    <Table aria-label="Table with resizable columns">
      <TableHeader>
        <TableColumn id="file" isRowHeader>
          <Content>
            <span tabIndex={-1} className="column-name">
              Filnavn
            </span>
            <TableColumnResizer />
          </Content>
        </TableColumn>
        <TableColumn id="size">Størrelse</TableColumn>
        <TableColumn id="date">
          <Content>
            <span tabIndex={-1} className="column-name">
              Dato
            </span>
            <TableColumnResizer />
          </Content>
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
  </ResizableTableContainer>
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

/**
 * Uses the native react-aria-components expand/collapse API available
 * from v1.17. Declare a `treeColumn` on the Table (the column that shows
 * the hierarchy), render nested <TableRow>s inside a parent <TableRow>,
 * and use <TableExpandButton> in the parent's tree-column cell. React
 * Aria wires up aria-expanded, keyboard toggling (arrow-left/right) and
 * the indentation attributes automatically.
 */
export const ExpandableRows = () => {
  const years = [2025, 2026, 2027];
  const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set());

  return (
    <Table
      aria-label="Lånekostnader"
      variant="zebra-striped"
      treeColumn="term"
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
    >
      <TableHeader>
        <TableColumn id="term" isRowHeader>
          Termin
        </TableColumn>
        <TableColumn id="interest">Renter</TableColumn>
        <TableColumn id="installment">Avdrag</TableColumn>
        <TableColumn id="total">Månedskostnader</TableColumn>
      </TableHeader>
      <TableBody>
        {years.map((year) => (
          <TableRow key={year} id={year}>
            <TableCell>{year}</TableCell>
            <TableCell>1 200 kr</TableCell>
            <TableCell>18 000 kr</TableCell>
            <TableCell>19 200 kr</TableCell>
            {months.map((month) => (
              <TableRow key={`${year}-${month}`} id={`${year}-${month}`}>
                <TableCell className="capitalize">{month}</TableCell>
                <TableCell>120 kr</TableCell>
                <TableCell>1 500 kr</TableCell>
                <TableCell>1 620 kr</TableCell>
              </TableRow>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
