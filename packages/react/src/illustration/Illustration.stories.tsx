import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

import { Illustration } from './Illustration';
import { IllustrationTest } from './IllustrationRsc';

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

export const Test = () => {
  return (
    <Suspense>
      <IllustrationRsc name="Flytteesker-ensfarget" />
    </Suspense>
  );
};
