import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PiggyBank } from '@obosbbl/grunnmuren-icons-react';

import { Button } from '../button/Button';
import { NumberField, NumberFieldProps } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'NumberField',
  component: NumberField,
};

export default meta;

type Story = StoryObj<typeof NumberField>;

const Template = (args: NumberFieldProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <NumberField {...args} />
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <NumberField {...args} />
  );
};

const ControlledTemplate = (args: NumberFieldProps) => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} value={value} onChange={setValue} />
      <p>{value}</p>
    </div>
  );
};

const LeftAddonTemplate = (args: NumberFieldProps) => {
  return (
    <NumberField
      {...args}
      leftAddon={<PiggyBank className="pointer-events-none" />}
    />
  );
};

const RightAddonTemplate = (args: NumberFieldProps) => {
  return (
    <NumberField
      {...args}
      rightAddon={<PiggyBank className="pointer-events-none" />}
    />
  );
};

const defaultProps = {
  label: 'Beløp',
  withAddonDivider: false,
  isRequired: false,
  isInvalid: false,
  name: undefined,
  defaultValue: undefined,
  value: undefined,
  textAlign: undefined,
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
    description: 'Må fylles ut',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    ...defaultProps,
    placeholder: 'Skriv inn ønsket lånebeløp',
  },
};

export const LeftAddon: Story = {
  render: LeftAddonTemplate,
  args: {
    ...defaultProps,
  },
};

export const RightAddon: Story = {
  render: RightAddonTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithAddonDivider: Story = {
  render: LeftAddonTemplate,
  args: {
    ...defaultProps,
    withAddonDivider: true,
  },
};

export const WithoutLabel: Story = {
  render: Template,
  args: {
    ...defaultProps,
    label: undefined,
    placeholder: 'Fyll ut ønsket beløp',
    'aria-label': 'Beløp',
  },
};

export const IsInvalid: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: 'Her er det noe feil!',
  },
};

export const TextAlignRight: Story = {
  render: Template,
  args: {
    ...defaultProps,
    textAlign: 'right',
    withAddonDivider: true,
    rightAddon: 'kr',
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
