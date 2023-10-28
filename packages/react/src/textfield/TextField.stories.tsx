import type { Meta, StoryObj } from '@storybook/react';
import { TextField as RACTextField } from 'react-aria-components';

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

export const Example: Story = {
  args: {
    description: 'For eksempel Drammensveien 1',
    label: 'Addresse',
    isRequired: true,
    isInvalid: false,
  },
};

export const WithPlaceholder: Story = {
  args: { ...Example.args, placeholder: 'Drammensveien 1' },
};

export const AsInvalid: Story = {
  args: {
    ...Example.args,
    isRequired: true,
    errorMessage: 'Feltet er påkrevd',
  },
};

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
