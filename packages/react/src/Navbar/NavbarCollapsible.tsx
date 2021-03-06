import { useContext } from 'react';
import classNames from 'clsx';
import { NavbarContext } from './NavbarContext';

export interface NavbarCollapsibleProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarCollapsible = (props: NavbarCollapsibleProps) => {
  const { className, children, ...rest } = props;
  const { collapsibleId, isExpanded } = useContext(NavbarContext);

  return (
    <div
      {...rest}
      aria-hidden={!isExpanded}
      className={classNames(className, 'md:-mb-8 md:block', {
        hidden: !isExpanded,
      })}
      id={collapsibleId}
    >
      {children}
    </div>
  );
};
