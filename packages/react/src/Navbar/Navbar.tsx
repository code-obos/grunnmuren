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
        <header
          className={cx(
            className,
            'bg-blue relative pb-6 text-white before:absolute before:-bottom-px before:left-0 before:right-0 before:z-10 before:h-[calc(1.5rem_+_1px)] before:rounded-t-3xl before:bg-white md:overflow-x-hidden',
          )}
          {...rest}
        >
          <div className="container">{children}</div>
        </header>
      </NavbarContext.Provider>
    </ButtonColorContext.Provider>
  );
};
