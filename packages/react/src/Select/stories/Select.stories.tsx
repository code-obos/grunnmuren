import { Select } from '../';

const metadata = {
  title: 'Select',
  parameters: {
    layout: 'padded',
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

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <Select>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </Select>
    </div>
  );
};
