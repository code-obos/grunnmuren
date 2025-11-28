import type { Meta, StoryObj } from '@storybook/react-vite';
import { cx } from 'cva';
import { useState } from 'react';
import { Button } from '../button';
import {
  UNSAFE_ProgressBar as ProgressBar,
  type UNSAFE_ProgressBarProps as ProgressBarProps,
  UNSAFE_ProgressBarValueText as ProgressBarValueText,
} from './';

const meta: Meta<typeof ProgressBar> = {
  title: 'ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'w-96',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: 75,
    valueLabel: '3 of 4 steps completed',
  },
};

export const WithValueText = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={50} {...args}>
      <ProgressBarValueText />
    </ProgressBar>
  );
};

export const WithValueTextRight = ({
  className,
  ...args
}: ProgressBarProps) => {
  return (
    <ProgressBar value={50} {...args} className={cx(className, 'text-right')}>
      <ProgressBarValueText />
    </ProgressBar>
  );
};

export const Interactive = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar value={value} valueLabel={`${value}% completed`} />
      <div className="flex gap-2">
        <Button onPress={() => setValue(Math.max(0, value - 10))}>- 10%</Button>
        <Button onPress={() => setValue(Math.min(100, value + 10))}>
          + 10%
        </Button>
        <Button onPress={() => setValue(0)} variant="secondary">
          Nullstill
        </Button>
      </div>
    </div>
  );
};
