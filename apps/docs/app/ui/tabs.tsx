import { cx } from 'cva';
import { createContext, useContext } from 'react';
import {
  Tabs as RACTabs,
  TabList as RACTabList,
  Tab as RACTab,
  TabPanel as RACTabPanel,
} from 'react-aria-components';

type TabsProps = {
  children: React.ReactNode;
  className?: string;
};

const Tabs = ({ children, className }: TabsProps) => (
  <RACTabs className={cx(className, '')}>{children}</RACTabs>
);

type TablistProps = {
  children: React.ReactNode;
  className?: string;
};

const TabList = ({ children, className }: TablistProps) => (
  <RACTabList className={cx(className, '')}>{children}</RACTabList>
);

const TabContext = createContext<{ id?: string }>({});

type TabProps = {
  children: React.ReactNode;
  id: string;
};

const Tab = ({ children, id }: TabProps) => (
  <TabContext.Provider value={{ id }}>
    <RACTab>{children}</RACTab>
  </TabContext.Provider>
);

type TabButtonProps = {
  children: React.ReactNode;
};

const TabButton = ({ children }: TabButtonProps) => {
  const { id } = useContext(TabContext);
  return <RACTab id={id}>{children}</RACTab>;
};

type TabPanelProps = {
  children: React.ReactNode;
  className?: string;
};

const TabPanel = ({ children, className }: TabPanelProps) => {
  const { id } = useContext(TabContext);
  <RACTabPanel id={id} className={cx(className, 'tab')}>
    {children}
  </RACTabPanel>;
};

export {
  Tabs,
  Tab,
  TabButton,
  TabPanel,
  type TabsProps,
  type TabProps,
  type TabPanelProps,
};
