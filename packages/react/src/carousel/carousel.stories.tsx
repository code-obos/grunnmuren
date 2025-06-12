import type { Meta, StoryObj } from '@storybook/react';
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
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media fit="contain">
              <img
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
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
      onNext={(props) => console.log('Next clicked', props)}
      onPrev={(props) => console.log('Prev clicked', props)}
    >
      <CarouselItems>
        <CarouselItem id="first">
          <Media>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="second">
          <Media>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="third">
          <Media fit="contain">
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
        <CarouselItem id="fourth">
          <Media>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
              alt=""
            />
          </Media>
        </CarouselItem>
      </CarouselItems>
    </Carousel>
  </main>
);
