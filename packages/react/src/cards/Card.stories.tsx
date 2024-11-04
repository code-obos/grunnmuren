import type { Meta, StoryObj } from '@storybook/react';
import { Card, ClickArea, Overlay } from './Cards';
import { Heading, Media } from '../content';
import { Button } from '../button';
import {
  ArrowRight,
  LinkExternal,
  PiggyBank,
} from '@obosbbl/grunnmuren-icons-react';
import { Badge } from '../badge';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  render: (props) => (
    <Card {...props}>
      <Media>
        <img
          alt=""
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
        />
      </Media>
      <Heading level={3}>Card 1</Heading>
      <p>Dette er en beskrivelse</p>
    </Card>
  ),
};

export default meta;

type Story = StoryObj<typeof Card>;

const defaultProps = {
  className: 'w-64',
} as const;

export const LinkCard: Story = {
  args: {
    href: '/#',
    ...defaultProps,
  },
};

export const LinkCardWithoutImage = () => (
  <Card href="/#" border="black">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
  </Card>
);

export const LinkCardWithoutImageAndCTA = () => (
  <Card border="black">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Hele dette kortet er klikkbart</p>
    <ClickArea>
      <Button variant="tertiary" href="#cta" className="group">
        Les mer
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
    </ClickArea>
  </Card>
);

export const LinkCardWithImportantOverlayLeft = () => (
  <Card border="black" href="#card">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
      <Overlay color="blue-dark">Viktig</Overlay>
    </Media>
    <Heading level={3}>Overskrift</Heading>
    <p>
      Her er informasjonen i overlay ekstra viktig, og derfor plassert før allt
      annt
    </p>
  </Card>
);

export const LinkCardWithImportantOverlayRight = () => (
  <Card border="black" href="#card">
    <Media>
      <Overlay color="blue-dark" align="right">
        Viktig
      </Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Overskrift</Heading>
    <p>
      Her er informasjonen i overlay ekstra viktig, og derfor plassert før allt
      annt
    </p>
  </Card>
);

export const LinkCardWithOverlayAndCTA = () => (
  <Card border="black">
    <Media>
      <Overlay color="mint">Info</Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Overskrift</Heading>
    <p>
      Her er overlay plassert rett under overskriften, siden den ikke er
      kritisk. Hele kortet er klikkbart.
    </p>
    <ClickArea>
      <Button variant="tertiary" href="#cta" className="group">
        Les mer
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
    </ClickArea>
  </Card>
);

export const BorderedCard: Story = {
  args: {
    href: '/#',
    border: 'black',
    ...defaultProps,
  },
};

export const BorderedCardWithCtaInside = () => (
  <Card border="dark-blue">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Hele kortet er klikkbart</p>
    <ClickArea>
      <Button variant="tertiary" href="#cta" className="group">
        Les mer
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
    </ClickArea>
  </Card>
);

export const LinkCardWithPrimaryCTA = () => (
  <Card border="dark-blue" href="#card">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Kun de individuelle knappene i dette kortet er klikkbare</p>
    <Button variant="primary" href="#cta" className="group">
      Meld forkjøp
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
    <Button variant="secondary" href="#secondary" className="group/secondary">
      Bli medlem
      <ArrowRight className="transition-transform group-hover/secondary:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const LinkCardWithTertiaryCTA = () => (
  <Card border="dark-blue" href="#card">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>
      Hele kortet er klikkbart mot linken `#card`. Og CTA-en under er klikkbar
      isolert for seg, den linker til `#cta`.
    </p>
    <Button variant="tertiary" href="#cta" className="group">
      Åpne finnannonsen
      <LinkExternal />
    </Button>
  </Card>
);

