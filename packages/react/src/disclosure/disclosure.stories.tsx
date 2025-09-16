import { Menu } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { Checkbox, CheckboxGroup } from '../checkbox';
import {
  UNSAFE_Disclosure as Disclosure,
  UNSAFE_DisclosureButton as DisclosureButton,
  UNSAFE_DisclosureGroup as DisclosureGroup,
  UNSAFE_DisclosurePanel as DisclosurePanel,
} from './disclosure';

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
          <DisclosureButton className="description" withChevron>
            Les mer
          </DisclosureButton>
          <DisclosurePanel className="pt-2">
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

export const Hamburger: Story = {
  render: (props) => {
    return (
      <div className="p-4">
        <Disclosure {...props}>
          <DisclosureButton
            aria-label="Meny"
            className="grid place-items-center"
            isIconOnly
          >
            <Menu />
          </DisclosureButton>
          <DisclosurePanel className="pt-2">
            <p>Her finner du alle detaljer du måtte trenge.</p>
          </DisclosurePanel>
        </Disclosure>
      </div>
    );
  },
};

export const WithCheckboxGroup: Story = {
  render: (props) => {
    const id = useId();
    const [selectedOptions, setSelectedItems] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="p-12">
        <Disclosure
          {...props}
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <DisclosureButton
            className="flex w-full gap-6 border-gray-light"
            withChevron
            id={id}
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
          {/* biome-ignore lint/a11y/useValidAriaRole: this is a custom component where role is a prop that defaults to 'group' */}
          <DisclosurePanel className="p-4" role="none">
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

export const Grouped: Story = {
  render: (props) => {
    const id = useId();
    const [selectedOptions, setSelectedItems] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <DisclosureGroup className="grid gap-4 p-12">
        <Disclosure
          {...props}
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <DisclosureButton
            className="flex w-full gap-6 border-gray-light"
            withChevron
            id={id}
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
          {/* biome-ignore lint/a11y/useValidAriaRole: this is a custom component where role is a prop that defaults to 'group' */}
          <DisclosurePanel className="p-4" role="none">
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
        <Disclosure
          {...props}
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <DisclosureButton
            className="flex w-full gap-6 border-gray-light"
            withChevron
            id={id}
          >
            Område
          </DisclosureButton>
          {!isExpanded && (
            <ul className="flex gap-2" aria-label="Valgte kjøpsalternativer">
              {selectedOptions.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          )}
          {/* biome-ignore lint/a11y/useValidAriaRole: this is a custom component where role is a prop that defaults to 'group' */}
          <DisclosurePanel className="p-4" role="none">
            <CheckboxGroup
              value={selectedOptions}
              onChange={setSelectedItems}
              aria-labelledby={id}
            >
              <Checkbox value="oslo">Oslo</Checkbox>
              <Checkbox value="bergen">Bergen</Checkbox>
              <Checkbox value="trondheim">Trondheim</Checkbox>
            </CheckboxGroup>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    );
  },
};
