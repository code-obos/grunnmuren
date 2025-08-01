import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
import {
  type RefAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Tab as RACTab,
  TabList as RACTabList,
  type TabListProps as RACTabListProps,
  TabPanel as RACTabPanel,
  type TabPanelProps as RACTabPanelProps,
  type TabProps as RACTabProps,
  Tabs as RACTabs,
  type TabsProps as RACTabsProps,
  TabListStateContext,
} from 'react-aria-components';
import { useDebouncedCallback } from 'use-debounce';

const tabsVariants = cva({
  base: ['flex gap-4'],
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: '',
    },
  },
});

type TabsProps = Omit<RACTabsProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tabs container
     */
    className?: string;
    orientation?: 'horizontal' | 'vertical';
  };

type TabListProps = Omit<RACTabListProps<object>, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tab list
     */
    className?: string;
  };

type TabProps = Omit<RACTabProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    /**
     * CSS classes to apply to the tab
     */
    className?: string;
  };

type TabPanelProps = Omit<RACTabPanelProps, 'className'> &
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

// This is not automatically inferred by TypeScript, so we need define it explicitly according to the RAC docs:
// https://react-spectrum.adobe.com/react-aria/Tabs.html#advanced-customization
type _TabListStateContextType = {
  collection: {
    getKeyBefore: (key: string) => string | null;
    getKeyAfter: (key: string) => string | null;
  };
  selectedKey: string;
  setSelectedKey: (key: string | null) => void;
} | null;

/**
 * A container component for Tab components within Tabs.
 */