export const CardWithCtaMultipleCTAInside = () => (
  <Card border="dark-blue">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>
      Dette kortet er ikke klikkbart i seg selv. Men har to klikkbare CTA-er.
    </p>
    <Button variant="secondary" href="#secondary" className="group/secondary">
      Bli medlem
      <ArrowRight className="transition-transform group-hover/secondary:motion-safe:translate-x-1" />
    </Button>
    <Button variant="tertiary" href="#tertiary" className="group/tertiary">
      Min side
      <ArrowRight className="transition-transform group-hover/tertiary:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const LinkCardWithCtaMultipleCTAInside = () => (
  <Card border="dark-blue" href="#card">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>
      Dette kortet er klikkbart i seg selv. Men har også to individuelt
      klikkbare CTA-er.
    </p>
    <Button variant="secondary" href="#secondary" className="group/secondary">
      Bli medlem
      <ArrowRight className="transition-transform group-hover/secondary:motion-safe:translate-x-1" />
    </Button>
    <Button variant="tertiary" href="#tertiary" className="group/tertiary">
      Min side
      <ArrowRight className="transition-transform group-hover/tertiary:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const InfoCard = () => (
  <Card className="bg-sky-lightest">
    <Heading level={3}>Informasjonskort</Heading>
    <p>
      Dette kortet skal ikke være klikkbart, siden det kun har informasjon i
      seg.
    </p>
  </Card>
);

export const InfoCardWithCta = () => (
  <Card className="bg-sky-lightest">
    <Heading level={3}>Informasjonskort</Heading>
    <p>Hele dette kortet skal er klikkbart</p>
    <ClickArea>
      <Button variant="tertiary" href="#" className="group">
        Les mer
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
    </ClickArea>
  </Card>
);

export const InfoCardWithMultipleCTA = () => (
  <Card className="bg-sky-lightest">
    <Heading level={3}>Informasjonskort</Heading>
    <p>
      Dette kortet skal ikke være klikkbart, men kan ha klikkbare elementer inne
      i seg
    </p>
    <Button variant="secondary" href="#secondary" className="group/secondary">
      Bli medlem
      <ArrowRight className="transition-transform group-hover/secondary:motion-safe:translate-x-1" />
    </Button>
    <Button variant="tertiary" href="#tertiary" className="group/tertiary">
      Min side
      <ArrowRight className="transition-transform group-hover/tertiary:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const InfoCardDark = () => (
  <Card className="bg-blue-dark text-white">
    <Heading level={3}>Informasjonskort</Heading>
    <p>Hele dette kortet er klikkbart</p>
    <ClickArea>
      <Button variant="tertiary" href="#" className="group" color="white">
        Les mer
        <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
      </Button>
    </ClickArea>
  </Card>
);

