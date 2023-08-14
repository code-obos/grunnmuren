import { forwardRef } from 'react';
import { cx } from '@/utils';

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
        className={cx(
          className,
          'border-b border-[#0156E0] py-3 no-underline md:border-b-2 md:border-transparent md:py-2 md:hover:border-white',
          {
            'md:bg-blue-dark font-bold md:-mx-3 md:rounded-t-lg md:px-3':
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