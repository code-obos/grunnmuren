import { cva, cx } from 'cva';
import { createContext, type RefAttributes, useContext, useEffect } from 'react';
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
} from 'react-aria-components/Tabs';

import { ScrollButton, useHorizontalScroll } from '../utils';

const tabsVariants = cva({
  base: ['grid gap-4'],
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'grid-cols-[auto_1fr]',
    },
  },
});

type TabsVariant = 'primary' | 'secondary';

const TabsVariantContext = createContext<TabsVariant>('secondary');

const tabListVariants = cva({
  base: [
    'group/tablist',
    // Ensure the tab list is scrollable
    'scrollbar-hidden overflow-x-auto',
    'flex w-fit max-w-full',
    // Ensure tabs don't shrink and maintain min-width
    '*:min-w-fit *:shrink-0',
    // Flex direction based on orientation
    'data-[orientation=vertical]:flex-col',
  ],
  variants: {
    variant: {
      primary: 'border-primary-base-default gap-1 rounded-xl border-2 p-1',
      secondary: [
        // Divider line
        'border-neutral-border-subtle',
        'data-[orientation=horizontal]:border-b',
        'data-[orientation=vertical]:border-r',
        // Selection highlight based on orientation
        'data-[orientation=horizontal]:*:border-y-2',
        'data-[orientation=horizontal]:*:data-selected:border-b-primary-base-default',
        'data-[orientation=vertical]:*:border-r-2',
        'data-[orientation=vertical]:*:data-selected:border-r-primary-base-default',
      ],
    },
  },
});

// ScrollButton is sized for the 44px secondary list; `!` because cx doesn't merge its position classes
const primaryScrollButtonClassName = 'inset-y-0.5! h-auto! rounded-lg';

