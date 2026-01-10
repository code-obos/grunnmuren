import type { Meta, StoryObj } from '@storybook/react-vite';
import { cva } from 'cva';
import { fn } from 'storybook/test';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselButton as CarouselButton,
  UNSAFE_CarouselControls as CarouselControls,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
  UNSAFE_CarouselItemsContainer as CarouselItemsContainer,
} from '../carousel';
import { Media } from '../content';

const meta = {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    variant: 'fullscreen',
  },
  args: {
    onSlideChange: fn(),
    onSettled: fn(),
    align: 'center',
    loop: false,
    orientation: 'horizontal',
  },
  render: ({ ...props }) => {
    const itemsVariants = cva({
      base: 'gap-4 *:basis-1/2',
      variants: {
        orientation: { vertical: 'h-[336px] max-w-xs', horizontal: null },
        loop: { false: null, true: null },
      },
      // Add the correct padding to the container based on the orientation if we're looping
      compoundVariants: [
        {
          orientation: 'vertical',
          loop: true,
          className: 'pt-4',
        },
        {
          orientation: 'horizontal',
          loop: true,
          className: 'pl-4',
        },
      ],
    });

    return (
      <main className="container flex">
        <Carousel {...props}>
          <CarouselItemsContainer>
            <CarouselItems className={itemsVariants(props)}>
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
          </CarouselItemsContainer>
          <CarouselControls className="pt-4">
            <CarouselButton slot="prev" />
            <CarouselButton slot="next" />
          </CarouselControls>
        </Carousel>
      </main>
    );
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultSelectedIndex: Story = {
  args: {
    initialIndex: 3,
  },
};

export const Looping: Story = {
  args: {
    loop: true,
  },
};

export const AutoPlay: Story = {
  args: {
    autoPlayDelay: 3000,
  },
};

export const AutoPlayLooping: Story = {
  args: {
    autoPlayDelay: 3000,
    loop: true,
  },
};

export const OneSlidePerView: Story = {
  args: {
    className: '**:data-[slot="carousel-item"]:basis-full',
  },
};

export const RoundedCorners: Story = {
  args: {
    className:
      '**:data-[slot="carousel-item"]:rounded-3xl **:data-[slot="carousel-item"]:overflow-hidden',
  },
};

export const VariableWidth: Story = {
  args: {
    className:
      '**:data-[slot="carousel-item"]:nth-2:basis-1/3 **:data-[slot="carousel-item"]:nth-4:basis-1/5',
  },
};

export const VerticalOrientation: Story = {
  args: {
    orientation: 'vertical',
  },
};
