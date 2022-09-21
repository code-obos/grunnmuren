import { useContext } from 'react';
import { cx } from '@/utils';
import { NavbarContext } from './NavbarContext';

export interface NavbarItemsProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarItems = (props: NavbarItemsProps) => {
  const { className, children, ...rest } = props;

  const { isExpanded } = useContext(NavbarContext);

  return (
    <nav
      className={cx(
        className,
        'my-8 flex flex-col md:mb-0 md:flex md:flex-row md:flex-wrap md:gap-x-8',
        {
          hidden: !isExpanded,
        },
      )}
      {...rest}
    >
      {children}
    </nav>
  );
};
