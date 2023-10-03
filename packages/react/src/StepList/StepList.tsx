import { Children, cloneElement, isValidElement } from 'react';
import { cx } from '@/utils';

type Alignment = 'center' | 'top';

export interface StepListProps extends React.ComponentPropsWithoutRef<'ol'> {
  /**
   * Determines the vertical alignment of the bullets
   * @default 'center'
   */
  align?: Alignment;
  /**
   * <StepList> items
   */
  children: React.ReactNode;
}

const StepList = (props: StepListProps) => {
  const { align = 'center', children, className, ...rest } = props;

  return (
    <ol className={cx(className, 'flex flex-col gap-8 md:gap-12')} {...rest}>
      {Children.map(children, (child) => {
        // Need isValidElement check to prevent cloning of conditional renders such as
        // {someCondition && <StepList.Item ... />}
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<StepListItemProps>, {
            align,
          });
        }
      })}
    </ol>
  );
};

export interface StepListItemProps
  extends React.ComponentPropsWithoutRef<'li'> {
  /** Content for the StepListItem's bullet */
  bullet: React.ReactNode;
  /** @private this is set by the parent StepList component */
  align?: Alignment;
}

export const StepListItem = (props: StepListItemProps) => {
  const { className, children, bullet, align = 'center', ...rest } = props;

  return (
    <li
      className={cx(
        className,
        'group relative flex gap-4 text-sm md:gap-8 md:text-base',
        { 'items-center': align === 'center' },
      )}
      {...rest}
    >
      <StepListBullet align={align}>{bullet}</StepListBullet>
      {children}
    </li>
  );
};

interface StepListBulletProps extends React.ComponentPropsWithoutRef<'span'> {
  align: Alignment;
}

// Don't export this, as it is for internal use by StepListItem only
const StepListBullet = ({ align, ...props }: StepListBulletProps) => {
  return (
    <span
      // By default we hide this from screen readers to prevent noise, as the steps are implemented using an ordered list
      aria-hidden
      className={cx(
        'text-green after:bg-gray-light before:bg-gray-light grid h-10 w-10 flex-none place-content-center justify-items-center rounded-full border-2 text-sm font-bold after:absolute after:bottom-0 after:w-0.5 after:translate-x-1/2 group-last:after:hidden md:h-20 md:w-20 md:text-xl',
        {
          'before:absolute before:bottom-1/2 before:top-0 before:w-0.5 before:-translate-y-5 before:translate-x-1/2 after:top-1/2 after:translate-y-5 group-first:before:hidden before:md:-translate-y-10 after:md:translate-y-10':
            align === 'center',
          'after:-bottom-8 after:top-10 after:md:-bottom-12 after:md:top-20':
            align === 'top',
        },
      )}
      {...props}
    />
  );
};

StepList.Item = StepListItem;
export { StepList };
