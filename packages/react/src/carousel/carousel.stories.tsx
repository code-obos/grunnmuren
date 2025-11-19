import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
} from '../carousel';
import { Media } from '../content';

const meta: Meta<typeof Carousel> = {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    // disable built in padding in story, because we provide our own
    variant: 'fullscreen',
  },
  render: () => (
    <main className="container grid gap-y-8">
      <Carousel>
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
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media fit="contain">
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/32a53eec782e6cbe15d75961f82ecca48dbe30ed-1920x1080.png?auto=format"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/a3c4b263f72128f5c6259333a224054ed3b539fe-1440x788.heif?auto=format"
                alt=""
              />
            </Media>
          </CarouselItem>
        </CarouselItems>
      </Carousel>
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const StandardWithLeadAndImage: Story = {
  args: {},
};

export const WithNavigationCallbacks = () => (
  <main className="container grid gap-y-8">
    <Carousel
      onChange={({ id, index, prevId, prevIndex }) => {
        console.log(`
        Carousel changed to item with id: "${id}" and index: ${index}.
        The previous item id was: "${prevId}" and index: ${prevIndex}.
        This indicates that the user navigated to the ${prevIndex < index ? 'next' : 'previous'} item.
      `);
      }}
    >
      <CarouselItems>
        <CarouselItem id="first">
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="second">
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/7d2285ccee9b9545e018115b8e0ecc8b06aa0729-1620x1080.jpg?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="third">
          <Media fit="contain">
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/32a53eec782e6cbe15d75961f82ecca48dbe30ed-1920x1080.png?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="fourth">
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/a3c4b263f72128f5c6259333a224054ed3b539fe-1440x788.heif?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
      </CarouselItems>
    </Carousel>
  </main>
);

export const Controlled = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      selectedIndex={selectedIndex}
      onSelectedIndexChange={setSelectedIndex}
    >
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
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media fit="contain">
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/32a53eec782e6cbe15d75961f82ecca48dbe30ed-1920x1080.png?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem>
          <Media>
            <img
              src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/a3c4b263f72128f5c6259333a224054ed3b539fe-1440x788.heif?auto=format"
              alt=""
            />
          </Media>
        </CarouselItem>
      </CarouselItems>
    </Carousel>
  );
};
