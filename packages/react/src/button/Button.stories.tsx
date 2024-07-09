import { Edit, Search } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { cx } from 'cva';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: (props) => {
    let bgColor = '';

    if (props.color === 'mint') {
      bgColor = 'bg-green-dark';
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
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: 'green',
    variant: 'primary',
    isLoading: false,
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

      <div className="bg-green-dark">
        <div className="flex gap-8 p-8">
          <Button color="mint">Primary</Button>
          <Button color="mint" variant="secondary">
            Secondary
          </Button>
          <Button color="mint" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>

      <div className="bg-blue p-8">
        <div className="flex gap-8">
          <Button color="white">Primary</Button>
          <Button color="white" variant="secondary">
            Secondary
          </Button>
          <Button color="white" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
    </div>
  );
};
