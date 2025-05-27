import type { Meta, StoryObj } from '@storybook/react';
import { Content, Heading, Media } from '../content';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';
import { UNSAFE_Hero as Hero } from './hero';
import { Button } from '../button';
import { Group } from 'react-aria-components';
import { Badge } from '../badge';
import { InfoCircle } from '@obosbbl/grunnmuren-icons-react';

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: () => (
    <main className="container grid gap-y-8">
      <Hero>
        <Content>
          <Heading level={1}>Dette er en Hero</Heading>
          <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
          <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt=""
          />
        </Media>
      </Hero>
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const WithImage: Story = {
  args: {},
};

export const WithVideoLoop = () => (
  <main className="container grid gap-y-8">
    <Hero layout="full-bleed">
      <Content>
        <Heading level={1}>Frysjaparken</Heading>
        <Description>
          – det gamle industriområdet på Frysja har blitt et ettertraktet
          nabolag
        </Description>
      </Content>
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

export const FullBleedWithImage = () => (
  <main className="container grid gap-y-8">
    <Hero layout="full-bleed">
      <Content>
        <Heading level={1}>Frysjaparken</Heading>
        <Description>
          – det gamle industriområdet på Frysja har blitt et ettertraktet
          nabolag
        </Description>
      </Content>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const LandingPageTwoColumn = () => (
  <main className="container grid gap-y-8">
    <Hero layout="two-column">
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
            href="https://www.obos.no/bank/registrer-deg"
          >
            Mer om bank på OBOS-måten
          </Button>
        </Group>
      </Content>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const LandingPageWithBadge = () => (
  <main className="container grid gap-y-8">
    <Hero level={1}>
      <Content>
        <Heading level={1}>Bank på OBOS-måten</Heading>
      </Content>
      <Badge color="sky">
        <InfoCircle />
        Meldefrist
      </Badge>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const LandingPageWithLogo = () => (
  <main className="container grid gap-y-8">
    <Hero level={1}>
      <Content>
        <Heading level={1}>Frysjaparken</Heading>
      </Content>
      <img
        alt=""
        src="https://brauten-eiendom.no/wp-content/uploads/sites/13/2021/08/Nordr.png"
        className="h-12"
      />
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
