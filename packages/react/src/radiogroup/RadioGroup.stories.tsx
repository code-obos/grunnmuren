import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup } from './RadioGroup';
import { Radio } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'RadioGroup',
  component: RadioGroup,
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="ordinary">Ordinær pris</Radio>
      <Radio value="bostart">OBOS Bostart</Radio>
      <Radio value="deleie">OBOS Deleie</Radio>
    </RadioGroup>
  ),
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Example: Story = {
  args: {
    description:
      'Kontakt oss for mer utfyllende informasjon om de forskjellige alternativene',
    label: 'Velg hvordan du vil kjøpe boligen',
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
