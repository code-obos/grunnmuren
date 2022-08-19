import classNames from 'clsx';

export type ChipColor =
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'red-light'
  | 'orange-light'
  | 'yellow';

export interface ChipProps {
  icon?: React.ReactNode;

  /* @default green */
  color?: ChipColor;
  className?: string;
  children: React.ReactNode;
}

const ChipVariations = {
  'red-light': 'bg-red-light border-red-light text-red',
  'green-light': 'bg-green-light border-green-light text-green',
  green: 'bg-green border-green text-white',
  'blue-light': 'bg-blue-light border-blue-light text-blue-dark',
  yellow: 'bg-yellow border-yellow text-black',
  'orange-light': 'bg-orange-light border-orange-light text-black',
} as const;

export const Chip = (props: ChipProps) => {
  const { className, color = 'green', icon, children } = props;

  const ChipVariation = ChipVariations[color];

  return (
    <div
      className={classNames(
        'inline-flex w-fit items-center overflow-hidden rounded-lg border-2',
        ChipVariation,
        className,
      )}
    >
      {icon && <div className={classNames('px-3 py-2')}>{icon}</div>}
      <div
        className={classNames('py-2 px-3 font-medium', {
          'bg-white': icon,
          'text-white': !icon && color === 'green',
          'text-black': icon || color !== 'green',
        })}
      >
        {children}
      </div>
    </div>
  );
};
