import { useContext } from 'react';
import { NavbarContext } from './NavbarContext';
import { useScreenMaxWidthMd } from '@/hooks';

export interface NavbarExpandedMobileContentProps {
  children: React.ReactNode;
}

/**
 * Helper component that only renders when the navbar is expanded and on a small screen
 * Simplifies having a totally different navbar layout than on desktop
 */
export const NavbarExpandedMobileContent = (
  props: NavbarExpandedMobileContentProps,
) => {
  const { isExpanded } = useContext(NavbarContext);
  const isMobileScreen = useScreenMaxWidthMd();

  if (!isExpanded || !isMobileScreen) return null;

  return <>{props.children}</>;
};
