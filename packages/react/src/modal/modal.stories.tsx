import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button';
import { Footer, Heading } from '../content';
import {
  UNSAFE_Dialog as Dialog,
  UNSAFE_DialogTrigger as DialogTrigger,
  UNSAFE_Modal as Modal,
  UNSAFE_ModalOverlay as ModalOverlay,
} from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="p-4">
        <DialogTrigger>
          <Button>Åpne</Button>
          <ModalOverlay isDismissable>
            <Modal>
              <Dialog>
                <Heading slot="title" level={2}>
                  Hvitevarer
                </Heading>
                <p>
                  Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for
                  vaskemaskin, tørketrommel, oppvaskmaskin eller å avstå dette
                  tilbudet.
                </p>
                <Heading level={3} className="heading-xs">
                  Andre tilvalg
                </Heading>
                <p>
                  Vi er opptatt av at du skal bli fornøyd og kan skape ditt
                  drømmehjem med tilvalg. Det er viktig å huske at når vi gjør
                  endringer i standarden på boligen, kommer blant annet
                  montering, tilpasninger og transport som en tilleggskostnad.
                  Vi bestiller varer i store kvanta, og å fjerne varer fra
                  totalleveransen gjør prisen på resten av varene høyere, som
                  betyr at vi ikke alltid har mulighet til å gi deg fradrag på
                  varene du velger bort. Når du bestiller tilvalg hos oss gir vi
                  deg en totalpris på oppgraderingen som inkluderer alt dette,
                  hvilket gjør det litt vanskeligere å sammenligne priser på
                  lignende varer i butikk.
                </p>
                <Button slot="close">Lukk</Button>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const ModalStory: Story = {
  args: {},
};

export const MultipleActions: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <ModalOverlay isDismissable>
          <Modal>
            <Dialog>
              <Heading slot="title" level={2}>
                Hvitevarer
              </Heading>
              <p>
                Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for
                vaskemaskin, tørketrommel, oppvaskmaskin eller å avstå dette
                tilbudet.
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
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-4">
        <DialogTrigger>
          <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
          <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal isDismissable>
              <Dialog>
                <Heading slot="title" level={2}>
                  Tittel
                </Heading>
                <p>Denne modalen er controlled.</p>
                <Button onPress={() => setIsOpen(false)} slot="close">
                  Lukk
                </Button>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    );
  },
};

export const FullyControlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleClose = () => {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsOpen(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    return (
      <div className="p-4">
        <div>
          <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
          <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal>
              <Dialog>
                <Heading slot="title" level={2}>
                  Tittel
                </Heading>
                <p>Denna modalen er controlled.</p>
                {countdown > 0 && <strong>Lukkes om {countdown} s.</strong>}
                <Button onPress={handleClose}>Lukk</Button>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </div>
      </div>
    );
  },
};

export const CustomZIndex: Story = {
  render: () => (
    <div className="p-4">
      <DialogTrigger>
        <Button>Åpne</Button>
        <ModalOverlay isDismissable zIndex={50}>
          <Modal>
            <Dialog>
              <Heading slot="title" level={2}>
                Hvitevarer
              </Heading>
              <p>
                Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for
                vaskemaskin, tørketrommel, oppvaskmaskin eller å avstå dette
                tilbudet.
              </p>
              <Heading level={3} className="heading-xs">
                Andre tilvalg
              </Heading>
              <p>
                Vi er opptatt av at du skal bli fornøyd og kan skape ditt
                drømmehjem med tilvalg. Det er viktig å huske at når vi gjør
                endringer i standarden på boligen, kommer blant annet montering,
                tilpasninger og transport som en tilleggskostnad. Vi bestiller
                varer i store kvanta, og å fjerne varer fra totalleveransen gjør
                prisen på resten av varene høyere, som betyr at vi ikke alltid
                har mulighet til å gi deg fradrag på varene du velger bort. Når
                du bestiller tilvalg hos oss gir vi deg en totalpris på
                oppgraderingen som inkluderer alt dette, hvilket gjør det litt
                vanskeligere å sammenligne priser på lignende varer i butikk.
              </p>
              <Button slot="close">Lukk</Button>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  ),
};
