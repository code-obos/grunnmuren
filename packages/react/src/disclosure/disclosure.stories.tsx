import { Menu } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '../checkbox';
import { Disclosure, DisclosureButton, DisclosurePanel } from './disclosure';
import { useId, useState } from 'react';

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
          <DisclosureButton className="grid place-items-center" size="dense">
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
            size="dense"
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
    const [selectedOptions, setSelectedItems] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="p-4">
        <Disclosure
          {...props}
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <DisclosureButton
            className="flex gap-6 border-gray-light"
            withChevron
            id={id}
            size="dense"
          >
            Kjøpsalternativer
          </DisclosureButton>
          {!isExpanded && (
            <ul className="flex gap-2" aria-label="Valgte kjøpsalternativer">
              {selectedOptions.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          )}
          <DisclosurePanel className="px-4">
            <CheckboxGroup
              value={selectedOptions}
              onChange={setSelectedItems}
              aria-labelledby={id}
            >
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
