import type { Meta, StoryObj } from '@storybook/react';
import { Card, Overlay } from './Cards';
import { Heading, Media } from '../content';
import { Button } from '../button';
import {
  ArrowRight,
  LinkExternal,
  PiggyBank,
} from '@obosbbl/grunnmuren-icons-react';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  render: (props) => (
    <Card {...props}>
      <Media>
        <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
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
    <p>Dette er en beskrivelse</p>
    <Button variant="tertiary" href="#cta" className="group">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const LinkCardWithImportantOverlay = () => (
  <Card border="black" href="#card">
    <Overlay color="blue-dark">Viktig - må komme først</Overlay>
    <Media>
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
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
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Overskrift</Heading>
    <Overlay color="mint">Info</Overlay>
    <p>
      Her er overlay plassert rett under overskriften, siden den ikke er kritisk
    </p>
    <Button variant="tertiary" href="#cta" className="group">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
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
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Dette er en beskrivelse</p>
    <Button variant="tertiary" href="#cta" className="group">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
  </Card>
);

export const LinkCardWithPrimaryCTA = () => (
  <Card border="dark-blue" href="#card">
    <Media>
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Dette er en beskrivelse</p>
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
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Dette er en beskrivelse</p>
    <Button variant="tertiary" href="#cta" className="group">
      Åpne finnannonsen
      <LinkExternal />
    </Button>
  </Card>
);

export const CardWithCtaMultipleCTAInside = () => (
  <Card border="dark-blue">
    <Media>
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Dette er en beskrivelse</p>
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
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Card 1</Heading>
    <p>Dette er en beskrivelse</p>
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
    <p>Dette kortet skal være klikkbart, siden det er én CTA</p>
    <Button variant="tertiary" href="#" className="group">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
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
    <p>
      Dette kortet skal ikke være klikkbart, men kan ha klikkbare elementer inne
      i seg
    </p>
    <Button variant="tertiary" href="#" className="group" color="white">
      Les mer
      <ArrowRight className="transition-transform group-hover:motion-safe:translate-x-1" />
    </Button>
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
  <Card href="/#" border="black" directon="row">
    <PiggyBank />
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
  </Card>
);

export const LinkCardWithIconRight = () => (
  <Card href="/#" border="black" directon="row">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <PiggyBank />
  </Card>
);

export const ImageCardLeft = () => (
  <Card href="/#" border="black" directon="row">
    <Media>
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
  </Card>
);

export const ImageCardRight = () => (
  <Card href="/#" border="black" directon="row">
    <Heading level={3}>Kort uten bilde</Heading>
    <p>Dette er en beskrivelse</p>
    <Media>
      <img src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg" />
    </Media>
  </Card>
);
