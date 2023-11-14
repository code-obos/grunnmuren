import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Checkbox/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const items = (
  <>
    <Checkbox value="bolig">Bolig</Checkbox>
    <Checkbox value="bank">Bank</Checkbox>
    <Checkbox value="fordeler">Medlemsfordeler</Checkbox>
  </>
);

const Template = (args: CheckboxGroupProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <CheckboxGroup {...args}>{items}</CheckboxGroup>
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <CheckboxGroup {...args}>{items}</CheckboxGroup>
  );
};

const ControlledTemplate = (args: CheckboxGroupProps) => {
  const [selectedItems, setSelectedItems] = useState(['bank']);

  return (
    <div className="flex flex-col gap-2">
      <CheckboxGroup
        {...args}
        value={selectedItems}
        onChange={(value) => {
          setSelectedItems(value);
          args.onChange?.(value);
        }}
      >
        {items}
      </CheckboxGroup>
      <p>Valgt: {selectedItems.join(', ')}</p>
    </div>
  );
};

const defaultProps = {
  label: 'Jeg er interessert i',
  isRequired: false,
  isInvalid: false,
  defaultValue: undefined,
  name: undefined,
  value: undefined,
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DefaultValue: Story = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: ['bolig', 'bank'],
  },
};

export const isRequired: Story = {
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
    description: 'Du kan velge flere om du vil',
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
    errorMessage: 'Velg et alternativ for å fortsette',
  },
};

export const HTMLForms: Story = {
  render: Template,
  args: {
    ...defaultProps,
    name: 'interested-in',
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};
