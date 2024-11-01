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
    <p>Dette er en beskrivelse</p>
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
