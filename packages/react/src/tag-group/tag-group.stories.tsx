import { Calendar, House } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Selection } from 'react-aria-components';

import { Description, Label } from '../label';
import { Tag, TagGroup, TagList } from './tag-group';

const meta = {
  title: 'TagGroup',
  component: TagGroup,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TagGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
  },
  render: (props) => (
    <div className="p-6">
      <TagGroup {...props}>
        <Label>Velg en:</Label>
        <TagList className="my-2">
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
        <TagGroup defaultSelectedKeys={['tag1']}>
          <Label>Single Selection (default)</Label>
          <TagList className="my-2">
            <Tag id="tag1">Tag 1</Tag>
            <Tag id="tag2">Tag 2</Tag>
            <Tag id="tag3">Tag 3</Tag>
          </TagList>
        </TagGroup>
      </div>

      <div>
        <TagGroup
          selectionMode="multiple"
          defaultSelectedKeys={['tag1', 'tag3']}
        >
          <Label>Multiple Selection</Label>

          <TagList className="my-2">
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
        <Label>Velg et sted:</Label>
        <TagList className="my-2">
          <Tag id="tag1" textValue="Bislett">
            <House /> Bislett
          </Tag>
          <Tag id="tag2" textValue="Fredensborg">
            <House /> Fredensborg
          </Tag>
          <Tag id="tag3" textValue="Majorstuen">
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
          <Tag id="slot1" textValue="11:00 - 12:00">
            <Calendar /> 11:00 - 12:00
          </Tag>
          <Tag id="slot2" textValue="13:30 - 14:30">
            <Calendar /> 13:30 - 14:30
          </Tag>
          <Tag id="slot3" textValue="16:00 - 17:00">
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
    // Convert to array for consistent handling
    const keysArray = keys instanceof Set ? Array.from(keys) : [keys];

    // Filter out removed tags
    setTags((currentTagState) =>
      currentTagState.filter((tag) => !keysArray.includes(tag)),
    );
  };

  return (
    <div className="p-6">
      <TagGroup onRemove={handleRemove}>
        <Label>Aktive filter:</Label>
        <TagList className="my-2">
          {tags.map((tag) => (
            <Tag id={tag} key={tag}>
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
        <Label>Velg flere:</Label>
        <TagList className="my-2">
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
