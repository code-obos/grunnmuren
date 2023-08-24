import { ChipBase as Chip } from './Chip';

export default {
  title: 'Chip',
  parameters: {
    layout: 'padded',
  },
};

const colors = [
  'red-light',
  'orange-light',
  'green-light',
  'blue-light',
] as const;

export const Default = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {colors.map((color) => (
          <Chip key={color} color={color}>
            {color}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {colors.map((color) => (
          <Chip key={color} color={color} variant="outline">
            {color}
          </Chip>
        ))}
      </div>
    </div>
  );
};
