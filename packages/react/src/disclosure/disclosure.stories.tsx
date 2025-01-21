import type { Meta, StoryObj } from '@storybook/react';

import { Disclosure, DisclosureButton, DisclosurePanel } from './disclosure';
import { ChevronDown, Menu } from '@obosbbl/grunnmuren-icons-react';

const meta: Meta<typeof Disclosure> = {
  title: 'Disclosure',
  component: Disclosure,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: (props) => {
    return (
      <div className="grid gap-12 p-4">
        <Disclosure {...props}>
          <DisclosureButton
            aria-label="Hjelp"
            className="grid place-items-center"
            variant="dense"
          >
            <Menu />
          </DisclosureButton>
          <DisclosurePanel>
            <p>Her finner du alle detaljer du måtte trenge.</p>
          </DisclosurePanel>
        </Disclosure>

        <Disclosure {...props}>
          <DisclosureButton className="grid place-items-center">
            Les mer
          </DisclosureButton>
          <DisclosurePanel>
            <p>Her finner du alle detaljer du måtte trenge.</p>
          </DisclosurePanel>
        </Disclosure>

        <Disclosure {...props}>
          <DisclosureButton className="flex gap-6 rounded-lg border-gray-light px-2 py-3.5 [&[aria-expanded='true']_svg]:rotate-180">
            Her kan du velge mye forskjellig{' '}
            <ChevronDown className="flex-none transition-transform duration-300 motion-reduce:transition-none" />
          </DisclosureButton>
          <DisclosurePanel>
            <p>Her finner du alle detaljer du måtte trenge.</p>
          </DisclosurePanel>
        </Disclosure>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Disclosure>;

export const DisclosureStory: Story = {
  args: {},
};
