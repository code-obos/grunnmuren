import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Media, Content } from '../content';
import { UNSAFE_Hero as Hero } from './hero';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';

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
          <Heading level={2}>Dette er en Hero</Heading>
          <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
          <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt="Random"
          />
        </Media>
      </Hero>
      <div>
        <h2 className="heading-l">Typografi i Grunnmuren</h2>
        <p className="paragraph">
          Typografien i Grunnmuren defineres av tailwind-klasser. Denne teksten
          har for eksempel klassen <code>paragraph</code>.
        </p>
        <h3 className="heading-m">Sitater</h3>
        <p className="paragraph">
          Lengre sitater kan framheves med klassen <code>blockquote</code>:
        </p>
        <blockquote className="blockquote">
          Typografi er grunnmuren i all visuell kommunikasjon; den bærer
          budskapets vekt og gir strukturen vi bygger vår forståelse på.
        </blockquote>
        <h3 className="heading-m">Bildetekster</h3>
        <p className="paragraph">
          Klassen <code>description</code> kan f.eks. brukes for bildetekster:
        </p>
        <figure>
          <img
            className="mb-4 max-w-96 bg-blue-dark p-4"
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto/v1619689575/OBOS%20Merkevare/OBOS/Liggende/obos_liggende_hus_hvit.svg"
            alt="OBOS logo"
          />
          <figcaption className="description">
            OBOS sin logo har hvit tekst, og bildet må derfor ha en mørk
            bakgrunn. Slik at man kan se hva det står.
          </figcaption>
        </figure>
      </div>
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
    <Hero>
      <Content>
        <Heading level={2}>Dette er en Hero</Heading>
        <Description>– et samarbeidsprosjekt med Nordr</Description>
      </Content>
      <Media>
        <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
          alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
        />
      </Media>
    </Hero>
    <div>
      <h2 className="heading-l">Typografi i Grunnmuren</h2>
      <p className="paragraph">
        Typografien i Grunnmuren defineres av tailwind-klasser. Denne teksten
        har for eksempel klassen <code>paragraph</code>.
      </p>
      <h3 className="heading-m">Sitater</h3>
      <p className="paragraph">
        Lengre sitater kan framheves med klassen <code>blockquote</code>:
      </p>
      <blockquote className="blockquote">
        Typografi er grunnmuren i all visuell kommunikasjon; den bærer
        budskapets vekt og gir strukturen vi bygger vår forståelse på.
      </blockquote>
      <h3 className="heading-m">Bildetekster</h3>
      <p className="paragraph">
        Klassen <code>description</code> kan f.eks. brukes for bildetekster:
      </p>
      <figure>
        <img
          className="mb-4 max-w-96 bg-blue-dark p-4"
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto/v1619689575/OBOS%20Merkevare/OBOS/Liggende/obos_liggende_hus_hvit.svg"
          alt="OBOS logo"
        />
        <figcaption className="description">
          OBOS sin logo har hvit tekst, og bildet må derfor ha en mørk bakgrunn.
          Slik at man kan se hva det står.
        </figcaption>
      </figure>
    </div>
  </main>
);
