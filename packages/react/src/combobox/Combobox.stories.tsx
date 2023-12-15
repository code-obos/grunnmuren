import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Combobox, ComboboxItem, ComboboxProps } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Combobox',
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const Template = <T extends object>(args: ComboboxProps<T>) => {
  const select = (
    <Combobox {...args}>
      <ComboboxItem id="agder">Agder</ComboboxItem>
      <ComboboxItem id="innlandet">Innlandet</ComboboxItem>
      <ComboboxItem id="more-og-romsdal">Møre og Romsdal</ComboboxItem>
      <ComboboxItem id="oslo">Oslo</ComboboxItem>
      <ComboboxItem id="rogaland">Rogaland</ComboboxItem>
      <ComboboxItem id="trondelag">Trøndelag</ComboboxItem>
      <ComboboxItem id="vestfold-og-telemark">
        Vestfold og Telemark
      </ComboboxItem>
      <ComboboxItem id="viken">Viken</ComboboxItem>
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
  const [value, setValue] = useState<string | number>('oslo');

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