export const InfoCardWithInlineContent = () => (
  <Card className="bg-blue-dark text-white">
    <Heading level={3}>Kort med flere klikkbare elementer</Heading>
    <p>
      Dette kortet skal ikke være klikkbart, men kan ha klikkbare elementer inne
      i seg <a href="#forkjop">forkjøp</a>.
    </p>
    <Button variant="tertiary" href="#" className="group" color="white">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const LinkCardWithIconLeft = () => (
  <Card href="/#" border="black" direction="row" className="w-60">
    <PiggyBank />
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
  </Card>
);

export const LinkCardWithIconRight = () => (
  <Card href="/#" border="black" direction="row" className="w-60">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <PiggyBank />
  </Card>
);

export const ImageCardLeft = () => (
  <Card
    href="/#"
    border="black"
    direction="row"
    className="w-[40rem] max-w-full"
  >
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Badge size="small" color="mint">
      Visning
    </Badge>
  </Card>
);

export const ImageCardRight = () => (
  <Card
    href="/#"
    border="black"
    direction="row"
    className="w-[40rem]  max-w-full"
  >
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Badge size="small" color="mint">
      Visning
    </Badge>
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
  </Card>
);

export const ImageCardLeftWithOverlayLeft = () => (
  <Card
    href="/#"
    border="black"
    direction="row"
    className="w-[40rem]  max-w-full"
  >
    <Media>
      <Overlay color="blue-dark">Viktig</Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Badge size="small" color="mint">
      Visning
    </Badge>
  </Card>
);

export const ImageCardLeftWithOverlayRight = () => (
  <Card href="/#" border="black" direction="row" className="w-96 max-w-full">
    <Media>
      <Overlay color="blue-dark" align="right">
        Viktig
      </Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse.</p>
  </Card>
);

export const ImageCardRightWithOverlayLeft = () => (
  <Card href="/#" border="black" direction="row" className="w-96 max-w-full">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Media>
      <Overlay color="blue-dark">Viktig</Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
  </Card>
);

export const ImageCardRightWithOverlayRight = () => (
  <Card href="/#" border="black" direction="row" className="w-96 max-w-full">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Media>
      <Overlay color="blue-dark" align="right">
        Viktig
      </Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
  </Card>
);

export const CardWithResponsiveDirection = () => (
  <Card href="/#" border="black" direction={{ lg: 'row' }}>
    <Heading level={3}>Responsiv layout</Heading>
    <p>Dette kortet endrer layout etter breakpoints</p>
    <Media>
      <Overlay color="blue-dark" align="right">
        Viktig
      </Overlay>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
  </Card>
);

export const CardWithIllustration = () => (
  <Card href="#card" border="dark-blue" direction={{ sm: 'row' }}>
    <Media>
      <svg
        aria-hidden="true"
        width="112"
        height="112"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.8947 51.7441V25.0321H35.6627C37.6875 25.0321 39.6294 25.8364 41.0612 27.2682C42.493 28.7 43.2973 30.6419 43.2973 32.6667V44.1188C43.2973 46.1436 42.493 48.0855 41.0612 49.5173C39.6294 50.9491 37.6875 51.7534 35.6627 51.7534H29.8947V51.7441Z"
          fill="#002169"
        />
        <path
          d="M59.8827 27.4306C58.0224 25.8375 55.6539 24.9619 53.2047 24.9619C50.7555 24.9619 48.387 25.8375 46.5267 27.4306L17.304 52.4906V96.8053H89.1147V52.4906L59.8827 27.4306Z"
          fill="#0047BA"
        />
        <path
          d="M76.468 68.3198H60.8066V96.8052H76.468V68.3198Z"
          fill="white"
        />
        <path
          d="M60.8066 96.8053H76.468V97.664C76.4606 98.9934 75.9273 100.266 74.9847 101.203C74.042 102.141 72.7667 102.667 71.4373 102.667H65.8373C64.5031 102.667 63.2235 102.137 62.2801 101.193C61.3367 100.25 60.8066 98.9702 60.8066 97.636V96.7773V96.8053Z"
          fill="#BEDFEC"
        />
        <path
          d="M45.444 78.3161C43.387 78.3161 41.4142 77.4989 39.9597 76.0444C38.5052 74.5898 37.688 72.6171 37.688 70.5601C37.688 72.6171 36.8709 74.5898 35.4163 76.0444C33.9618 77.4989 31.989 78.3161 29.932 78.3161V83.7294H45.444V78.3161Z"
          fill="white"
        />
        <path
          d="M37.688 70.56C37.688 71.5785 37.8886 72.587 38.2784 73.528C38.6682 74.469 39.2395 75.3241 39.9597 76.0443C40.6799 76.7645 41.5349 77.3358 42.4759 77.7256C43.4169 78.1153 44.4255 78.316 45.444 78.316V68.2173H29.932V78.316C31.989 78.316 33.9618 77.4988 35.4163 76.0443C36.8709 74.5897 37.688 72.617 37.688 70.56Z"
          fill="#002169"
        />
        <path
          d="M100.203 94.0522C100.197 92.6146 99.7328 91.2164 98.8787 90.0602C98.0245 88.9039 96.8243 88.0498 95.452 87.6215V85.6988C95.4569 84.8639 95.2966 84.0363 94.9802 83.2636C94.6638 82.4909 94.1976 81.7885 93.6085 81.1968C93.0195 80.6051 92.3191 80.1358 91.5478 79.816C90.7766 79.4963 89.9496 79.3323 89.1147 79.3335C88.2829 79.3323 87.459 79.495 86.6902 79.8125C85.9214 80.13 85.2227 80.5959 84.6341 81.1836C84.0455 81.7714 83.5785 82.4694 83.2599 83.2377C82.9413 84.0061 82.7773 84.8297 82.7773 85.6615V87.5842C81.4061 88.0128 80.2071 88.8673 79.3545 90.0237C78.5019 91.1801 78.04 92.5781 78.036 94.0148V96.7495H100.203V94.0522Z"
          fill="#002169"
        />
        <path
          d="M91.868 30.8373C97.7958 30.8373 102.601 26.0318 102.601 20.1039C102.601 14.1761 97.7958 9.37061 91.868 9.37061C85.9401 9.37061 81.1346 14.1761 81.1346 20.1039C81.1346 26.0318 85.9401 30.8373 91.868 30.8373Z"
          fill="#BEDFEC"
        />
      </svg>
    </Media>
    <Heading level={3}>Kort med illustrasjon</Heading>
    <p>Dette er en beskrivelse</p>
  </Card>
);
