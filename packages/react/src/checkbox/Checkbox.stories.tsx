import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example: Story = {
  args: {
    children: 'Jeg godtar medlemsvilkårene',
    isRequired: true,
  },
};
