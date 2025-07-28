import { cva, cx } from 'cva';
import type { RefAttributes } from 'react';
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

const tabsVariants = cva({
  base: ['flex flex-col gap-4'],
});

export type TabsProps = Omit<RACTabsProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /**
     * CSS classes to apply to the tabs container
     */
    className?: string;
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
  const { className, children, ...restProps } = props;

  return (
    <RACTabs {...restProps} className={tabsVariants({ className })}>
      {children}
    </RACTabs>
  );
}

/**
 * A container component for Tab components within Tabs.
 */
function TabList(props: TabListProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACTabList
      {...restProps}
      className={cx(className, 'flex border-gray-300 border-b outline-hidden')}
    >
      {children}
    </RACTabList>
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
        'relative cursor-pointer px-4 py-2 font-light text-sm outline-hidden transition-all duration-150 ease-out',
        // Focus
        'data-focus-visible:outline-focus-offset',
        // Disabled
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        // Selection
        'data-selected:border-blue-dark data-selected:font-medium data-selected:text-blue-dark',
        // Hover with layout shift prevention using pseudo-element
        'after:invisible after:block after:h-0 after:overflow-hidden after:font-medium after:content-[attr(data-text)]',
        'data-hovered:font-medium',
        // Pressed - prevent layout shift by using inset box-shadow instead of border
        'data-pressed:shadow-[inset_0_-1px_0_0_theme(colors.blue.dark)]',
        // Basic tab styling (horizontal orientation by default)
        '-mb-[1px] rounded-t-md border-transparent border-b-2',
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
