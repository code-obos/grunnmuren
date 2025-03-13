import { Calendar, House } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { Selection } from 'react-aria-components';

import { Tag, TagGroup } from './tag';

const meta: Meta<typeof TagGroup> = {
  title: 'Tag | Chip',
  component: TagGroup,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
  },
  render: (props) => (
    <div className="p-6">
      <TagGroup {...props}>
        <Tag id="tag1">Tag 1</Tag>
        <Tag id="tag2">Tag 2</Tag>
        <Tag id="tag3">Tag 3</Tag>
      </TagGroup>
    </div>
  ),
};

export const SelectionModes = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Single Selection (default)</h2>
        <TagGroup selectionMode="single" defaultSelectedKeys={['tag1']}>
          <Tag id="tag1">Tag 1</Tag>
          <Tag id="tag2">Tag 2</Tag>
          <Tag id="tag3">Tag 3</Tag>
        </TagGroup>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Multiple Selection</h2>
        <TagGroup
          selectionMode="multiple"
          defaultSelectedKeys={['tag1', 'tag3']}
        >
          <Tag id="tag1">Tag 1</Tag>
          <Tag id="tag2">Tag 2</Tag>
          <Tag id="tag3">Tag 3</Tag>
        </TagGroup>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div className="p-6">
      <TagGroup>
        <Tag id="tag1">
          <House /> Bislett
        </Tag>
        <Tag id="tag2">
          <House /> Fredensborg
        </Tag>
        <Tag id="tag3">
          <House /> Majorstuen
        </Tag>
      </TagGroup>
    </div>
  );
};

export const CalendarTags = () => {
  return (
    <div className="p-6">
      <h2 className="mb-4 font-medium">Time Slots</h2>
      <TagGroup selectionMode="single" defaultSelectedKeys={['slot1']}>
        <Tag id="slot1">
          <Calendar /> 11:00 - 12:00
        </Tag>
        <Tag id="slot2">
          <Calendar /> 13:30 - 14:30
        </Tag>
        <Tag id="slot3">
          <Calendar /> 16:00 - 17:00
        </Tag>
      </TagGroup>
    </div>
  );
};

export const RemovableTags = () => {
  const [tags, setTags] = useState(['Click on', 'The tag', 'To remove']);

  const handleRemove = (key: React.Key) => {
    setTags(tags.filter((_, index) => `tag-${index}` !== key));
  };

  return (
    <div className="p-6">
      <TagGroup>
        {tags.map((tag, index) => (
          <Tag
            id={`tag-${index}`}
            /* biome-ignore lint/suspicious/noArrayIndexKey: This is a storybook */
            key={index}
            onRemove={handleRemove}
          >
            {tag}
          </Tag>
        ))}
      </TagGroup>
      {tags.length === 0 && (
        <p className="mt-4">All tags removed! Refresh to try again.</p>
      )}
    </div>
  );
};

export const ControlledSelection = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(['tag1']),
  );

  return (
    <div className="p-6">
      <TagGroup
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionMode="multiple"
      >
        <Tag id="tag1">Tag 1</Tag>
        <Tag id="tag2">Tag 2</Tag>
        <Tag id="tag3">Tag 3</Tag>
      </TagGroup>
      <div className="mt-4">
        Selected: {Array.from(selectedKeys).join(', ')}
      </div>
    </div>
  );
};
