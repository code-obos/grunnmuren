import { ArrowRight, Edit, Search } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cx } from 'cva';

import { Badge } from '../badge';
import { Button } from './button';

// Note: we cannot use the `satisfie` CSF here, because the resulting union type is too wide for TS to typecheck
// This is because of the complexity of the union type of the button (both a link and a button)
const meta: Meta<typeof Button> = {
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
    color: 'primary',
  },
  argTypes: {
    animateIcon: {
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story, context) => {
      const onDark = ['contrast', 'mint', 'white'].includes(context.args.color ?? '');
      const bgColor = onDark ? 'bg-primary-base-default' : '';

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
};

export default meta;

type Story = StoryObj<typeof Button>;

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

      <div className="flex gap-8 p-8">
        <Button color="accent">Primary</Button>
        <Button color="accent" variant="secondary">
          Secondary
        </Button>
        <Button color="accent" variant="tertiary">
          Tertiary
        </Button>
      </div>

      <div className="flex gap-8 p-8">
        <Button color="neutral">Primary</Button>
        <Button color="neutral" variant="secondary">
          Secondary
        </Button>
        <Button color="neutral" variant="tertiary">
          Tertiary
        </Button>
      </div>

      <div className="bg-primary-base-default flex gap-8 p-8">
        <Button color="contrast">Primary</Button>
        <Button color="contrast" variant="secondary">
          Secondary
        </Button>
        <Button color="contrast" variant="tertiary">
          Tertiary
        </Button>
      </div>

      <div className="bg-accent-base-default flex gap-8 p-8">
        <Button color="contrast">Primary</Button>
        <Button color="contrast" variant="secondary">
          Secondary
        </Button>
        <Button color="contrast" variant="tertiary">
          Tertiary
        </Button>
      </div>
    </div>
  );
};

const LEGACY_COLORS = [
  { color: 'blue', replacement: 'primary', background: '' },
  { color: 'mint', replacement: 'contrast', background: 'bg-green-dark' },
  { color: 'white', replacement: 'contrast', background: 'bg-blue-dark' },
] as const;

/**
 * `blue`, `mint` og `white` funker fortsatt, men er deprecated og forsvinner i neste major.
 * Bruk `primary` i stedet for `blue`, og `contrast` i stedet for `mint` og `white`.
 */
export const LegacyColors = () => (
  <div className="flex flex-col">
    {LEGACY_COLORS.map(({ color, replacement, background }) => (
      <div key={color} className={cx(background, 'grid gap-4 p-8')}>
        <div className="flex items-center gap-3">
          <Badge color="white" size="small" className="border-neutral-border-default border">
            Deprecated
          </Badge>
          <code className={cx('text-sm', background && 'text-white')}>
            <span className="line-through">color="{color}"</span> → color="{replacement}"
          </code>
        </div>
        <div className="flex gap-8">
          <Button color={color}>Primary</Button>
          <Button color={color} variant="secondary">
            Secondary
          </Button>
          <Button color={color} variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
    ))}
  </div>
);
