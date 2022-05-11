import classNames from 'clsx';

export interface SnackbarButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className?: string;
}

export const SnackbarButton = (props: SnackbarButtonProps) => (
  <button
    className={classNames(
      props.className,
      'focus-visible:ring-offset flex-shrink-0 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
    )}
    {...props}
  >
    {props.children}
  </button>
);
