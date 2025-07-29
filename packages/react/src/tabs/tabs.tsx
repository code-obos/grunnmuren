import { cva, cx } from 'cva';
import type { RefAttributes } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Tab as RACTab,
  TabList as RACTabList,
  type TabListProps as RACTabListProps,
  TabPanel as RACTabPanel,
  type TabPanelProps as RACTabPanelProps,
  type TabProps as RACTabProps,
  Tabs as RACTabs,
  type TabsProps as RACTabsProps,
} from 'react-aria-components';
import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';

const tabsVariants = cva({
  base: ['flex gap-4'],
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: '',
    },
  },
});

export type TabsProps = Omit<RACTabsProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tabs container
     */
    className?: string;
    orientation?: 'horizontal' | 'vertical';
  };

export type TabListProps = Omit<RACTabListProps<object>, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tab list
     */
    className?: string;
  };

export type TabProps = Omit<RACTabProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    /**
     * CSS classes to apply to the tab
     */
    className?: string;
  };

export type TabPanelProps = Omit<RACTabPanelProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    /**
     * CSS classes to apply to the tab panel
     */
    className?: string;
  };

/**
 * A container component that organizes content into multiple sections
 * and allows users to navigate between them.
 */
function Tabs(props: TabsProps) {
  const {
    className,
    children,
    orientation = 'horizontal',
    ...restProps
  } = props;

  return (
    <RACTabs
      {...restProps}
      orientation={orientation}
      className={tabsVariants({ className, orientation })}
    >
      {children}
    </RACTabs>
  );
}

/**
 * A container component for Tab components within Tabs.
 */
function TabList(props: TabListProps) {
  const { className, children, ...restProps } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);

    const resizeObserver = new ResizeObserver(checkScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      resizeObserver.disconnect();
    };
  }, [checkScrollButtons]);

  return (
    <div className="relative">
      {/* Scrollable tab container */}
      <div
        ref={scrollContainerRef}
        className={cx(
          'max-w-fit',
          // Hide scrollbar on all browsers
          'scrollbar-hidden overflow-x-auto',
          // Focus outline for accessibility
          'has-data-focus-visible:outline-focus-offset',
          // Add padding when chevrons are visible
          canScrollLeft && 'pl-10',
          canScrollRight && 'pr-10',
        )}
        style={{
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        <RACTabList
          {...restProps}
          className={cx(
            className,
            'flex w-fit border-gray-light',
            // Ensure tabs don't shrink and maintain min-width
            '[&>*]:min-w-fit [&>*]:flex-shrink-0',
            // Flex direction based on orientation
            'data-[orientation=horizontal]:border-b',
            'data-[orientation=horizontal]:*:border-b-2',
            'data-[orientation=horizontal]:*:-mb-[1px]',

            'data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r',
            //'data-[orientation=vertical]:*:data-pressed:shadow-[inset_-1px_0_0_0_theme(colors.blue.dark)]',
            'data-[orientation=vertical]:*:border-r-2',
            'data-[orientation=vertical]:*:-mr-[1px]',
          )}
        >
          {children}
        </RACTabList>
      </div>
      {/* Left scroll button */}
      {canScrollLeft && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          onClick={() => scrollTo('left')}
          className="absolute top-0 -left-4 z-20 flex h-full w-10 items-center justify-center transition-all duration-200 bg-white"
        >
          <ChevronLeft className="h-4 w-4 text-black bg-white" />
        </div>
      )}

      {/* Right scroll button */}
      {canScrollRight && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          onClick={() => scrollTo('right')}
          className="absolute top-0 -right-4 z-20 flex h-full w-10 items-center justify-center transition-all duration-200 bg-white"
        >
          <ChevronRight className="h-4 w-4 text-black bg-white" />
        </div>
      )}
    </div>
  );
}

/**
 * An individual tab that can be selected to display its associated content.
 */
function Tab(props: TabProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACTab
      {...restProps}
      className={cx(
        className,
        'cursor-pointer px-4 py-2 font-light text-sm outline-hidden transition-all duration-150 ease-out',
        // Disabled
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        // Selection
        'data-selected:border-blue-dark data-selected:font-medium data-selected:text-blue-dark',
        // Hover with layout shift prevention using pseudo-element
        'after:invisible after:block after:h-0 after:overflow-hidden after:font-medium after:content-[attr(data-text)]',
        'data-hovered:font-medium',
        // Pressed
        'data-pressed:font-medium data-pressed:text-blue-dark',
        // Basic tab styling (horizontal orientation by default)
        'border-transparent',
      )}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </RACTab>
  );
}

/**
 * The content area that displays the selected tab's content.
 */
function TabPanel(props: TabPanelProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACTabPanel
      {...restProps}
      className={cx(
        className,
        'flex-1 outline-hidden',
        // Focus
        'data-focus-visible:outline-focus-offset',
      )}
    >
      {children}
    </RACTabPanel>
  );
}

export { Tabs, TabList, Tab, TabPanel };
