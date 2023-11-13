import type { Meta, StoryObj } from '@storybook/react';
import { TextField as RACTextField } from 'react-aria-components';
import { Mail } from '@obosbbl/grunnmuren-icons-react';

import { TextField, TextFieldProps } from './TextField';
import { Input } from './Input';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

const Template = (args) => {
  return <TextField {...args} />;
};

const LeftAddonTemplate = (args) => {
  return (
    <TextField
      {...args}
      leftAddon={<Mail className="pointer-events-none flex-none" />}
    />
  );
};

const RightAddonTemplate = (args) => {
  return (
    <TextField
      {...args}
      rightAddon={<Mail className="pointer-events-none flex-none" />}
    />
  );
};

const defaultProps = {
  label: 'Epost',
  withAddonDivider: false,
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
    description: 'Vi kommer ikke til å uønsket epost',
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
    withAddonDivider: false,
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

// export const WithPlaceholder: Story = {
//   args: { ...Example.args, placeholder: 'Drammensveien 1' },
// };

// export const AsInvalid: Story = {
//   args: {
//     ...Example.args,
//     errorMessage: 'Feltet er påkrevd',
//   },
// };

// export const LeftAddon: Story = {
//   render: LeftAddonTemplate,
//   args: {
//     ...Example.args,
//     withAddonDivider: false,
//   },
// };

// export const WithAddonDivider: Story = {
//   render: LeftAddonTemplate,
//   args: {
//     ...Example.args,
//     withAddonDivider: true,
//   },
// };

export const Custom = ({ isInvalid }: { isInvalid?: boolean }) => {
  return (
    <div>
      <p className="mb-4 italic">
        Custom implementation of TextField with a totally different layout,
        while reusing the primitives
      </p>
      <RACTextField className="flex flex-col gap-2" isInvalid={isInvalid}>
        <div className="flex items-baseline gap-4">
          <Label className={isInvalid ? 'text-red' : undefined}>
            Fullt navn
          </Label>

          <Input />
        </div>
        <Description>For eksempel Kari Nordmann</Description>
        <ErrorMessage>Fyll ut dette feltet for å fortsette</ErrorMessage>
      </RACTextField>
    </div>
  );
};
