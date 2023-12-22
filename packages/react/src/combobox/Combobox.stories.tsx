import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Combobox, ComboboxItem, ComboboxProps } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Combobox',
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const items = [
  { name: 'Ager', area: 'Norde Aker' },
  { name: 'Bogerud Torg', area: 'Østensjø' },
  { name: 'Bølgelengden', area: 'Nordstrand' },
  { name: 'Ensjøveien 8', area: 'Gamle Oslo' },
  { name: 'Fjorten', area: 'Nordre Aker' },
  { name: 'Furuset Village', area: 'Alna' },
  { name: 'Hoffsveien Hage', area: 'Ullern' },
  { name: 'Lumanders hage', area: 'Gamle Oslo' },
  { name: 'Løren botaniske', area: 'Grünerløkka' },
  { name: 'Mortensrud Felt 16', area: 'Søndre Nordstrand' },
  { name: 'Oen', area: 'Grorud' },
  { name: 'Rosenholmveien', area: 'Søndre Nordstrand' },
  { name: 'Røakollen', area: 'Vestre Aker' },
  { name: 'Sandakerveien 121', area: 'Nordre Aker' },
  { name: 'Stenbråtveien', area: 'Søndre Nordstrand' },
  { name: 'Stilla', area: 'Nordre Aker' },
  { name: 'Teglverksløkka', area: 'Bjerke' },
  { name: 'Ulvenkroken', area: 'Bjerke' },
  { name: 'Ulvenplassen', area: 'Bjerke' },
  { name: 'Vitigrend', area: 'Vestre Aker' },
  { name: 'Vollebekk', area: 'Bjerke' },
  { name: 'Våronnveien 17', area: 'Østensjø' },
];

const Template = <T extends object>(args: ComboboxProps<T>) => {
  const select = (
    <Combobox {...args}>
      {items.map((item) => (
        <ComboboxItem
          key={item.name}
          textValue={item.name}
          id={item.name}
          className="flex gap-2"
        >
          {item.name}
          <small className="text-gray">{item.area}</small>
        </ComboboxItem>
      ))}
    </Combobox>
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

const ControlledTemplate = <T extends object>(args: ComboboxProps<T>) => {
  const [value, setValue] = useState<string | number>(items[0].name);

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} selectedKey={value} onSelectionChange={setValue} />
      <pre className="font-sans">{value}</pre>
    </div>
  );
};

const AsyncTemplate = <T extends object>(args: ComboboxProps<T>) => {
  const [items, setItems] = useState<Array<{ url: string; name: string }>>([]);
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Add debouncing
  useEffect(() => {
    async function fetchData() {
      if (filterText.length >= 2) {
        setIsLoading(true);
        const result = await fetch(
          `https://swapi.dev/api/people?search=${filterText}`,
        );
        const data = await result.json();
        setItems(data.results);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [filterText]);

  return (
    <Combobox
      // items={items}
      // provide our own filtering as the result is already filtered. Should behave same as
      // providing items={items}, but TS is complaining for some reason. Doing this for now.
      defaultFilter={() => true}
      onInputChange={setFilterText}
      inputValue={filterText}
      isLoading={isLoading}
      {...args}
    >
      {items.map((item) => (
        <ComboboxItem key={item.url}>{item.name}</ComboboxItem>
      ))}
    </Combobox>
  );
};

const defaultProps = {
  label: 'Velg boligprosjekt',
  isRequired: false,
  isInvalid: false,
  name: undefined,
  defaultSelectedKey: undefined,
  selectedKey: undefined,
  placeholder: 'Velg boligprosjekt',
  isLoading: false,
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
    placeholder: 'Velg boligprosjekt',
    'aria-label': 'Velg boligprosjekt',
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

export const Async = {
  render: AsyncTemplate,

  args: {
    ...defaultProps,
    label: 'SW characters lookup',
    placeholder: 'Search for names',
  },
};
