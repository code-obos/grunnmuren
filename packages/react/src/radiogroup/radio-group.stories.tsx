import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/button';
import { Radio } from './radio';
import { RadioGroup, type RadioGroupProps } from './radio-group';

const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const RadioItems = ({ description }: { description?: boolean }) => {
  return (
    <>
      <Radio value="ordinary">Ordinær pris</Radio>
      <Radio
        value="bostart"
        description={
          description
            ? 'OBOS Bostart gjør at du kan kjøpe en helt ny bolig til en lavere pris enn ordinær markedspris.'
            : undefined
        }
      >
        OBOS Bostart
      </Radio>
      <Radio
        value="deleie"
        description={
          description
            ? 'Med OBOS Deleie kan du kjøpe halve boligen, eller mer, og bo i hele.'
            : undefined
        }
      >
        OBOS Deleie
      </Radio>
    </>
  );
};

const Template = (args: RadioGroupProps) => {
  const items = <RadioItems description={Boolean(args.description)} />;

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

  const items = <RadioItems description={Boolean(args.description)} />;

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        {...args}
        value={selectedItem}
        onChange={(value) => {
          setSelectedItem(value);
          args.onChange?.(value);
        }}
      >
        {items}
      </RadioGroup>
      <p>Valgt: {selectedItem}</p>
    </div>
  );
};

const defaultProps = {
  label: 'Velg hvordan du vil kjøpe boligen',
  isRequired: false,
  isInvalid: undefined,
  defaultValue: undefined,
  name: undefined,
  value: undefined,
  children: undefined,
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
