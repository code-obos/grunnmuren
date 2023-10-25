import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonSandbox = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-8 p-8">
        <Button>Test</Button>
        <Button variant="secondary">Test</Button>
        <Button variant="tertiary">Test</Button>
      </div>

      <div className="bg-green-dark">
        <div className="flex gap-8 p-8">
          <Button color="mint">Test</Button>
          <Button color="mint" variant="secondary">
            Test
          </Button>
          <Button color="mint" variant="tertiary">
            Test
          </Button>
        </div>
      </div>

      <div className="bg-blue p-8">
        <div className="flex gap-8">
          <Button color="white">Test</Button>
          <Button color="white" variant="secondary">
            Test
          </Button>
          <Button color="white" variant="tertiary">
            Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    variant: 'tertiary',
  },
};
