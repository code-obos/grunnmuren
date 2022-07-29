import { useContext } from 'react';
import classNames from 'clsx';
import { NavbarContext } from './NavbarContext';
import { useScreenMaxWidthMd } from '../hooks';

export interface NavbarCollapsibleProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarCollapsible = (props: NavbarCollapsibleProps) => {
  const { className, children, ...rest } = props;
  const { collapsibleId, isExpanded } = useContext(NavbarContext);
  const isMobileScreen = useScreenMaxWidthMd();

  return (
    <div
      {...rest}
      aria-hidden={!isExpanded && isMobileScreen}
      className={classNames(
        className,
        '<md:max-h-[0] <md:overflow-hidden transition-all duration-500 ease-in-out md:-mb-8 md:block',
        {
          '<md:max-h-[1000px]': isExpanded,
        },
      )}
      id={collapsibleId}
    >
      {children}
    </div>
  );
};
