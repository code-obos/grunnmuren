import type { Meta, StoryObj } from '@storybook/react';
import { TextField as RACTextField } from 'react-aria-components';
import { Mail } from '@obosbbl/grunnmuren-icons-react';

import { TextField } from './TextField';
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

export const Required: Story = {
  render: Template,
  args: {
    label: 'Epost',
    isRequired: true,
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
