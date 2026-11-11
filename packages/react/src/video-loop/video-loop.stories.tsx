import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, spyOn, waitFor, within } from 'storybook/test';

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

/** When the browser blocks autoplay (e.g. iOS Low Power Mode), the play button is shown so the user can start the video. */
export const AutoplayBlocked: Story = {
  args: {
    className: 'w-[640px] max-w-[90vw] rounded-2xl',
  },
  beforeEach: () => {
    const play = spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(
      new DOMException('Autoplay blocked', 'NotAllowedError'),
    );

    return () => play.mockRestore();
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Spill av animasjon' });
    await waitFor(() => expect(button).not.toHaveClass('opacity-0'));
  },
};
