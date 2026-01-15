import { PaintRoller } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cx } from 'cva';
import { Fragment } from 'react';

import { Badge } from './badge';

const meta = {
  title: 'Badge',
  component: Badge,
  render: (props) => {
    return (
      <div className="space-x-4">
        <Badge {...props} size="small">
          Small
        </Badge>
        <Badge {...props} size="medium">
          Medium
        </Badge>
        <Badge {...props} size="large">
          Large
        </Badge>
      </div>
    );
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sandbox = () => {
  const colors = [
    'mint',
    'sky',
    'blue-dark',
    'green-dark',
    'gray-dark',
    'white',
  ] as const;

  return colors.map((color) => (
    <Fragment key={color}>
      <h2 className="font-medium">{color}</h2>
      <div className={cx('space-x-4 p-2', color === 'white' && 'bg-gray')}>
        <Badge color={color} size="small">
          small
        </Badge>
        <Badge color={color} size="medium">
          medium
        </Badge>
        <Badge color={color} size="large">
          large
        </Badge>
      </div>
    </Fragment>
  ));
};

export const WithIcon = () => {
  const colors = [
    'mint',
    'sky',
    'blue-dark',
    'green-dark',
    'gray-dark',
    'white',
  ] as const;

  return colors.map((color) => (
    <Fragment key={color}>
      <h2 className="font-medium">{color}</h2>
      <div className={cx('space-x-4 p-2', color === 'white' && 'bg-gray')}>
        <Badge color={color} size="small">
          <PaintRoller />
          small
        </Badge>
        <Badge color={color} size="medium">
          <PaintRoller />
          medium
        </Badge>
        <Badge color={color} size="large">
          <PaintRoller />
          large
        </Badge>
      </div>
    </Fragment>
  ));
};

export const Sizes: Story = {
  args: {
    color: 'mint',
  },
  render: (props) => {
    return (
      <div className="space-x-4">
        <Badge {...props} size="small">
          Small
        </Badge>
        <Badge {...props} size="medium">
          Medium
        </Badge>
        <Badge {...props} size="large">
          Large
        </Badge>
      </div>
    );
  },
};
