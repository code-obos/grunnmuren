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
