import { createContext } from 'react';
import { noop } from '@/utils';

export const NavbarContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  collapsibleId: string;
}>({
  setIsExpanded: noop,
  isExpanded: false,
  collapsibleId: '',
});
