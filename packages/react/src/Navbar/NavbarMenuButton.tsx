import { useContext } from 'react';
import { MenuAlt, Close } from '@obosbbl/grunnmuren-icons';
import { NavbarContext } from './NavbarContext';

/**
 * TODO: Add support for setting custom button text (eg for obos.se)
 */
export const NavbarMenuButton = () => {
  const { isExpanded, setIsExpanded, collapsibleId } =
    useContext(NavbarContext);

  let Icon = MenuAlt;
  let buttonText = 'Meny';

  if (isExpanded) {
    Icon = Close;
    buttonText = 'Lukk';
  }

  return (
    <button
      aria-controls={collapsibleId}
      aria-expanded={isExpanded}
      className="inline-flex items-center gap-2 md:hidden"
      onClick={() => setIsExpanded((val) => !val)}
    >
      {buttonText} <Icon />
    </button>
  );
};
