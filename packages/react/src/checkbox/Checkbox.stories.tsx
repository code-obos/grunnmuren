import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

const Template = (args: CheckboxProps) => {
  return <Checkbox {...args} />;
};

const ControlledTemplate = (args: CheckboxProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <Checkbox
        {...args}
        isSelected={isSelected}
        onChange={(value) => {
          setIsSelected(value);
          args.onChange?.(value);
        }}
      />
      <p>Valgt: {isSelected.toString()}</p>
    </>
  );
};

const defaultProps: CheckboxProps = {
  children: 'Jeg godtar medlemsvilkårene.',
  isRequired: false,
  isInvalid: false,
  defaultSelected: undefined,
  value: undefined,
  isSelected: undefined,
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DefaultSelected: Story = {
  render: Template,
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const WithDescription: Story = {
  render: Template,
  args: {
    ...defaultProps,
    description: 'Hello from the other side',
  },
};

export const IsRequired: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const IsInvalid: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isInvalid: true,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};
