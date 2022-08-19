import classNames from 'clsx';

export type ChipColor =
  | 'blue-light'
  | 'green-light'
  | 'red-light'
  | 'orange-light';

export interface ChipProps {
  icon?: React.ReactNode;

  /* @default green */
  color?: ChipColor;
  className?: string;
  children: React.ReactNode;
}

const chipVariations = {
  'blue-light': 'bg-blue-light border-blue-light',
  'red-light': 'bg-red-light border-red-light',
  'green-light': 'bg-green-light border-green-light',
  'orange-light': 'bg-orange-light border-orange-light',
} as const;

const iconColors = {
  'blue-light': 'text-blue-dark',
  'red-light': 'text-red',
  'green-light': 'text-green',
  'orange-light': 'text-black',
};

export const Chip = (props: ChipProps) => {
  const { className, color, icon, children } = props;

  const chipVariation = color && chipVariations[color];
  const iconColor = color && iconColors[color];

  return (
    <div
      className={classNames(
        'inline-flex w-fit items-center overflow-hidden rounded-lg border-2',
        chipVariation,
        className,
      )}
    >
      {icon && <div className={classNames('px-3 py-2', iconColor)}>{icon}</div>}
      <div
        className={classNames('py-2 px-3 font-medium', {
          'bg-white': icon,
        })}
      >
        {children}
      </div>
    </div>
  );
};
