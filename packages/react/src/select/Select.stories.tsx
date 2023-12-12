import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Select, SelectItem, SelectProps } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const Template = (args: SelectProps) => {
  const select = (
    <Select {...args}>
      <SelectItem id="agder">Agder</SelectItem>
      <SelectItem id="innlandet">Innlandet</SelectItem>
      <SelectItem id="more-og-romsdal">Møre og Romsdal</SelectItem>
      <SelectItem id="oslo">Oslo</SelectItem>
      <SelectItem id="rogaland">Rogaland</SelectItem>
      <SelectItem id="trondelag">Trøndelag</SelectItem>
      <SelectItem id="vestfold-og-telemark">Vestfold og Telemark</SelectItem>
      <SelectItem id="viken">Viken</SelectItem>
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

const ControlledTemplate = (args: SelectProps) => {
  const [value, setValue] = useState('oslo');

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} selectedKey={value} onSelectionChange={setValue} />
      <pre className="font-sans">{value}</pre>
    </div>
  );
};

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
