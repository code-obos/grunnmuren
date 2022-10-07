import { cx } from '@/utils';

interface StepListProps extends React.ComponentPropsWithoutRef<'ol'> {}

const StepList = (props: StepListProps) => {
  return <ol {...props} />;
};

interface StepListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  /** Content for the StepListItem's bullet */
  bullet: React.ReactNode;
}

export const StepListItem = (props: StepListItemProps) => {
  const { className, children, bullet, ...rest } = props;

  return (
    <li
      className={cx(
        className,
        'group relative flex gap-4 pb-8 text-sm last:pb-0 md:gap-8 md:pb-12 md:text-base',
      )}
      {...rest}
    >
      <StepListBullet>{bullet}</StepListBullet>
      {children}
    </li>
  );
};

interface StepListBulletProps extends React.ComponentPropsWithoutRef<'span'> {}

// Don't export this, as it is for internal use by StepListItem only
const StepListBullet = (props: StepListBulletProps) => {
  return (
    <span
      // By default we hide this from screen readers to prevent noise, as the steps are implemented using an ordered list
      aria-hidden
      className="text-green border-gray-light after:bg-gray-light grid h-10 w-10 flex-none place-content-center justify-items-center rounded-full border-2 text-sm font-bold after:absolute after:left-5 after:top-10 after:bottom-0 after:w-0.5 group-last:after:hidden md:h-20 md:w-20 md:text-xl md:after:left-10 md:after:top-20"
      {...props}
    />
  );
};

StepList.Item = StepListItem;
export { StepList };
