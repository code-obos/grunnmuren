import type { Meta, StoryObj } from '@storybook/react-vite';

import { VideoLoop } from './video-loop';

const meta = {
  title: 'VideoLoop',
  component: VideoLoop,
  parameters: {
    layout: 'centered',
  },
  args: {
    src: 'https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4',
    format: 'mp4',
    alt: 'En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer.',
  },
} satisfies Meta<typeof VideoLoop>;

export default meta;

type Story = StoryObj<typeof meta>;

/** In a larger container the play/pause button sits in the bottom-left corner. */
export const Default: Story = {
  args: {
    className: 'aspect-video w-[640px] max-w-[90vw] rounded-2xl',
  },
};

/** In a small container the button stays centered. */
export const SmallContainer: Story = {
  args: {
    className: 'aspect-video w-72 rounded-2xl',
  },
};
