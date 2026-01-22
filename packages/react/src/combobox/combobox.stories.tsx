import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { Button } from '../button/button';
import { counties } from '../mocks';
import {
  Combobox,
  ComboboxHeader,
  ComboboxItem,
  type ComboboxProps,
  ComboboxSection,
} from './combobox';

const meta = {
  title: 'Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = <T extends object>(args: ComboboxProps<T>) => {
  const select = (
    <Combobox {...args}>
      {counties.map((county) =>
        county.municipalities.map((municipality) => (
          <ComboboxItem
            key={municipality.name}
            textValue={municipality.name}
            id={municipality.name}
            className="flex gap-2"
          >
            {municipality.name}
            <small className="text-gray">{county.name}</small>
          </ComboboxItem>
        )),
      )}
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
  const [value, setValue] = useState<string | number | null>(counties[0].name);

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
  const [isPending, setIsPending] = useState(false);

  // TODO: Add debouncing
  useEffect(() => {
    async function fetchData() {
      if (filterText.length >= 2) {
        setIsPending(true);
        const result = await fetch(
          `https://swapi.dev/api/people?search=${filterText}`,
        );
        const data = await result.json();
        setItems(data.results);
        setIsPending(false);
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
      isPending={isPending}
      {...args}
    >
      {items.map((item) => (
        <ComboboxItem key={item.url}>{item.name}</ComboboxItem>
      ))}
    </Combobox>
  );
};

const GroupedTemplate = <T extends object>(args: ComboboxProps<T>) => (
  <Combobox {...args}>
    {counties.map((county) => (
      <ComboboxSection key={county.name}>
        <ComboboxHeader>{county.name}</ComboboxHeader>
        {county.municipalities.map((municipality) => (
          <ComboboxItem key={municipality.name}>
            {municipality.name}
          </ComboboxItem>
        ))}
      </ComboboxSection>
    ))}
  </Combobox>
);

const defaultProps = {
  label: 'Velg boligprosjekt',
  isRequired: false,
  isInvalid: undefined,
  name: undefined,
  defaultSelectedKey: undefined,
  selectedKey: undefined,
  placeholder: 'Velg boligprosjekt',
  isPending: false,
  children: undefined,
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

export const GroupedItems: Story = {
  render: GroupedTemplate,
  args: { ...defaultProps },
};