function TabList(props: TabListProps) {
  const state = useContext(TabListStateContext) as _TabListStateContextType;
  const prevKey = state?.collection.getKeyBefore(state.selectedKey);
  const nextKey = state?.collection.getKeyAfter(state.selectedKey);
  const onPrev = prevKey ? () => state?.setSelectedKey(prevKey) : undefined;
  const onNext = nextKey ? () => state?.setSelectedKey(nextKey) : undefined;

  const { className, children, ...restProps } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollOverflow = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Debounce the scroll handler to avoid performance issues with frequent scroll events
  const scrollHandler = useDebouncedCallback(() => {
    checkScrollOverflow();
  }, 100);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollOverflow();

    container.addEventListener('scroll', scrollHandler);

    const resizeObserver = new ResizeObserver(checkScrollOverflow);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', scrollHandler);
      resizeObserver.disconnect();
    };
  }, [checkScrollOverflow, scrollHandler]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !state?.selectedKey) return;

    // Scroll to the selected tab when it changes
    const selectedTab = container.querySelector(
      `[data-key="${state.selectedKey}"]`,
    ) as HTMLElement | null;

    if (selectedTab) {
      const offsetLeft = selectedTab.offsetLeft;
      const containerWidth = container.clientWidth;
      // Set the scroll position to try and ish center the selected tab
      const scrollLeft =
        offsetLeft - (containerWidth - selectedTab.clientWidth) / 2;

      // The RAC TabList component prevents us from using scroll snapping, so by using requestAnimationFrame, we can ensure the scroll position is set correctly.
      // We want the active tab to be centered in the view when navigating with the scroll buttons, selecting a tab with the keyboard, or clicking on a tab.
      requestAnimationFrame(() => {
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      });
    }
  }, [state?.selectedKey]);

  return (
    <div className="relative overflow-hidden">
      {/* Scrollable tab container */}
      <RACTabList
        {...restProps}
        ref={scrollContainerRef}
        className={cx(
          className,
          'scrollbar-hidden overflow-x-auto',
          'flex w-fit max-w-full',
          // Ensure tabs don't shrink and maintain min-width
          '[&>*]:min-w-fit [&>*]:flex-shrink-0',
          // Divider line
          'border-gray-light',
          'data-[orientation=horizontal]:border-b',
          'data-[orientation=vertical]:border-r',
          // Selection highlight based on orientation
          'data-[orientation=horizontal]:*:border-y-2',
          'data-[orientation=horizontal]:*:data-selected:border-b-blue-dark',
          'data-[orientation=vertical]:*:border-r-2',
          'data-[orientation=vertical]:*:data-selected:border-r-blue-dark',

          // Flex direction based on orientation
          'data-[orientation=vertical]:flex-col',
        )}
        style={{
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        {children}
      </RACTabList>
      {/* Left scroll button */}
      {
        // biome-ignore lint/a11y/useKeyWithClickEvents: These are just for scrolling, and not necessary for keyboard or screen reader users. They can use the tablist's keyboard navigation pattern to navigate the entire list the same way.
        <div
          onClick={onPrev}
          className={cx(
            'flex items-center',
            // Ensure click are of 44px by 44px.
            'size-11',
            // Position the button at the left of the tab list, with a small (left) offset to avoid overlap with the tabs.
            // The bottom offset is to avoid overlap with the tab lists bottom border.
            '-left-3 absolute bottom-0.25',
            // Creates a gradient background that fades to transparent on the right side, which creates a smooth overlay effect over the tabs that are scrolled out of view.
            'bg-[linear-gradient(90deg,white,white_calc(100%-10px),transparent)]',
            // Slide in and out based on scroll position, match duration with the debounce delay of the scrollHandler function
            'duration-100 ease-in motion-safe:transition-transform',
            !canScrollLeft && '-translate-x-full pointer-events-none',
          )}
        >
          <ChevronLeft className="mt-0.25 h-6 w-full text-black" />
        </div>
      }

      {/* Right scroll button */}
      {
        // biome-ignore lint/a11y/useKeyWithClickEvents: These are just for scrolling, and not necessary for keyboard or screen reader users. They can use the tablist's keyboard navigation pattern to navigate the entire list the same way.
        <div
          onClick={onNext}
          className={cx(
            'flex items-center',
            // Ensure click are of 44px by 44px.
            'size-11',
            // Position the button at the right of the tab list, with a small (right) offset to avoid overlap with the tabs.
            // The bottom offset is to avoid overlap with the tab lists bottom border.
            '-right-3 absolute bottom-0.25',
            // Creates a gradient background that fades to transparent on the left side, which creates a smooth overlay effect over the tabs that are scrolled out of view.
            'bg-[linear-gradient(90deg,transparent,white_calc(10px),white)]',
            // Slide in and out based on scroll position, match duration with the debounce delay of the scrollHandler function
            'duration-100 ease-in motion-safe:transition-transform',
            !canScrollRight && 'pointer-events-none translate-x-full',
          )}
        >
          <ChevronRight className="mt-0.25 h-6 w-full text-black " />
        </div>
      }
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
        'data-focus-visible:-outline-offset-10 data-focus-visible:outline-2 data-focus-visible:outline-black',
        'cursor-pointer border-transparent px-4 py-2 font-light text-sm',
        // Transition
        'transition-colors duration-150 ease-out',
        // TODO: Should disabled tabs just be hidden?
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        // Selection
        'data-selected:font-medium data-selected:text-blue-dark',
        // Hover with layout shift prevention using pseudo-element
        'after:invisible after:block after:h-0 after:overflow-hidden after:font-medium after:content-[attr(data-text)]',
        'data-hovered:font-medium',
        // Pressed
        'data-pressed:font-medium data-pressed:text-blue-dark',
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
        'flex-1 data-focus-visible:outline-focus-offset',
      )}
    >
      {children}
    </RACTabPanel>
  );
}

export {
  Tab as UNSAFE_Tab,
  TabList as UNSAFE_TabList,
  TabPanel as UNSAFE_TabPanel,
  Tabs as UNSAFE_Tabs,
  type TabListProps as UNSAFE_TabListProps,
  type TabPanelProps as UNSAFE_TabPanelProps,
  type TabProps as UNSAFE_TabProps,
  type TabsProps as UNSAFE_TabsProps,
};
