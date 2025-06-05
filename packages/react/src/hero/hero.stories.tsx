import { ArrowRight, InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Group } from 'react-aria-components';
import { Badge } from '../badge';
import { Button } from '../button';
import { Content, Heading, Media } from '../content';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';
import { UNSAFE_Hero as Hero } from './hero';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselItem as CarouselItem,
} from '../carousel';

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
        <Media>
          <Carousel>
            <CarouselItem>
              <img
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
                alt=""
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
                alt=""
              />
            </CarouselItem>
          </Carousel>
        </Media>
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
      <Media>
        <Carousel>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
        </Carousel>
      </Media>
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
      <Media>
        <Carousel>
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
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
              alt=""
            />
          </CarouselItem>
        </Carousel>
      </Media>
    </Hero>
  </main>
);
