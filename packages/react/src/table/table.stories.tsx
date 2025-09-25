import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    conditions: [
      'Ingen gebyrer for uttak',
      'Skattefordeler ved innskudd',
      'Maksimalt 1 konto',
    ],
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

export const Default: Story = {
  render: () => (
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
                <div className="text-gray-medium text-xs">{item.subtitle}</div>
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
  ),
};

export const Simple: Story = {
  render: () => (
    <Table aria-label="Simple table example">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Administrator</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Moderator</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithScrolling: Story = {
  render: () => (
    <div className="max-w-md">
      <Table aria-label="Wide content table (scroll to see navigation)">
        <TableHeader>
          <TableColumn>Product Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Availability</TableColumn>
          <TableColumn>Rating</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Advanced Widget Pro</TableCell>
            <TableCell>
              A comprehensive solution for all your widget needs
            </TableCell>
            <TableCell>Electronics</TableCell>
            <TableCell>$299.99</TableCell>
            <TableCell>In Stock</TableCell>
            <TableCell>4.8/5</TableCell>
            <TableCell>View Details</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Smart Device Ultra</TableCell>
            <TableCell>
              Next-generation smart device with AI capabilities
            </TableCell>
            <TableCell>Technology</TableCell>
            <TableCell>$599.99</TableCell>
            <TableCell>Limited</TableCell>
            <TableCell>4.9/5</TableCell>
            <TableCell>Pre-order</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Basic Tool Kit</TableCell>
            <TableCell>Essential tools for everyday tasks</TableCell>
            <TableCell>Tools</TableCell>
            <TableCell>$49.99</TableCell>
            <TableCell>In Stock</TableCell>
            <TableCell>4.2/5</TableCell>
            <TableCell>Add to Cart</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
