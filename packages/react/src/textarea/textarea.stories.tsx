import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import { TextArea, type TextAreaProps } from './textarea';

const meta = {
  title: 'TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: TextAreaProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <TextArea {...args} />
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <TextArea {...args} />
  );
};

const ControlledTemplate = (args: TextAreaProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <Template {...args} value={value} onChange={setValue} />
      <pre className="font-sans">{value}</pre>
    </div>
  );
};

const defaultProps = {
  label: 'Beskrivelse',
  isRequired: false,
  isInvalid: undefined,
  name: undefined,
  defaultValue: undefined,
  value: undefined,
  rows: undefined,
};

export const Default: Story = {
  render: Template,
  args: { ...defaultProps },
};

export const Required: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const WithDescription: Story = {
  render: Template,
  args: {
    ...defaultProps,
    description: 'Maks 250 tegn',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    ...defaultProps,
    placeholder: 'Lorem ipsum',
  },
};

export const With5Rows: Story = {
  render: Template,
  args: {
    ...defaultProps,
    rows: 3,
  },
};

export const WithoutLabel: Story = {
  render: Template,
  args: {
    ...defaultProps,
    label: undefined,
    placeholder: 'Beskrivelse',
    'aria-label': 'Beskrivelse',
  },
};

export const IsInvalid: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  render: Template,
  args: {
    ...defaultProps,
    errorMessage: 'Feltet er påkrevd',
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};
