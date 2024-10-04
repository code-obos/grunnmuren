import type { Meta, StoryObj } from '@storybook/react';

import { Illustration } from './Illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Illustration',
  component: Illustration,
  render: (props) => {
    return <Illustration {...props} />;
  },
};

export default meta;

type Story = StoryObj<typeof Illustration>;

export const Sandbox = () => {
  return <Illustration name="Flytteesker-ensfarget" />;
};
