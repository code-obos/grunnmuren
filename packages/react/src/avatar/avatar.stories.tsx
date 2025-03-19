import { Menu } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { UNSAFE_Avatar as Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
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
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const DisclosureStory: Story = {
  args: {
    src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1578474487/Boligkonferansen/obosbk%202017/Daniel_Kj%C3%B8rberg_Siraj_1x1.jpg',
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
