import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import {
  Select,
  SelectHeader,
  SelectItem,
  SelectProps,
  SelectSection,
} from './Select';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const counties = [
  {
    name: 'Oslo',
    municipalities: [{ name: 'Oslo', county: 'Oslo' }],
  },
  {
    name: 'Viken',
    municipalities: [
      { name: 'Asker', county: 'Viken' },
      { name: 'Aurskog-Høland', county: 'Viken' },
      { name: 'Bærum', county: 'Viken' },
      { name: 'Drammen', county: 'Viken' },
      { name: 'Eidsvoll', county: 'Viken' },
      { name: 'Enebakk', county: 'Viken' },
      { name: 'Fet', county: 'Viken' },
      { name: 'Fredrikstad', county: 'Viken' },
      { name: 'Frogn', county: 'Viken' },
      { name: 'Gjerdrum', county: 'Viken' },
      { name: 'Halden', county: 'Viken' },
      { name: 'Hobøl', county: 'Viken' },
      { name: 'Hurdal', county: 'Viken' },
      { name: 'Indre Østfold', county: 'Viken' },
      { name: 'Lillestrøm', county: 'Viken' },
      { name: 'Lørenskog', county: 'Viken' },
      { name: 'Moss', county: 'Viken' },
      { name: 'Nannestad', county: 'Viken' },
      { name: 'Nes', county: 'Viken' },
      { name: 'Nesodden', county: 'Viken' },
      { name: 'Nittedal', county: 'Viken' },
      { name: 'Oppegård', county: 'Viken' },
      { name: 'Rælingen', county: 'Viken' },
      { name: 'Råde', county: 'Viken' },
      { name: 'Rakkestad', county: 'Viken' },
      { name: 'Skiptvet', county: 'Viken' },
      { name: 'Spydeberg', county: 'Viken' },
      { name: 'Ski', county: 'Viken' },
      { name: 'Sørum', county: 'Viken' },
      { name: 'Trøgstad', county: 'Viken' },
      { name: 'Vestby', county: 'Viken' },
      { name: 'Våler', county: 'Viken' },
    ],
  },
  {
    name: 'Vestfold og Telemark',
    municipalities: [
      { name: 'Horten', county: 'Vestfold og Telemark' },
      { name: 'Holmestrand', county: 'Vestfold og Telemark' },
      { name: 'Larvik', county: 'Vestfold og Telemark' },
      { name: 'Nøtterøy', county: 'Vestfold og Telemark' },
      { name: 'Re', county: 'Vestfold og Telemark' },
      { name: 'Sandefjord', county: 'Vestfold og Telemark' },
      { name: 'Stokke', county: 'Vestfold og Telemark' },
      { name: 'Svelvik', county: 'Vestfold og Telemark' },
      { name: 'Tjøme', county: 'Vestfold og Telemark' },
      { name: 'Tønsberg', county: 'Vestfold og Telemark' },
    ],
  },
  {
    name: 'Agder',
    municipalities: [
      { name: 'Arendal', county: 'Agder' },
      { name: 'Birkenes', county: 'Agder' },
      { name: 'Bygland', county: 'Agder' },
      { name: 'Bykle', county: 'Agder' },
      { name: 'Evje og Hornnes', county: 'Agder' },
      { name: 'Farsund', county: 'Agder' },
      { name: 'Flekkefjord', county: 'Agder' },
      { name: 'Gjerstad', county: 'Agder' },
      { name: 'Grimstad', county: 'Agder' },
      { name: 'Hægebostad', county: 'Agder' },
      { name: 'Iveland', county: 'Agder' },
      { name: 'Kristiansand', county: 'Agder' },
      { name: 'Kvinesdal', county: 'Agder' },
      { name: 'Lillesand', county: 'Agder' },
      { name: 'Lyngdal', county: 'Agder' },
      { name: 'Risør', county: 'Agder' },
      { name: 'Sirdal', county: 'Agder' },
      { name: 'Tvedestrand', county: 'Agder' },
      { name: 'Valle', county: 'Agder' },
      { name: 'Vegårshei', county: 'Agder' },
      { name: 'Vennesla', county: 'Agder' },
      { name: 'Åmli', county: 'Agder' },
      { name: 'Åseral', county: 'Agder' },
    ],
  },
  {
    name: 'Innlandet',
    municipalities: [
      { name: 'Alvdal', county: 'Innlandet' },
      { name: 'Eidskog', county: 'Innlandet' },
      { name: 'Elverum', county: 'Innlandet' },
      { name: 'Engerdal', county: 'Innlandet' },
      { name: 'Folldal', county: 'Innlandet' },
      { name: 'Grue', county: 'Innlandet' },
      { name: 'Hamar', county: 'Innlandet' },
      { name: 'Kongsvinger', county: 'Innlandet' },
      { name: 'Løten', county: 'Innlandet' },
      { name: 'Nord-Odal', county: 'Innlandet' },
      { name: 'Os', county: 'Innlandet' },
      { name: 'Rendalen', county: 'Innlandet' },
      { name: 'Ringebu', county: 'Innlandet' },
      { name: 'Stange', county: 'Innlandet' },
      { name: 'Stor-Elvdal', county: 'Innlandet' },
      { name: 'Sør-Odal', county: 'Innlandet' },
      { name: 'Tolga', county: 'Innlandet' },
      { name: 'Trysil', county: 'Innlandet' },
      { name: 'Tynset', county: 'Innlandet' },
      { name: 'Våler', county: 'Innlandet' },
      { name: 'Åmot', county: 'Innlandet' },
      { name: 'Åsnes', county: 'Innlandet' },
      { name: 'Gjøvik', county: 'Innlandet' },
      { name: 'Lillehammer', county: 'Innlandet' },
    ],
  },
  {
    name: 'Møre og Romsdal',
    municipalities: [
      { name: 'Aukra', county: 'Møre og Romsdal' },
      { name: 'Aure', county: 'Møre og Romsdal' },
      { name: 'Averøy', county: 'Møre og Romsdal' },
      { name: 'Fjord', county: 'Møre og Romsdal' },
      { name: 'Giske', county: 'Møre og Romsdal' },
      { name: 'Gjemnes', county: 'Møre og Romsdal' },
      { name: 'Haram', county: 'Møre og Romsdal' },
      { name: 'Hareid', county: 'Møre og Romsdal' },
      { name: 'Herøy', county: 'Møre og Romsdal' },
      { name: 'Kristiansund', county: 'Møre og Romsdal' },
      { name: 'Midsund', county: 'Møre og Romsdal' },
      { name: 'Molde', county: 'Møre og Romsdal' },
      { name: 'Nesset', county: 'Møre og Romsdal' },
      { name: 'Norddal', county: 'Møre og Romsdal' },
      { name: 'Orskog', county: 'Møre og Romsdal' },
      { name: 'Ørsta', county: 'Møre og Romsdal' },
      { name: 'Sandøy', county: 'Møre og Romsdal' },
      { name: 'Skodje', county: 'Møre og Romsdal' },
      { name: 'Smøla', county: 'Møre og Romsdal' },
      { name: 'Stordal', county: 'Møre og Romsdal' },
      { name: 'Stranda', county: 'Møre og Romsdal' },
      { name: 'Sula', county: 'Møre og Romsdal' },
      { name: 'Sunndal', county: 'Møre og Romsdal' },
      { name: 'Surnadal', county: 'Møre og Romsdal' },
      { name: 'Sykkylven', county: 'Møre og Romsdal' },
      { name: 'Tingvoll', county: 'Møre og Romsdal' },
      { name: 'Tustna', county: 'Møre og Romsdal' },
      { name: 'Ulstein', county: 'Møre og Romsdal' },
      { name: 'Vanylven', county: 'Møre og Romsdal' },
      { name: 'Vestnes', county: 'Møre og Romsdal' },
      { name: 'Volda', county: 'Møre og Romsdal' },
      { name: 'Ørskog', county: 'Møre og Romsdal' },
      { name: 'Ålesund', county: 'Møre og Romsdal' },
    ],
  },
  {
    name: 'Rogaland',
    municipalities: [
      { name: 'Bjerkreim', county: 'Rogaland' },
      { name: 'Bokn', county: 'Rogaland' },
      { name: 'Eigersund', county: 'Rogaland' },
      { name: 'Finnoy', county: 'Rogaland' },
      { name: 'Forsand', county: 'Rogaland' },
      { name: 'Gjesdal', county: 'Rogaland' },
      { name: 'Haugesund', county: 'Rogaland' },
      { name: 'Hjelmeland', county: 'Rogaland' },
      { name: 'Karmoy', county: 'Rogaland' },
      { name: 'Klepp', county: 'Rogaland' },
      { name: 'Kvitsøy', county: 'Rogaland' },
      { name: 'Lund', county: 'Rogaland' },
      { name: 'Randaberg', county: 'Rogaland' },
      { name: 'Sandnes', county: 'Rogaland' },
      { name: 'Sauda', county: 'Rogaland' },
      { name: 'Sokndal', county: 'Rogaland' },
      { name: 'Sola', county: 'Rogaland' },
      { name: 'Stavanger', county: 'Rogaland' },
      { name: 'Strand', county: 'Rogaland' },
      { name: 'Suldal', county: 'Rogaland' },
      { name: 'Time', county: 'Rogaland' },
      { name: 'Tysvær', county: 'Rogaland' },
      { name: 'Utsira', county: 'Rogaland' },
      { name: 'Vindafjord', county: 'Rogaland' },
    ],
  },
  {
    name: 'Trøndelag',
    municipalities: [
      { name: 'Agdenes', county: 'Trøndelag' },
      { name: 'Bjugn', county: 'Trøndelag' },
      { name: 'Flatanger', county: 'Trøndelag' },
      { name: 'Fosnes', county: 'Trøndelag' },
      { name: 'Frosta', county: 'Trøndelag' },
      { name: 'Frøya', county: 'Trøndelag' },
      { name: 'Grong', county: 'Trøndelag' },
      { name: 'Heim', county: 'Trøndelag' },
      { name: 'Hitra', county: 'Trøndelag' },
      { name: 'Holtålen', county: 'Trøndelag' },
      { name: 'Høylandet', county: 'Trøndelag' },
      { name: 'Inderøy', county: 'Trøndelag' },
      { name: 'Indre Fosen', county: 'Trøndelag' },
      { name: 'Leka', county: 'Trøndelag' },
      { name: 'Levanger', county: 'Trøndelag' },
      { name: 'Lierne', county: 'Trøndelag' },
      { name: 'Malvik', county: 'Trøndelag' },
      { name: 'Meldal', county: 'Trøndelag' },
      { name: 'Melhus', county: 'Trøndelag' },
      { name: 'Meråker', county: 'Trøndelag' },
      { name: 'Midtre Gauldal', county: 'Trøndelag' },
      { name: 'Nærøysund', county: 'Trøndelag' },
      { name: 'Oppdal', county: 'Trøndelag' },
      { name: 'Orkland', county: 'Trøndelag' },
      { name: 'Orkdal', county: 'Trøndelag' },
      { name: 'Osen', county: 'Trøndelag' },
      { name: 'Overhalla', county: 'Trøndelag' },
      { name: 'Rennebu', county: 'Trøndelag' },
      { name: 'Rindal', county: 'Trøndelag' },
      { name: 'Røros', county: 'Trøndelag' },
      { name: 'Selbu', county: 'Trøndelag' },
      { name: 'Skaun', county: 'Trøndelag' },
      { name: 'Snåsa', county: 'Trøndelag' },
      { name: 'Steinkjer', county: 'Trøndelag' },
      { name: 'Stjørdal', county: 'Trøndelag' },
      { name: 'Trondheim', county: 'Trøndelag' },
      { name: 'Tydal', county: 'Trøndelag' },
      { name: 'Verdal', county: 'Trøndelag' },
      { name: 'Verran', county: 'Trøndelag' },
      { name: 'Vikna', county: 'Trøndelag' },
    ],
  },
];

