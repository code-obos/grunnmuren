import { forwardRef } from 'react';
import classNames from 'clsx';

export interface NavbarItemProps extends React.ComponentPropsWithoutRef<'a'> {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  (props, ref) => {
    const { active, className, children, ...rest } = props;

    return (
      <a
        aria-current={active ? 'page' : undefined}
        className={classNames(
          className,
          'border-b border-[#0156E0] py-3 no-underline md:border-b-2 md:border-transparent md:py-2 md:hover:border-white',
          {
            'fake-font-bold md:bg-blue-dark md:-mx-3 md:rounded-t-lg md:px-3':
              active,
          },
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
