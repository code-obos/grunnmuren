import { Mail } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import { TextField, type TextFieldProps } from './textfield';

const meta = {
  title: 'TextField',
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: TextFieldProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <TextField {...args} />
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <TextField {...args} />
  );
};

const ControlledTemplate = (args: TextFieldProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} value={value} onChange={setValue} />
      <p>{value}</p>
    </div>
  );
};

const LeftAddonTemplate = (args: TextFieldProps) => {
  return (
    <TextField {...args} leftAddon={<Mail className="pointer-events-none" />} />
  );
};

const RightAddonTemplate = (args: TextFieldProps) => {
  return (
    <TextField
      {...args}
      rightAddon={<Mail className="pointer-events-none" />}
    />
  );
};

const InputTypesTemplate = (args: TextFieldProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <TextField {...args} label="Text" type="text" />
      <TextField {...args} label="Email" type="email" />
      <TextField {...args} label="Search" type="search" />
      <TextField {...args} label="Password" type="password" />
      <TextField {...args} label="Tel" type="tel" />
      <TextField {...args} label="Date" type="date" />
    </div>
  );
};

const defaultProps = {
  label: 'Epost',
  withAddonDivider: false,
  isRequired: false,
  isInvalid: undefined,
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
    description: 'Må fylles ut dersom du ønsker å motta nyhetsbrevet',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    ...defaultProps,
    placeholder: 'Fyll ut eposten din',
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
    placeholder: 'Fyll ut eposten din',
    'aria-label': 'Epost',
  },
};

export const IsInvalid: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isInvalid: true,
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

export const InputTypes = {
  render: InputTypesTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomWidth: Story = {
  render: Template,
  args: {
    ...defaultProps,
    label: 'Bruksenhetsnummer',
    description:
      'Bruksenhetsnummeret, som tidligere ble kalt bolignummer, består av en bokstav og fire tall. F.eks. H0101',
    size: 5,
    maxLength: 5,
    minLength: 5,
  },
};
