import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import { Checkbox, type CheckboxProps } from './checkbox';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: CheckboxProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <Checkbox {...args} />
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <Checkbox {...args} />
  );
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
  isInvalid: undefined,
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

export const WithErrorMessage: Story = {
  render: Template,
  args: {
    ...defaultProps,
    errorMessage: 'Huk av for å fortsette',
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};
