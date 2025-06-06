import type { Meta, StoryObj } from '@storybook/react';
import { Group } from 'react-aria-components';
import { Button } from '../button';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
} from '../carousel';
import { VideoLoop } from '../video-loop';

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
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <VideoLoop
              src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
              format="mp4"
              alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
        </CarouselItems>
        <Group>
          <Button slot="prev" />
          <Button slot="next" />
        </Group>
      </Carousel>
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const StandardWithLeadAndImage: Story = {
  args: {},
};