const Template = <T extends object>(args: SelectProps<T>) => {
  const select = (
    <Select {...args}>
      {counties.map(({ name }) => (
        <SelectItem key={name}>{name}</SelectItem>
      ))}
    </Select>
  );
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      {select}
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    select
  );
};

const ControlledTemplate = <T extends object>(args: SelectProps<T>) => {
  const [value, setValue] = useState<string | number>('oslo');

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} selectedKey={value} onSelectionChange={setValue} />
      <pre className="font-sans">{value}</pre>
    </div>
  );
};

const GroupedTemplate = <T extends object>(args: SelectProps<T>) => (
  <Select {...args}>
    {counties.map(({ name: county, municipalities }) => (
      <SelectSection key={county}>
        <SelectHeader>{county}</SelectHeader>
        {municipalities.map(({ name: municipality }) => (
          <SelectItem key={municipality}>{municipality}</SelectItem>
        ))}
      </SelectSection>
    ))}
  </Select>
);

const defaultProps = {
  label: 'Velg område',
  isRequired: false,
  isInvalid: false,
  name: undefined,
  defaultSelectedKey: undefined,
  selectedKey: undefined,
  placeholder: 'Velg område',
};

export const Default: Story = {
  render: Template,
  args: { ...defaultProps },
};

export const Required: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const WithDescription: Story = {
  render: Template,
  args: {
    ...defaultProps,
    description: 'OBOS bygger nye boliger over store deler av landet.',
  },
};

export const WithoutLabel: Story = {
  render: Template,
  args: {
    ...defaultProps,
    label: undefined,
    placeholder: 'Velg område',
    'aria-label': 'Velg område',
  },
};

export const IsInvalid: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  render: Template,
  args: {
    ...defaultProps,
    errorMessage: 'Feltet er påkrevd',
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const Grouped = {
  render: GroupedTemplate,
  args: {
    ...defaultProps,
  },
};
