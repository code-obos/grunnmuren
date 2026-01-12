import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
} from '../carousel';
import { Media } from '../content';

const meta = {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    variant: 'fullscreen',
  },
  args: { onSlideChange: fn() },
  render: (args) => (
    <main className="container grid gap-y-8">
      <Carousel {...args}>
        <CarouselItems>
          <CarouselItem>
            <Media>
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/7d2285ccee9b9545e018115b8e0ecc8b06aa0729-1620x1080.jpg?auto=format"
                alt=""
                loading="lazy"
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media fit="contain">
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/32a53eec782e6cbe15d75961f82ecca48dbe30ed-1920x1080.png?auto=format"
                alt=""
                loading="lazy"
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/a3c4b263f72128f5c6259333a224054ed3b539fe-1440x788.heif?auto=format"
                alt=""
                loading="lazy"
              />
            </Media>
          </CarouselItem>
        </CarouselItems>
      </Carousel>
    </main>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultSelectedIndex: Story = {
  args: {
    defaultInitialSlide: 3,
  },
};
