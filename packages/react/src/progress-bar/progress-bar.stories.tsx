import type { Meta } from '@storybook/react-vite';
import { cx } from 'cva';
import { useState } from 'react';
import { Button } from '../button';
import { Label } from '../label';
import {
  UNSAFE_ProgressBar as ProgressBar,
  type UNSAFE_ProgressBarProps as ProgressBarProps,
  UNSAFE_ProgressBarValueText as ProgressBarValueText,
} from './';

const meta = {
  title: 'ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'w-96',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Default = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={50} {...args}>
      <Label>Laster...</Label>
    </ProgressBar>
  );
};

export const Empty = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={0} {...args}>
      <Label>Laster...</Label>
    </ProgressBar>
  );
};

export const Complete = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={100} {...args}>
      <Label>Laster...</Label>
    </ProgressBar>
  );
};

export const Indeterminate = (args: ProgressBarProps) => {
  return (
    <ProgressBar isIndeterminate={true} {...args}>
      <Label>Laster...</Label>
    </ProgressBar>
  );
};

export const WithCustomLabel = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={75} valueLabel="3 of 4 steps completed" {...args}>
      <Label>Laster...</Label>
    </ProgressBar>
  );
};

export const WithValueText = (args: ProgressBarProps) => {
  return (
    <ProgressBar value={50} {...args}>
      <Label>Laster:</Label>
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
      <Label>Laster:</Label>
      <ProgressBarValueText />
    </ProgressBar>
  );
};

export const Interactive = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar value={value} valueLabel={`${value}% completed`}>
        <Label>Velg progresjon:</Label>
      </ProgressBar>
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
