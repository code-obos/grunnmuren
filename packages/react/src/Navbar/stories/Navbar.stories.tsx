import { useState } from 'react';
import { Button } from '../../';
import {
  Navbar,
  NavbarItems,
  NavbarCollapsible,
  NavbarItem,
  NavbarContent,
  NavbarExpandedMobileContent,
} from '../';

export default {
  title: 'Navbar',
};

const navItems = [
  'Forsiden',
  'Ny bolig',
  'Brukt bolig',
  'Medlem',
  'Bank',
  'Forsikring',
  'Samfunnsansvar',
  'Dette er OBOS',
];

const BliMedlemButton = () => <Button variant="secondary">Bli medlem</Button>;

export const Default = () => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const handleClick = (event: React.MouseEvent, itemIndex: number) => {
    event.preventDefault();
    setActiveIndex(itemIndex);
  };

  return (
    <Navbar>
      <NavbarContent
        logo={
          <a href="#" aria-label="Til startsiden for OBOS">
            <img
              className="max-md:w-[100px]"
              src="/obos_liggende_hus_hvit.svg"
              width="173"
              height="41"
            />
          </a>
        }
      >
        <BliMedlemButton />
      </NavbarContent>
      <NavbarCollapsible>
        <NavbarItems>
          {navItems.map((item, index) => (
            <NavbarItem
              active={index === activeIndex}
              key={index}
              onClick={(e) => handleClick(e, index)}
              href="#"
            >
              {item}
            </NavbarItem>
          ))}
        </NavbarItems>
        <NavbarExpandedMobileContent>
          <BliMedlemButton />
        </NavbarExpandedMobileContent>
      </NavbarCollapsible>
    </Navbar>
  );
};
