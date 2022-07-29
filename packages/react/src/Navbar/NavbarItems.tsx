import { useContext } from 'react';
import classNames from 'clsx';
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
      className={classNames(
        className,
        '<md:hidden container my-8 grid md:mb-0 md:flex md:flex-wrap md:gap-x-8',
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
