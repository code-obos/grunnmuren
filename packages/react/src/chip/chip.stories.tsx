import { House } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { Selection } from 'react-aria-components';

import { Chip, ChipGroup } from './chip';

const meta: Meta<typeof ChipGroup> = {
  title: 'Chip',
  component: ChipGroup,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ChipGroup>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
  },
  render: (props) => (
    <div className="p-6">
      <ChipGroup {...props}>
        <Chip id="chip1">Chip 1</Chip>
        <Chip id="chip2">Chip 2</Chip>
        <Chip id="chip3">Chip 3</Chip>
      </ChipGroup>
    </div>
  ),
};

export const WithRemove = () => {
  const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3']);

  const handleRemove = (key: React.Key) => {
    setChips(chips.filter((_, index) => `chip-${index}` !== key));
  };

  return (
    <div className="p-6">
      <ChipGroup>
        {chips.map((chip, index) => (
          <Chip
            id={`chip-${index}`}
            /* biome-ignore lint/suspicious/noArrayIndexKey: This is a storybook */
            key={index}
            onRemove={handleRemove}
            variant="primary"
          >
            {chip}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
};

export const Variants = () => {
  return (
    <div className="p-6">
      <h2 className="mb-2 font-medium">Primary</h2>
      <ChipGroup>
        <Chip id="primary1" variant="primary">
          Primary Chip
        </Chip>
        <Chip id="primary2" variant="primary">
          Primary Chip
        </Chip>
        <Chip id="primary3" variant="primary">
          Primary Chip
        </Chip>
      </ChipGroup>
    </div>
  );
};

export const Colors = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Green (default)</h2>
        <ChipGroup>
          <Chip id="green1" variant="primary">
            Green Chip
          </Chip>
          <Chip id="green2" variant="primary">
            Green Chip
          </Chip>
          <Chip id="green3" variant="primary">
            Green Chip
          </Chip>
        </ChipGroup>
      </div>

      <div className="bg-green-light p-4">
        <h2 className="mb-2 font-medium">White (on dark background)</h2>
        <ChipGroup>
          <Chip id="white1" variant="primary" color="white">
            White Chip
          </Chip>
          <Chip id="white2" variant="primary" color="white">
            White Chip
          </Chip>
          <Chip id="white3" variant="primary" color="white">
            White Chip
          </Chip>
        </ChipGroup>
      </div>

      <div className="bg-blue p-4">
        <h2 className="mb-2 font-medium text-white">
          Secondary White (on blue background)
        </h2>
        <ChipGroup>
          <Chip id="white4" variant="secondary" color="white">
            Secondary White Chip
          </Chip>
          <Chip id="white5" variant="secondary" color="white">
            Secondary White Chip
          </Chip>
          <Chip id="white6" variant="secondary" color="white">
            Secondary White Chip
          </Chip>
        </ChipGroup>
      </div>
    </div>
  );
};

export const SelectionModes = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Single Selection (default)</h2>
        <ChipGroup selectionMode="single" defaultSelectedKeys={['chip1']}>
          <Chip id="chip1" variant="primary">
            Chip 1
          </Chip>
          <Chip id="chip2" variant="primary">
            Chip 2
          </Chip>
          <Chip id="chip3" variant="primary">
            Chip 3
          </Chip>
        </ChipGroup>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Multiple Selection</h2>
        <ChipGroup
          selectionMode="multiple"
          defaultSelectedKeys={['chip1', 'chip3']}
        >
          <Chip id="chip1" variant="primary">
            Chip 1
          </Chip>
          <Chip id="chip2" variant="primary">
            Chip 2
          </Chip>
          <Chip id="chip3" variant="primary">
            Chip 3
          </Chip>
        </ChipGroup>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div className="p-6">
      <ChipGroup>
        <Chip id="chip1" variant="primary">
          <House /> Bislett
        </Chip>
        <Chip id="chip2" variant="primary">
          <House /> Fredensborg
        </Chip>
        <Chip id="chip3" variant="primary">
          <House /> Majorstuen
        </Chip>
      </ChipGroup>
    </div>
  );
};

export const DisabledChips = () => {
  return (
    <div className="p-6">
      <ChipGroup>
        <Chip id="chip1" variant="primary">
          Enabled
        </Chip>
        <Chip id="chip2" isDisabled variant="primary">
          Disabled
        </Chip>
        <Chip id="chip3" variant="primary">
          Enabled
        </Chip>
      </ChipGroup>
    </div>
  );
};

export const RemovableChips = () => {
  const [chips, setChips] = useState(['Click on', 'The icon', 'To remove']);

  const handleRemove = (key: React.Key) => {
    setChips(chips.filter((_, index) => `chip-${index}` !== key));
  };

  return (
    <div className="p-6">
      <ChipGroup>
        {chips.map((chip, index) => (
          <Chip
            id={`chip-${index}`}
            /* biome-ignore lint/suspicious/noArrayIndexKey: This is a storybook */
            key={index}
            onRemove={handleRemove}
            variant="primary"
          >
            {chip}
          </Chip>
        ))}
      </ChipGroup>
      {chips.length === 0 && (
        <p className="mt-4">All chips removed! Refresh to try again.</p>
      )}
    </div>
  );
};

export const ControlledSelection = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(['chip1']),
  );

  return (
    <div className="p-6">
      <ChipGroup
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionMode="multiple"
      >
        <Chip id="chip1" variant="primary">
          Chip 1
        </Chip>
        <Chip id="chip2" variant="primary">
          Chip 2
        </Chip>
        <Chip id="chip3" variant="primary">
          Chip 3
        </Chip>
      </ChipGroup>
      <div className="mt-4">
        Selected: {Array.from(selectedKeys).join(', ')}
      </div>
    </div>
  );
};
