import { Select, SelectProps } from '../';

const metadata = {
  title: 'Select',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    description: {
      defaultValue: 'Så vi kan hjelpe deg bedre',
      control: 'text',
    },
    size: {
      defaultValue: 'medium',
      options: ['medium', 'small'],
      control: { type: 'radio' },
    },
    required: {
      defaultValue: true,
      control: 'boolean',
    },
  },
};
export default metadata;

const options = [
  { key: 'alle', value: 'Alle' },
  { key: 'oslo', value: 'Oslo' },
  { key: 'agder', value: 'Agder' },
  { key: 'trondelag', value: 'Trøndelag' },
  { key: 'tromso', value: 'Tromsø' },
];

export const Default = (props: SelectProps) => {
  return (
    <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};
