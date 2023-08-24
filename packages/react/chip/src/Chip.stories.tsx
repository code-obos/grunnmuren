import { Chip, chipVariants } from './Chip';

export default {
  title: 'Chip',
  parameters: {
    layout: 'padded',
  },
};

const colors = ['red-light', 'orange-light', 'green-light', 'blue-light'];

export const Default = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {colors.map((color) => (
          <Chip key={color} color={color}>
            Chip: {color}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {colors.map((color) => (
          <Chip key={color} color={color} variant="outline">
            Chip: {color}
          </Chip>
        ))}
      </div>
    </div>
  );
};