const tabVariants = cva({
  base: [
    'description h-11 cursor-pointer px-4 py-[0.71875rem] font-light',
    // Transition
    'duration-150 ease-out',
    // Hide disabled tabs entirely — the design system avoids disabled states (see https://grunnmuren.obos.no/disabled-state)
    'data-disabled:hidden',
    // Hover with layout shift prevention using pseudo-element
    'after:invisible after:block after:h-0 after:overflow-hidden after:font-medium after:content-[attr(data-text)]',
    'data-hovered:font-medium data-pressed:font-medium data-selected:font-medium',
  ],
  variants: {
    variant: {
      primary: [
        'data-focus-visible:outline-focus-inset rounded-lg',
        // Not transition-colors: animating outline-color makes the focus ring flash dark on the selected tab
        'transition-[color,background-color]',
        'data-selected:bg-primary-base-default data-selected:text-primary-base-contrast-default',
        'data-selected:data-focus-visible:outline-primary-base-contrast-default',
        // Background colours are dropped in forced colors mode, so the selected tab needs a system colour
        'forced-colors:data-selected:bg-[SelectedItem] forced-colors:data-selected:text-[SelectedItemText]',
        'data-hovered:not-data-selected:bg-primary-surface-hover',
      ],
      secondary: [
        'data-focus-visible:outline-focus data-focus-visible:-outline-offset-10',
        'border-transparent transition-colors',
        'data-selected:text-primary-text-default data-pressed:text-primary-text-default',
      ],
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
    /**
     * The visual style of the tabs
     * @default secondary
     */
    variant?: TabsVariant;
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
    variant = 'secondary',
    ...restProps
  } = props;

  return (
    <TabsVariantContext value={variant}>
      <RACTabs
        {...restProps}
        orientation={orientation}
        className={tabsVariants({ className, orientation })}
      >
        {children}
      </RACTabs>
    </TabsVariantContext>
  );
}

// This is not automatically inferred by TypeScript, so we need define it explicitly according to the RAC docs:
// https://react-spectrum.adobe.com/react-aria/Tabs.html#advanced-customization
type _TabListStateContextType = {
  collection: {
    getKeyBefore: (key: string) => string | null;
    getKeyAfter: (key: string) => string | null;
    lastKey: string | null;
    firstKey: string | null;
  };
  selectedKey: string | null;
  selectedItem: { key: null | string } | null;
  setSelectedKey: (key: string | null) => void;
} | null;

/**
 * A container component for Tab components within Tabs.
 */
function TabList({ className, children, ...restProps }: TabListProps) {
  const state = useContext(TabListStateContext) as _TabListStateContextType;
  const variant = useContext(TabsVariantContext);

  const { scrollContainerRef, canScrollLeft, canScrollRight, hasScrollingOccurred } =
    useHorizontalScroll<HTMLDivElement>();

  // Tab-specific navigation logic
  const prevKey = state?.selectedKey && state?.collection.getKeyBefore(state.selectedKey);
  const onPrev = prevKey
    ? () => state?.setSelectedKey(prevKey)
    : () => {
        if (canScrollLeft && state?.selectedKey === state?.collection.firstKey) {
          // Scroll to the start of the tab list if we are at the first tab but it is scrolled out of view
          scrollContainerRef.current?.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      };

  const nextKey = state?.selectedKey && state?.collection.getKeyAfter(state.selectedKey);
  const onNext = nextKey
    ? () => state?.setSelectedKey(nextKey)
    : () => {
        if (canScrollRight && state?.selectedKey === state?.collection.lastKey) {
          // Scroll to the end of the tab list if we are at the last tab but it is scrolled out of view
          scrollContainerRef.current?.scrollTo({
            left: scrollContainerRef.current.scrollWidth,
            behavior: 'smooth',
          });
        }
      };

  // Scroll to the selected tab when the selected key changes
  // We use the state.selectedItem here instead of just the state.selectedKey, since state.selectedItem is set when the tab list is mounted
  // This way we can make sure the default selected tab is scrolled into view.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const selectedKey = state?.selectedItem?.key;
    if (!selectedKey) return;

    // Scroll to the selected tab when it changes
    const selectedTab = container.querySelector(
      `[data-key="${selectedKey}"]`,
    ) as HTMLElement | null;

    if (!selectedTab) return;

    const offsetLeft = selectedTab.offsetLeft;
    const containerWidth = container.clientWidth;
    // Set the scroll position to try and ish center the selected tab
    const scrollLeft = offsetLeft - (containerWidth - selectedTab.clientWidth) / 2;

    // When the scroll is initiated by the user we want a smooth scroll
    if (hasScrollingOccurred) {
      // The RAC TabList component prevents us from using scroll snapping, so by using requestAnimationFrame, we can ensure the scroll position is set correctly.
      // We want the active tab to be centered in the view when navigating with the scroll buttons, selecting a tab with the keyboard, or clicking on a tab.
      requestAnimationFrame(() => {
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      });
    } else {
      // When the scroll is done to ensure the default selected tab is in view, we want instant scrolling
      container.scrollTo({
        left: scrollLeft,
        behavior: 'instant',
      });
    }
  }, [state?.selectedItem, hasScrollingOccurred, scrollContainerRef]);

  return (
    <div className="relative overflow-hidden">
      {/* Scrollable tab container */}
      <RACTabList
        {...restProps}
        ref={scrollContainerRef}
        data-scroll-animation={false}
        className={cx(className, tabListVariants({ variant }))}
        style={{
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        {children}
      </RACTabList>
      <ScrollButton
        direction="left"
        onClick={onPrev}
        isVisible={canScrollLeft}
        hasScrollingOccurred={hasScrollingOccurred}
        className={
          variant === 'primary' ? cx(primaryScrollButtonClassName, 'left-0.5!') : undefined
        }
      />

      <ScrollButton
        direction="right"
        onClick={onNext}
        isVisible={canScrollRight}
        hasScrollingOccurred={hasScrollingOccurred}
        className={
          variant === 'primary' ? cx(primaryScrollButtonClassName, 'right-0.5!') : undefined
        }
      />
    </div>
  );
}

/**
 * An individual tab that can be selected to display its associated content.
 */
function Tab(props: TabProps) {
  const { className, children, ...restProps } = props;
  const variant = useContext(TabsVariantContext);

  return (
    <RACTab
      {...restProps}
      className={cx(className, tabVariants({ variant }))}
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
      shouldForceMount
      className={cx(className, 'data-focus-visible:outline-focus-offset flex-1 data-inert:hidden')}
    >
      {children}
    </RACTabPanel>
  );
}

export {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
};
