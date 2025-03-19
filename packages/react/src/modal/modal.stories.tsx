import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  UNSAFE_DialogTrigger as DialogTrigger,
  UNSAFE_Modal as Modal,
  UNSAFE_Dialog as Dialog,
} from './modal';
import { Button } from '../button';
import { Footer, Heading } from '../content';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  render: (props) => {
    return (
      <DialogTrigger>
        <Button>Åpne</Button>
        <Modal {...props}>
          <Dialog>
            <Heading slot="title" level={2}>
              Hvitevarer
            </Heading>
            <p>
              Denne boligen har tilvalg om hvitevarer fra HTH. Mulighet for
              vaskemaskin, tørketrommel, oppvaskmaskin eller å avstå dette
              tilbudet.
            </p>
            <Button slot="close">Lukk</Button>
          </Dialog>
        </Modal>
      </DialogTrigger>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const ModalStory: Story = {
  args: {},
};

export const MultipleActions: Story = {
  render: (props) => (
    <DialogTrigger>
      <Button>Åpne</Button>
      <Modal {...props}>
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
    </DialogTrigger>
  ),
};

export const Controlled: Story = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log('isOpen', isOpen);
    return (
      <div>
        <DialogTrigger>
          <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
          <Modal {...props} isOpen={isOpen} onOpenChange={setIsOpen}>
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
        </DialogTrigger>
      </div>
    );
  },
};
