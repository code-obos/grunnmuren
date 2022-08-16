import classNames from 'clsx';

export type BadgeColor =
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'red-light'
  | 'orange-light'
  | 'yellow';

export interface BadgeProps {
  icon: React.ReactNode;

  /* @default green */
  color?: BadgeColor;
  className?: string;
  children: React.ReactNode;
}

const badgeVariations = {
  'red-light': 'bg-red-light border-red-light text-black',
  'green-light': 'bg-green-light border-green-light text-green',
  green: 'bg-green border-green text-white',
  'blue-light': 'bg-blue-light border-blue-light text-blue-dark',
  yellow: 'bg-yellow border-yellow text-black',
  'orange-light': 'bg-orange-light border-orange-light text-black',
} as const;

export const Badge = (props: BadgeProps) => {
  const { className, color = 'green', icon, children } = props;

  const badgeVariation = badgeVariations[color];

  return (
    <div
      className={classNames(
        'flex w-fit overflow-hidden rounded-3xl border-2',
        badgeVariation,
        className,
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center rounded-l-3xl px-3 py-2',
        )}
      >
        {icon}
      </div>
      <div className="bg-white py-2 px-3 text-black">{children}</div>
    </div>
  );
};
