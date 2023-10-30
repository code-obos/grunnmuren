import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'CheckboxGroup',
  component: CheckboxGroup,
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="bolig">Bolig</Checkbox>
      <Checkbox value="bank">Bank</Checkbox>
      <Checkbox value="fordeler">Medlemsfordeler</Checkbox>
    </CheckboxGroup>
  ),
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Example: Story = {
  args: {
    description: 'Velg minst en',
    label: 'Jeg er interessert i',
    isRequired: true,
    isInvalid: false,
  },
};

export const AsInvalid: Story = {
  args: {
    ...Example.args,
    errorMessage: 'Velg et alternativ for å fortsette',
  },
};
