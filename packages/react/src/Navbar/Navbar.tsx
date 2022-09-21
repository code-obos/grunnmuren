import { useState, useMemo, useId } from 'react';
import { cx } from '@/utils';
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
          className={cx(className, 'bg-blue py-6 text-white md:py-8')}
          {...rest}
        >
          <div className="container">{children}</div>
        </div>
      </NavbarContext.Provider>
    </ButtonColorContext.Provider>
  );
};
