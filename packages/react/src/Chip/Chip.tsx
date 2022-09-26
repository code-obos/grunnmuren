import { cx } from '@/utils';

export type ChipColor =
  | 'blue-light'
  | 'green-light'
  | 'red-light'
  | 'orange-light';

export interface ChipProps {
  icon?: React.ReactNode;

  color?: ChipColor;
  className?: string;
  children: React.ReactNode;

  /* @default 'filled' */
  variant?: 'outline' | 'filled';
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
  const { className, color, icon, children, variant = 'filled' } = props;

  const chipVariation = color && chipVariations[color];
  const iconColor = color && iconColors[color];

  return (
    <div
      className={cx(
        'inline-flex items-center gap-0.5 overflow-hidden rounded-lg border-2 text-sm font-semibold',
        chipVariation,
        className,
      )}
    >
      {icon && <div className={cx('px-3 py-2', iconColor)}>{icon}</div>}
      <div
        className={cx('flex-1 py-2 px-4', {
          'bg-white': variant === 'outline',
        })}
      >
        {children}
      </div>
    </div>
  );
};
