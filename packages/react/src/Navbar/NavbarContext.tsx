import React, { createContext } from 'react';

export const NavbarContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  collapsibleId: string;
  activeMenu?: string;
  setActiveMenu?: React.Dispatch<React.SetStateAction<string>>;
}>({
  setIsExpanded: () => {
    /* noop */
  },
  isExpanded: false,
  collapsibleId: '',
  activeMenu: '',
  setActiveMenu: () => {
    /* noop */
  },
});
