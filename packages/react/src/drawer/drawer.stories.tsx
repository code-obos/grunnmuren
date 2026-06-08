import { Close } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Footer, Heading } from '../content';
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
            <Heading slot="title" level={2}>
              Hvitevarer
            </Heading>
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
            <Heading slot="title" level={2}>
              Filter
            </Heading>
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
            <Heading slot="title" level={2}>
              Varsel
            </Heading>
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
            <Heading slot="title" level={2}>
              Detaljer
            </Heading>
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
            <Heading slot="title" level={2}>
              Hvitevarer
            </Heading>
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
            <Heading slot="title" level={2}>
              Tittel
            </Heading>
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
            <Heading slot="title" level={2}>
              Bekreft handlingen
            </Heading>
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
            <Heading slot="title" level={2} className="text-mint">
              Mørk drawer
            </Heading>
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
            <Heading slot="title" level={2}>
              Custom z-index
            </Heading>
            <p>Drawer med z-index 50.</p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne lang liste</Button>
        <Drawer>
          <Dialog>
            <div className="sticky top-0 z-10 -mx-4 -mt-4 flex items-center justify-between gap-x-2 bg-white px-4 pt-4 pb-3 shadow-sm">
              <Heading level={2} className="heading-s">
                Tilvalg
              </Heading>
              <Button slot="close" variant="tertiary" className="px-2.5!" aria-label="Lukk">
                <Close />
              </Button>
            </div>
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i}>
                Tilvalg {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            ))}
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  ),
};
