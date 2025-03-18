import { Calendar, House } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Label, type Selection } from 'react-aria-components';

import { Description } from '../label';
import { UNSAFE_Tag, UNSAFE_TagGroup, UNSAFE_TagList } from './tag-group';

const meta: Meta<typeof UNSAFE_TagGroup> = {
  title: 'TagGroup',
  component: UNSAFE_TagGroup,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UNSAFE_TagGroup>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
  },
  render: (props) => (
    <div className="p-6">
      <UNSAFE_TagGroup {...props}>
        <UNSAFE_TagList>
          <UNSAFE_Tag id="tag1">Tag 1</UNSAFE_Tag>
          <UNSAFE_Tag id="tag2">Tag 2</UNSAFE_Tag>
          <UNSAFE_Tag id="tag3">Tag 3</UNSAFE_Tag>
        </UNSAFE_TagList>
      </UNSAFE_TagGroup>
    </div>
  ),
};

export const SelectionModes = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-medium">Single Selection (default)</h2>
        <UNSAFE_TagGroup defaultSelectedKeys={['tag1']}>
          <UNSAFE_TagList>
            <UNSAFE_Tag id="tag1">Tag 1</UNSAFE_Tag>
            <UNSAFE_Tag id="tag2">Tag 2</UNSAFE_Tag>
            <UNSAFE_Tag id="tag3">Tag 3</UNSAFE_Tag>
          </UNSAFE_TagList>
        </UNSAFE_TagGroup>
      </div>

      <div>
        <h2 className="mb-2 font-medium">Multiple Selection</h2>
        <UNSAFE_TagGroup
          selectionMode="multiple"
          defaultSelectedKeys={['tag1', 'tag3']}
        >
          <UNSAFE_TagList>
            <UNSAFE_Tag id="tag1">Tag 1</UNSAFE_Tag>
            <UNSAFE_Tag id="tag2">Tag 2</UNSAFE_Tag>
            <UNSAFE_Tag id="tag3">Tag 3</UNSAFE_Tag>
          </UNSAFE_TagList>
        </UNSAFE_TagGroup>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div className="p-6">
      <UNSAFE_TagGroup defaultSelectedKeys={['tag1']}>
        <UNSAFE_TagList>
          <UNSAFE_Tag id="tag1">
            <House /> Bislett
          </UNSAFE_Tag>
          <UNSAFE_Tag id="tag2">
            <House /> Fredensborg
          </UNSAFE_Tag>
          <UNSAFE_Tag id="tag3">
            <House /> Majorstuen
          </UNSAFE_Tag>
        </UNSAFE_TagList>
      </UNSAFE_TagGroup>
    </div>
  );
};

export const CalendarTags = () => {
  return (
    <div className="p-6">
      <UNSAFE_TagGroup defaultSelectedKeys={['slot1']}>
        <Label>Velg en tid:</Label>
        <UNSAFE_TagList className="my-2 flex flex-wrap gap-2">
          <UNSAFE_Tag id="slot1">
            <Calendar /> 11:00 - 12:00
          </UNSAFE_Tag>
          <UNSAFE_Tag id="slot2">
            <Calendar /> 13:30 - 14:30
          </UNSAFE_Tag>
          <UNSAFE_Tag id="slot3">
            <Calendar /> 16:00 - 17:00
          </UNSAFE_Tag>
        </UNSAFE_TagList>
        <Description>
          Velg en tid som passer for deg. Du kan kun velge én tid.
        </Description>
      </UNSAFE_TagGroup>
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
      <UNSAFE_TagGroup onRemove={handleRemove}>
        <UNSAFE_TagList>
          {tags.map((tag, index) => (
            <UNSAFE_Tag
              id={`tag-${index}`}
              /* biome-ignore lint/suspicious/noArrayIndexKey: This is a storybook */
              key={index}
            >
              {tag}
            </UNSAFE_Tag>
          ))}
        </UNSAFE_TagList>
      </UNSAFE_TagGroup>
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
      <UNSAFE_TagGroup
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionMode="multiple"
      >
        <UNSAFE_TagList>
          <UNSAFE_Tag id="tag1">Tag 1</UNSAFE_Tag>
          <UNSAFE_Tag id="tag2">Tag 2</UNSAFE_Tag>
          <UNSAFE_Tag id="tag3">Tag 3</UNSAFE_Tag>
        </UNSAFE_TagList>
      </UNSAFE_TagGroup>
      <div className="mt-4">
        Selected: {Array.from(selectedKeys).join(', ')}
      </div>
    </div>
  );
};
