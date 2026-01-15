import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import { counties } from '../mocks';
import {
  Select,
  SelectHeader,
  SelectItem,
  type SelectProps,
  SelectSection,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const Template = <T extends object>(args: SelectProps<T>) => {
  const select = (
    <Select {...args}>
      {counties.map((county) =>
        county.municipalities.map((municipality) => (
          <SelectItem key={municipality.name}>{municipality.name}</SelectItem>
        )),
      )}
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
      <Template
        {...args}
        selectedKey={value}
        // @ts-expect-error not quite sure what to do here
        onSelectionChange={setValue}
      />
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
  isInvalid: undefined,
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
