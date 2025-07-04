import { ArrowRight, InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Group } from 'react-aria-components';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
} from '../carousel';
import { Content, Heading, Media } from '../content';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';
import { UNSAFE_Hero as Hero } from './hero';

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
  parameters: {
    // disable built in padding in story, because we provide our own
    variant: 'fullscreen',
  },
  render: () => (
    <main className="container grid gap-y-8">
      <Hero>
        <Content>
          <Heading level={1} size="xl">
            Jobb i OBOS
          </Heading>
          <p className="lead">
            Bli med å oppfylle boligdrømmer! Vi søker engasjerte og dyktige
            personer som vil ta OBOS videre. Søk på våre ledige stillinger!
          </p>
        </Content>
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
                  src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
                  alt=""
                />
              </Media>
            </CarouselItem>
          </CarouselItems>
        </Carousel>
      </Hero>
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const StandardWithLeadAndImage: Story = {
  args: {},
};

export const TwoColumn = () => (
  <main className="container grid gap-y-8">
    <Hero variant="two-column">
      <Content>
        <Heading level={1}>Bank på OBOS-måten</Heading>
        <p>
          Vi har satt ned renta på flere av boliglånene våre fra 2. april – og
          spanderer både etablerings- og tinglysingsgebyret på alle medlemmer
          som flytter lånet til oss før 31. mai. Det er bank på OBOS-måten.
        </p>
        <Group>
          <Button href="https://www.obos.no/bank/registrer-deg">
            Bli bankkunde
          </Button>
          <Button
            variant="secondary"
            href="https://www.obos.no/bank/registrer-deg/derfor-bor-du-velge-obos-banken"
          >
            Mer om bank på OBOS-måten
          </Button>
        </Group>
      </Content>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/ar_1.234,w_1440,f_auto,q_auto,g_auto,c_fill/v1662557719/Kampanjer/obos-medlem-ungt-par-hjemme.jpg"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const StandardPageWithCTA = () => (
  <main className="container grid gap-y-8">
    <Hero>
      <Content>
        <Heading level={1}>Dette er OBOS</Heading>
      </Content>
      <Button
        className="group"
        variant="tertiary"
        href="https://www.obos.no/dette-er-obos/nyheter"
      >
        Nyheter og pressemeldinger
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/f_auto,c_limit,w_1200,q_auto/v1578908385/Samfunnsansvar/OBOS-innovasjon-livet-mellom-husene"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const StandardWithCarousel = () => (
  <main className="container grid gap-y-8">
    <Hero>
      <Content>
        <Heading level={1}>OBOS-butikken</Heading>
        <Description>– din lokale OBOS-butikk i Oslo sentrum</Description>
      </Content>
      <Carousel>
        <CarouselItems>
          <CarouselItem>
            <Media>
              <VideoLoop
                src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
                format="mp4"
                alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
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
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
                alt=""
              />
            </Media>
          </CarouselItem>
        </CarouselItems>
      </Carousel>
    </Hero>
  </main>
);

const Logo = () => (
  <img
    alt=""
    src="https://brauten-eiendom.no/wp-content/uploads/sites/13/2021/08/Nordr.png"
    className="h-12"
  />
);

export const FullBleedWithVideoLoop = () => (
  <main className="container grid gap-y-8">
    <Hero variant="full-bleed">
      <Content>
        <Heading level={1}>Frysjaparken</Heading>
        <Description>
          – det gamle industriområdet på Frysja har blitt et ettertraktet
          nabolag
        </Description>
      </Content>
      <Logo />
      <Media>
        <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
          alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
        />
      </Media>
    </Hero>
  </main>
);

export const FullBleedWithImageAndBadge = () => (
  <main className="container grid gap-y-8">
    <Hero variant="full-bleed">
      <Content>
        <Heading level={1}>Vollebekk</Heading>
        <Description>– nabolaget for store og små</Description>
      </Content>
      <Badge color="sky">
        <InfoCircle />I salg
      </Badge>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_3840,q_auto:best/v1731662987/Mellom%20husene/Byutvikling/Nabolag/Vollebekk/OBOS_bygulv_vollebekk_vannspeil-og-grontareal-foran-leilighetsbygg.jpg"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const FullBleedWithCarousel = () => (
  <main className="container grid gap-y-8">
    <Hero variant="full-bleed">
      <Content>
        <Heading level={1}>Ulven</Heading>
        <Description>– et nytt nabolag i Oslo</Description>
      </Content>
      <Carousel>
        <CarouselItems>
          <CarouselItem>
            <CarouselItem>
              <Media>
                <VideoLoop
                  src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
                  format="mp4"
                  alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
                />
              </Media>
            </CarouselItem>
          </CarouselItem>
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
    </Hero>
    <h2>Tittel</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </main>
);
