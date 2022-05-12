import { createContext } from 'react';

export const NavbarContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  collapsibleId: string;
}>({
  setIsExpanded: () => {
    /* noop */
  },
  isExpanded: false,
  collapsibleId: '',
});
