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

export const SelectionModes = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Single Selection (default)</h2>
        <ChipGroup selectionMode="single" defaultSelectedKeys={['chip1']}>
          <Chip id="chip1">Chip 1</Chip>
          <Chip id="chip2">Chip 2</Chip>
          <Chip id="chip3">Chip 3</Chip>
        </ChipGroup>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Multiple Selection</h2>
        <ChipGroup
          selectionMode="multiple"
          defaultSelectedKeys={['chip1', 'chip3']}
        >
          <Chip id="chip1">Chip 1</Chip>
          <Chip id="chip2">Chip 2</Chip>
          <Chip id="chip3">Chip 3</Chip>
        </ChipGroup>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div className="p-6">
      <ChipGroup>
        <Chip id="chip1">
          <House /> Bislett
        </Chip>
        <Chip id="chip2">
          <House /> Fredensborg
        </Chip>
        <Chip id="chip3">
          <House /> Majorstuen
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
        <Chip id="chip1">Chip 1</Chip>
        <Chip id="chip2">Chip 2</Chip>
        <Chip id="chip3">Chip 3</Chip>
      </ChipGroup>
      <div className="mt-4">
        Selected: {Array.from(selectedKeys).join(', ')}
      </div>
    </div>
  );
};
