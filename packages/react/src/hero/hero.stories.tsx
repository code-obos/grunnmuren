import { ArrowRight, InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from 'react-aria-components';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselButton as CarouselButton,
  UNSAFE_CarouselControls as CarouselControls,
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
                  src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
                  alt=""
                />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img
                  src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
                  alt=""
                />
              </Media>
            </CarouselItem>
          </CarouselItems>
          <CarouselControls>
            <CarouselButton slot="prev" />
            <CarouselButton slot="next" />
          </CarouselControls>
        </Carousel>
      </Hero>
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const StandardWithLeadAndImageAndCarousel: Story = {
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
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
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
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
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
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/9a29374fde57a12bedf17149525c325a8c3254ae-850x180.svg?auto=format"
                alt=""
              />
            </Media>
          </CarouselItem>
          <CarouselItem>
            <Media>
              <img
                src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
                alt=""
              />
            </Media>
          </CarouselItem>
        </CarouselItems>
        <CarouselControls>
          <CarouselButton slot="prev" />
          <CarouselButton slot="next" />
        </CarouselControls>
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
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/da49bd3a8e2175a547da4c69c9dbce718c077fcb-1920x1280.jpg?auto=format"
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
      <CarouselControls>
        <CarouselButton slot="prev" />
        <CarouselButton slot="next" />
      </CarouselControls>
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
