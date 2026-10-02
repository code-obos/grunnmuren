import { ArrowRight, InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from 'react-aria-components/Group';

import {
  movingDay,
  newApartmentBlocks,
  nordrLogo,
  obosLogo,
  office,
  podcastStudio,
  residentialArea,
  videoLoop,
} from '../__stories__/media';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselButton as CarouselButton,
  UNSAFE_CarouselControls as CarouselControls,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
  UNSAFE_CarouselItemsContainer as CarouselItemsContainer,
} from '../carousel';
import { Content, Heading, Media } from '../content';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';
import { Hero } from './hero';

const meta = {
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
            Bli med å oppfylle boligdrømmer! Vi søker engasjerte og dyktige personer som vil ta OBOS
            videre. Søk på våre ledige stillinger!
          </p>
        </Content>
        <Carousel>
          <CarouselItemsContainer>
            <CarouselItems>
              <CarouselItem>
                <Media>
                  <img src={newApartmentBlocks} alt="" />
                </Media>
              </CarouselItem>
              <CarouselItem>
                <Media>
                  <img src={newApartmentBlocks} alt="" loading="lazy" />
                </Media>
              </CarouselItem>
            </CarouselItems>
          </CarouselItemsContainer>
          <CarouselControls>
            <CarouselButton slot="prev" />
            <CarouselButton slot="next" />
          </CarouselControls>
        </Carousel>
      </Hero>
    </main>
  ),
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardWithLeadAndImageAndCarousel = {
  args: {
    children: undefined,
  },
} satisfies Story;

export const TwoColumn = () => (
  <main className="container grid gap-y-8">
    <Hero variant="two-column">
      <Content>
        <Heading level={1}>Bank på OBOS-måten</Heading>
        <p>
          Vi har satt ned renta på flere av boliglånene våre fra 2. april – og spanderer både
          etablerings- og tinglysingsgebyret på alle medlemmer som flytter lånet til oss før 31.
          mai. Det er bank på OBOS-måten.
        </p>
        <Group>
          <Button href="https://www.obos.no/bank/registrer-deg">Bli bankkunde</Button>
          <Button
            variant="secondary"
            href="https://www.obos.no/bank/registrer-deg/derfor-bor-du-velge-obos-banken"
          >
            Mer om bank på OBOS-måten
          </Button>
        </Group>
      </Content>
      <Media>
        <img src={office} alt="" />
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
      <Button className="group" variant="tertiary" href="https://www.obos.no/dette-er-obos/nyheter">
        Nyheter og pressemeldinger
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
      <Media>
        <img src={office} alt="" />
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
        <CarouselItemsContainer>
          <CarouselItems>
            <CarouselItem>
              <Media>
                <VideoLoop
                  src={videoLoop}
                  format="mp4"
                  alt="Svømmere i røde drakter tøyer ut på bassengkanten i en svømmehall."
                />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media fit="contain">
                <img src={obosLogo} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img src={newApartmentBlocks} alt="" />
              </Media>
            </CarouselItem>
          </CarouselItems>
        </CarouselItemsContainer>
        <CarouselControls>
          <CarouselButton slot="prev" />
          <CarouselButton slot="next" />
        </CarouselControls>
      </Carousel>
    </Hero>
  </main>
);

const Logo = () => <img alt="" src={nordrLogo} className="h-12" />;

export const FullBleedWithVideoLoop = () => (
  <main className="container grid gap-y-8">
    <Hero variant="full-bleed">
      <Content>
        <Heading level={1}>Frysjaparken</Heading>
        <Description>
          – det gamle industriområdet på Frysja har blitt et ettertraktet nabolag
        </Description>
      </Content>
      <Logo />
      <Media>
        <VideoLoop
          src={videoLoop}
          format="mp4"
          alt="Svømmere i røde drakter tøyer ut på bassengkanten i en svømmehall."
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
        <img src={office} alt="" />
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
      <Badge color="sky">
        <InfoCircle />I salg
      </Badge>
      <Carousel>
        <CarouselItemsContainer>
          <CarouselItems>
            <CarouselItem>
              <Media>
                <img src={newApartmentBlocks} alt="" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img src={movingDay} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media fit="contain">
                <img src={podcastStudio} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img src={residentialArea} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
          </CarouselItems>
        </CarouselItemsContainer>
        <CarouselControls>
          <CarouselButton slot="prev" />
          <CarouselButton slot="next" />
        </CarouselControls>
      </Carousel>
    </Hero>
    <h2>Tittel</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </main>
);
