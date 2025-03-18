import { Calendar, House } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Label, type Selection } from 'react-aria-components';

import { Description } from '../label';
import {
  UNSAFE_Tag as Tag,
  UNSAFE_TagGroup as TagGroup,
  UNSAFE_TagList as TagList,
} from './tag-group';

const meta: Meta<typeof TagGroup> = {
  title: 'TagGroup',
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
        <TagList>
          <Tag id="tag1">Tag 1</Tag>
          <Tag id="tag2">Tag 2</Tag>
          <Tag id="tag3">Tag 3</Tag>
        </TagList>
      </TagGroup>
    </div>
  ),
};

export const SelectionModes = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Single Selection (default)</h2>
        <TagGroup defaultSelectedKeys={['tag1']}>
          <TagList>
            <Tag id="tag1">Tag 1</Tag>
            <Tag id="tag2">Tag 2</Tag>
            <Tag id="tag3">Tag 3</Tag>
          </TagList>
        </TagGroup>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Multiple Selection</h2>
        <TagGroup
          selectionMode="multiple"
          defaultSelectedKeys={['tag1', 'tag3']}
        >
          <TagList>
            <Tag id="tag1">Tag 1</Tag>
            <Tag id="tag2">Tag 2</Tag>
            <Tag id="tag3">Tag 3</Tag>
          </TagList>
        </TagGroup>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div className="p-6">
      <TagGroup defaultSelectedKeys={['tag1']}>
        <TagList>
          <Tag id="tag1">
            <House /> Bislett
          </Tag>
          <Tag id="tag2">
            <House /> Fredensborg
          </Tag>
          <Tag id="tag3">
            <House /> Majorstuen
          </Tag>
        </TagList>
      </TagGroup>
    </div>
  );
};

export const CalendarTags = () => {
  return (
    <div className="p-6">
      <TagGroup defaultSelectedKeys={['slot1']}>
        <Label>Velg en tid:</Label>
        <TagList className="my-2 flex flex-wrap gap-2">
          <Tag id="slot1">
            <Calendar /> 11:00 - 12:00
          </Tag>
          <Tag id="slot2">
            <Calendar /> 13:30 - 14:30
          </Tag>
          <Tag id="slot3">
            <Calendar /> 16:00 - 17:00
          </Tag>
        </TagList>
        <Description>
          Velg en tid som passer for deg. Du kan kun velge én tid.
        </Description>
      </TagGroup>
    </div>
  );
};

export const RemovableTags = () => {
  const [tags, setTags] = useState(['Oslo', 'Stavanger', 'Göteborg']);

  const handleRemove = (keys: React.Key | Set<React.Key>) => {
    // Convert single key to Set for consistent handling
    const keysSet = keys instanceof Set ? keys : new Set([keys]);
    setTags(tags.filter((_, index) => !keysSet.has(`tag-${index}`)));
  };

  return (
    <div className="p-6">
      <TagGroup onRemove={handleRemove}>
        <TagList>
          {tags.map((tag, index) => (
            <Tag
              id={`tag-${index}`}
              /* biome-ignore lint/suspicious/noArrayIndexKey: This is a storybook */
              key={index}
            >
              {tag}
            </Tag>
          ))}
        </TagList>
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
        <TagList>
          <Tag id="tag1">Tag 1</Tag>
          <Tag id="tag2">Tag 2</Tag>
          <Tag id="tag3">Tag 3</Tag>
        </TagList>
      </TagGroup>
      <div className="mt-4">
        Selected: {Array.from(selectedKeys).join(', ')}
      </div>
    </div>
  );
};
