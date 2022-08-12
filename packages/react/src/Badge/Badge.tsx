import classNames from 'clsx';

export type BadgeColor =
  | 'blue-light'
  | 'green'
  | 'green-light'
  | 'red-light'
  | 'orange-light'
  | 'yellow';

export interface BadgeProps {
  children: React.ReactNode;
  color: BadgeColor;
  icon: React.ReactNode;
  className?: string;
}

const badgeVariations = {
  'red-light': 'bg-red-light border-red-light',
  'green-light': 'bg-green-light border-green-light',
  green: 'bg-green border-green',
  'blue-light': 'bg-blue-light border-blue-light',
  yellow: 'bg-yellow border-yellow',
  'orange-light': 'bg-orange-light border-orange-light',
} as const;

export const Badge = (props: BadgeProps) => {
  const { className, color, icon, children } = props;

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
          badgeVariation,
        )}
      >
        {icon}
      </div>
      <div className="bg-white py-2 px-3">{children}</div>
    </div>
  );
};
