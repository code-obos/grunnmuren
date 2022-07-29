import { useState, useMemo, useId } from 'react';
import classNames from 'clsx';
import { NavbarContext } from './NavbarContext';
import { ButtonColorContext } from '..';

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export const Navbar = (props: NavbarProps) => {
  const { className, children, ...rest } = props;

  const collapsibleId = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandedContext = useMemo(
    () => ({ isExpanded, setIsExpanded, collapsibleId }),
    [isExpanded, collapsibleId],
  );

  return (
    <ButtonColorContext.Provider value="white">
      <NavbarContext.Provider value={expandedContext}>
        <div
          className={classNames(className, 'bg-blue py-6 text-white md:py-8')}
          {...rest}
        >
          {children}
        </div>
      </NavbarContext.Provider>
    </ButtonColorContext.Provider>
  );
};
