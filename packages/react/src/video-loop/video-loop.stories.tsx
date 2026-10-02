import type { Meta, StoryObj } from '@storybook/react-vite';

import { videoLoop } from '../__stories__/media';
import { VideoLoop } from './video-loop';

const meta = {
  title: 'VideoLoop',
  component: VideoLoop,
  parameters: {
    layout: 'centered',
  },
  args: {
    src: videoLoop,
    format: 'mp4',
    alt: 'Svømmere i røde drakter tøyer ut på bassengkanten i en svømmehall.',
  },
} satisfies Meta<typeof VideoLoop>;

export default meta;

type Story = StoryObj<typeof meta>;

/** In a larger container the play/pause button sits in the bottom-left corner. */
export const Default: Story = {
  args: {
    className: 'w-[640px] max-w-[90vw] rounded-2xl',
  },
};

/** In a small container the button stays centered. */
export const SmallContainer: Story = {
  args: {
    className: 'w-72 rounded-2xl',
  },
};
