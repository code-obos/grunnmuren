import { ArrowRight, Edit, Search } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cx } from 'cva';

import { Button } from './button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isPending: false,
    isIconOnly: false,
    animateIcon: undefined,
    variant: 'primary',
    color: 'blue',
  },
  argTypes: {
    animateIcon: {
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story, context) => {
      let bgColor = '';
      if (context.args.color === 'mint') {
        bgColor = 'bg-blue-dark';
      } else if (context.args.color === 'white') {
        bgColor = 'bg-blue';
      }

      return <div className={cx(bgColor, 'flex gap-4 p-6')}>{Story()}</div>;
    },
  ],
  render: (props) => {
    return (
      <>
        <Button {...props}>Button</Button>
        <Button href="#" {...props}>
          Link
        </Button>
      </>
    );
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isPending: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const IsPending: Story = {
  args: {
    isPending: true,
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <>
      <Button {...args}>
        <Edit /> Rediger
      </Button>
      <Button {...args}>
        Rediger <Edit />
      </Button>
    </>
  ),
};

export const WithAnimatedIcons: Story = {
  args: {
    animateIcon: 'right',
  },
  render: (args) => (
    <>
      <Button {...args}>
        Bli kjent med OBOS <ArrowRight />
      </Button>
      <Button href="#" {...args}>
        Bli kjent med OBOS <ArrowRight />
      </Button>
    </>
  ),
};

export const IsIconOnly: Story = {
  args: {
    isIconOnly: true,
  },
  render: (args) => {
    return (
      <Button aria-label="Søk" {...args}>
        <Search />
      </Button>
    );
  },
};

export const ButtonSandbox = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-8 p-8">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <div className="bg-sky-lightest p-8">
        <div className="flex gap-8">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </div>

      <div className="bg-blue-dark">
        <div className="flex gap-8 p-8">
          <Button color="white">Primary</Button>
          <Button color="white" variant="secondary">
            Secondary
          </Button>
          <Button color="white" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>

      <div className="bg-green-dark p-8">
        <div className="flex gap-8">
          <Button color="mint">Primary</Button>
          <Button color="mint" variant="secondary">
            Secondary
          </Button>
          <Button color="mint" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
    </div>
  );
};
