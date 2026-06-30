import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Footer, Header, Heading } from '../content';
import { UNSAFE_Dialog as Dialog, UNSAFE_DialogTrigger as DialogTrigger } from '../modal';
import { UNSAFE_Drawer as Drawer } from './drawer';

const meta = {
  title: 'Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <Drawer>
          <Dialog>
            <Header>
              <Heading level={2}>Hvitevarer</Heading>
            </Header>
            <p>
              Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for vaskemaskin,
              tørketrommel, oppvaskmaskin eller å avstå dette tilbudet.
            </p>
            <Heading level={3} className="heading-xs">
              Andre tilvalg
            </Heading>
            <p>
              Vi er opptatt av at du skal bli fornøyd og kan skape ditt drømmehjem med tilvalg. Det
              er viktig å huske at når vi gjør endringer i standarden på boligen, kommer blant annet
              montering, tilpasninger og transport som en tilleggskostnad.
            </p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DrawerStory: Story = {};

export const Left: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne fra venstre</Button>
        <Drawer placement="left">
          <Dialog>
            <Header>
              <Heading level={2}>Filter</Heading>
            </Header>
            <p>Drawer fra venstre side. Vanlig brukt for navigasjon eller filtre.</p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const Top: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne fra toppen</Button>
        <Drawer placement="top">
          <Dialog>
            <Header>
              <Heading level={2}>Varsel</Heading>
            </Header>
            <p>Drawer fra toppen, for eksempel for varsler eller hurtigvalg.</p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne fra bunnen</Button>
        <Drawer placement="bottom">
          <Dialog>
            <Header>
              <Heading level={2}>Detaljer</Heading>
            </Header>
            <p>Drawer fra bunnen — fungerer godt på mobil for sekundære handlinger.</p>
            <Footer>
              <Button slot="close">Lagre</Button>
              <Button variant="tertiary" slot="close">
                Avbryt
              </Button>
            </Footer>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const MultipleActions: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <Drawer>
          <Dialog>
            <Header>
              <Heading level={2}>Hvitevarer</Heading>
            </Header>
            <p>
              Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for vaskemaskin,
              tørketrommel, oppvaskmaskin eller å avstå dette tilbudet.
            </p>
            <Footer>
              <Button onPress={() => console.log('SAVED!')} slot="close">
                Lagre
              </Button>
              <Button variant="tertiary" slot="close">
                Avbryt
              </Button>
            </Footer>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onPress={() => setIsOpen(true)}>Åpne Drawer</Button>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog>
            <Header>
              <Heading level={2}>Tittel</Heading>
            </Header>
            <p>Denne drawer er controlled.</p>
            <Button onPress={() => setIsOpen(false)} slot="close">
              Lukk
            </Button>
          </Dialog>
        </Drawer>
      </div>
    );
  },
};

export const NotDismissable: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onPress={() => setIsOpen(true)}>Åpne</Button>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} isDismissable={false}>
          <Dialog>
            <Header>
              <Heading level={2}>Bekreft handlingen</Heading>
            </Header>
            <p>
              Klikk utenfor og <kbd>Escape</kbd> lukker ikke denne drawer, og close-knappen vises
              ikke automatisk i headeren.
            </p>
            <Button onPress={() => setIsOpen(false)}>Bekreft</Button>
          </Dialog>
        </Drawer>
      </div>
    );
  },
};

export const CustomBackground: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <Drawer className="bg-blue-dark! text-mint-light">
          <Dialog>
            <Header>
              <Heading level={2} className="text-mint">
                Mørk drawer
              </Heading>
            </Header>
            <p>
              Bakgrunnsfargen kan inntil videre overstyres med `!`-prefiks, og innholdsfarger settes
              på `Heading` og tekstelementer etter behov.
            </p>
            <Button slot="close" color="mint">
              Lukk
            </Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const CustomZIndex: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <Drawer zIndex={50}>
          <Dialog>
            <Header>
              <Heading level={2}>Custom z-index</Heading>
            </Header>
            <p>Drawer med z-index 50.</p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

/**
 * Sticky header og footer er konsumentens ansvar via `className` — komponenten
 * implementerer det ikke selv. Her er `Header` og `Footer` gjort `position: sticky`,
 * og de negative marginene (`-mx-4` m.m.) lar bakgrunnen dekke hele bredden til
 * tross for paddingen på `Dialog`.
 */
export const StickyHeaderFooter: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne skjema</Button>
        <Drawer>
          <Dialog>
            <Header className="sticky top-0 z-10 -mx-4 -mt-4 bg-white p-4 ">
              <Heading level={2}>Meld interesse</Heading>
            </Header>
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i}>
                Avsnitt {i + 1}: Fyll inn skjemaet for å melde interesse. Innholdet er bevisst langt
                slik at draweren må scrolles, og du kan se at header og footer blir værende synlige.
              </p>
            ))}
            <Footer className="sticky bottom-0 z-10 -mx-4 -mb-4 bg-white p-4 ">
              <Button slot="close">Send inn</Button>
              <Button variant="tertiary" slot="close">
                Avbryt
              </Button>
            </Footer>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};
