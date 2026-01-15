import { Edit, Search } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cx } from 'cva';

import { Button } from './button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: (props) => {
    let bgColor = '';

    if (props.color === 'mint') {
      bgColor = 'bg-blue-dark';
    } else if (props.color === 'white') {
      bgColor = 'bg-blue';
    }

    return (
      <div className={cx(bgColor, 'flex gap-4 p-6')}>
        <Button {...props}>Button</Button>
        <Button href="#" {...props}>
          Link
        </Button>
      </div>
    );
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    isPending: false,
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

export const WithIconAndText = () => {
  return (
    <>
      <div className="flex gap-8 p-8">
        <Button>
          <Edit /> Rediger
        </Button>
        <Button>
          <Edit /> Rediger mer
        </Button>
        <Button>
          <Edit /> Rediger med enda mer tekst
        </Button>
      </div>
      <div className="flex gap-8 p-8">
        <Button>
          Rediger <Edit />
        </Button>
        <Button>
          Rediger mer <Edit />
        </Button>
        <Button>
          Rediger med enda mer tekst <Edit />
        </Button>
      </div>
    </>
  );
};

export const IconOnly = () => {
  return (
    <div className="p-8">
      <Button isIconOnly aria-label="Søk">
        <Search />
      </Button>
    </div>
  );
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
