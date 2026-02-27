import type { Meta, StoryObj } from '@storybook/react-vite';
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
    src: 'https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/3c7245912b338f058f6f555a4b6c964911658d46-820x447.jpg?auto=format',
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
