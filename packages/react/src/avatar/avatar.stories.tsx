import type { Meta, StoryObj } from '@storybook/react-vite';

import { portrait } from '../__stories__/media';
import { Avatar } from './avatar';

const meta = {
  title: 'Avatar',
  component: Avatar,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: (props) => {
    return (
      <div className="p-4">
        <Avatar {...props} />
      </div>
    );
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DisclosureStory: Story = {
  args: {
    src: portrait,
  },
};

export const WithoutSrc: Story = {
  render: () => {
    return (
      <div className="p-4">
        <Avatar />
      </div>
    );
  },
};

export const WithoutInvalidSrc: Story = {
  render: () => {
    return (
      <div className="p-4">
        <Avatar src="invalid" />
      </div>
    );
  },
};
