import { cx } from '@/utils';

interface StepListProps extends React.ComponentPropsWithoutRef<'ol'> {}

const StepList = (props: StepListProps) => {
  return (
    <ol
      className="z-1 before:bg-gray-light relative my-9 before:absolute before:bottom-5 before:left-5 before:top-5 before:block before:w-[2px] before:content-[''] before:md:left-10"
      {...props}
    />
  );
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
        'relative mb-6 text-sm last:mb-0 last:bg-white md:text-base',
      )}
      {...rest}
    >
      <div className="align-start flex gap-4">
        <StepListBullet>{bullet}</StepListBullet>
        <div>{children}</div>
      </div>
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
      className="text-green grid h-10 w-10 flex-none place-content-center justify-items-center rounded-full border-2 bg-white text-sm font-bold md:h-20 md:w-20 md:text-xl"
      {...props}
    />
  );
};

StepList.Item = StepListItem;
export { StepList };
