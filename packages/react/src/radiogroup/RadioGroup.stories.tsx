import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';
import { Radio } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'RadioGroup',
  component: RadioGroup,
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const items = (
  <>
    <Radio value="ordinary">Ordinær pris</Radio>
    <Radio value="bostart">OBOS Bostart</Radio>
    <Radio value="deleie">OBOS Deleie</Radio>
  </>
);

const Template = (args: RadioGroupProps) => {
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Lagret!');
      }}
    >
      <RadioGroup {...args}>{items}</RadioGroup>
      <Button type="submit">Send inn</Button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

const ControlledTemplate = (args: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = useState<string>('ordinary');

  useEffect(() => {
    console.log('isSelected:', selectedItem);
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup value={selectedItem} {...args} onChange={setSelectedItem}>
        {items}
      </RadioGroup>
      <p>Valgt: {selectedItem}</p>
    </div>
  );
};

const defaultProps = {
  label: 'Velg hvordan du vil kjøpe boligen',
  isRequired: false,
  isInvalid: false,
  defaultValue: undefined,
  name: undefined,
  value: undefined,
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DefaultChecked: Story = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: 'deleie',
  },
};

export const isRequired: Story = {
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
    description:
      'Kontakt oss for mer utfyllende informasjon om de forskjellige alternativene',
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
    isInvalid: true,
    errorMessage: 'Det valgte alternativet er ikke gyldig',
  },
};

export const HTMLForms: Story = {
  render: Template,

  args: {
    ...defaultProps,
    name: 'kjopsform',
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};
