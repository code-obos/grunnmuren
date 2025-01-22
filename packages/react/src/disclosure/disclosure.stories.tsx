import { Menu } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '../checkbox';
import { Disclosure, DisclosureButton, DisclosurePanel } from './disclosure';
import { useId } from 'react';

const meta: Meta<typeof Disclosure> = {
  title: 'Disclosure',
  component: Disclosure,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: (props) => {
    return (
      <div className="p-4">
        <Disclosure {...props}>
          <DisclosureButton className="grid place-items-center">
            Les mer
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

export const Dense: Story = {
  render: (props) => {
    return (
      <div className="p-4">
        <Disclosure {...props}>
          <DisclosureButton
            aria-label="Meny"
            className="grid place-items-center"
            variant="dense"
            isIconOnly
          >
            <Menu />
          </DisclosureButton>
          <DisclosurePanel>
            <p>Her finner du alle detaljer du måtte trenge.</p>
          </DisclosurePanel>
        </Disclosure>
      </div>
    );
  },
};

export const WithChevron: Story = {
  render: (props) => {
    const id = useId();
    return (
      <div className="p-4">
        <Disclosure {...props}>
          <DisclosureButton
            className="flex gap-6 rounded-lg border-gray-light"
            withChevron
            id={id}
          >
            Kjøpsalternativer
          </DisclosureButton>
          <DisclosurePanel className="px-4">
            <CheckboxGroup aria-labelledby={id}>
              <Checkbox value="deleie">Deleie</Checkbox>
              <Checkbox value="bostart">Bostart</Checkbox>
              <Checkbox value="boligbytte">Boligbytte</Checkbox>
            </CheckboxGroup>
          </DisclosurePanel>
        </Disclosure>
      </div>
    );
  },
};
