import { cx } from '@/utils';

export type ChipColor = 'sky' | 'mint' | 'red-light' | 'orange-light';

export interface ChipProps {
  icon?: React.ReactNode;

  color?: ChipColor;
  className?: string;
  children: React.ReactNode;

  /* @default 'filled' */
  variant?: 'outline' | 'filled';
}

const chipVariations = {
  sky: 'bg-sky border-sky',
  'red-light': 'bg-red-light border-red-light',
  mint: 'bg-mint border-mint',
  'orange-light': 'bg-orange-light border-orange-light',
} as const;

const iconColors = {
  sky: 'text-blue-dark',
  'red-light': 'text-red',
  mint: 'text-green',
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
        className={cx('flex-1 px-4 py-2', {
          'bg-white': variant === 'outline',
        })}
      >
        {children}
      </div>
    </div>
  );
};
