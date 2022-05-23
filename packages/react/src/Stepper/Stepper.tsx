import classNames from 'clsx';
interface StepperProps extends React.ComponentPropsWithoutRef<'ol'> {}

export const Stepper = (props: StepperProps) => {
  return <ol {...props} />;
};

interface StepProps extends React.ComponentPropsWithoutRef<'li'> {
  /** Content for the Step item's bullet */
  bullet: React.ReactNode;
}

export const Step = (props: StepProps) => {
  const { className, children, bullet, ...rest } = props;

  return (
    <li
      className={classNames(
        className,
        'group relative flex gap-4 pb-8 text-sm last:pb-0 md:gap-8 md:pb-12 md:text-base',
      )}
      {...rest}
    >
      <StepBullet>{bullet}</StepBullet>
      {children}
    </li>
  );
};

interface StepBulletProps extends React.ComponentPropsWithoutRef<'span'> {}

export const StepBullet = (props: StepBulletProps) => {
  const { className, ...rest } = props;
  return (
    <span
      // By default we hide this from screen readers to prevent noise, as the steps are implemented using an ordered list
      aria-hidden
      className={classNames(
        className,
        'text-green border-gray-light after:bg-gray-light grid h-10 w-10 flex-none place-content-center rounded-full border-2 text-sm font-bold after:absolute after:left-5 after:top-10 after:bottom-0 after:w-0.5 group-last:after:hidden md:h-20 md:w-20 md:text-xl md:after:left-10 md:after:top-20',
      )}
      {...rest}
    />
  );
};
