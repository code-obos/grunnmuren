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
import classNames from 'clsx';
import { Key, Close } from '@obosbbl/grunnmuren-icons';

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

const subItems = [
  <NavbarItem href="#" key="medlemsfordeler">
    Medlemsfordeler
  </NavbarItem>,
  <NavbarItem href="#" key="forkjopsrett">
    Forkjøpsrett
  </NavbarItem>,
];

const BliMedlemButton = () => (
  <div className="container gap-8 self-end">
    <Button variant="secondary">Bli medlem</Button>
  </div>
);

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
              className="<md:w-[100px]"
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

export const WithSubnav = () => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [activeLogin, setActiveLogin] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent, itemIndex: number) => {
    event.preventDefault();
    setActiveIndex(itemIndex);
  };

  const LoginMenuItem = () => (
    <Button
      variant="secondary"
      color="white"
      className={classNames(
        'prose <md:flex <md:items-center w-full rounded-3xl border-[1px] border-transparent px-0 font-normal transition-[transform] duration-[400] ease-in-out hover:rounded-3xl hover:border-[1px] hover:border-white/20 hover:after:bg-transparent md:my-4 md:translate-y-10 md:py-2 md:px-6',
        {
          'md:translate-y-0': activeLogin,
        },
      )}
      href="/"
      tabIndex={activeLogin ? 0 : -1}
    >
      <Key className="mr-2 inline md:hidden" />
      <span className="md:underline">Dette er en tekst</span>
      <p className="<md:hidden pb-4">Dette er en description</p>
    </Button>
  );

  return (
    <Navbar>
      <NavbarContent
        logo={
          <a href="#" aria-label="Til startsiden for OBOS">
            <img
              className="<md:w-[100px]"
              src="/obos_liggende_hus_hvit.svg"
              width="173"
              height="41"
            />
          </a>
        }
      >
        <div className="col-start-2 col-end-3 hidden md:flex md:flex-row md:justify-self-end">
          <Button
            variant="secondary"
            onClick={() => setActiveLogin((prev) => !prev)}
            className={classNames(
              '<md:hidden flex items-center gap-2 whitespace-nowrap border-0',
              {
                'bg-blue-dark': activeLogin,
              },
            )}
            aria-expanded={activeLogin}
          >
            {activeLogin && <Close className="text-sm" />}
            {activeLogin ? 'Lukk' : 'Logg inn'}
            <span className={activeLogin ? 'login' : ''}></span>
          </Button>
          <BliMedlemButton />
        </div>

        <div
          className={classNames(
            '<md:hidden col-start-1 col-end-3 grid max-h-[0] overflow-hidden transition-all duration-200 ease-in-out',
            {
              'max-h-[1000px]': activeLogin,
            },
          )}
          aria-hidden={!activeLogin}
        >
          <div className="bg-blue-dark container mt-2 grid grow grid-cols-3 gap-2 rounded-3xl">
            <LoginMenuItem />
          </div>
        </div>
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
        <div className="bg-blue-dark <md:hidden -mb-14">
          <NavbarItems className="mt-0">{subItems}</NavbarItems>
        </div>
        <NavbarExpandedMobileContent>
          <ul className="container relative my-8 overflow-hidden">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-[#0156E0] no-underline"
              >
                <a href="#" className="grow py-3 no-underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid gap-8">
            <BliMedlemButton />
            <div className="container md:hidden">
              <LoginMenuItem />
            </div>
          </div>
        </NavbarExpandedMobileContent>
      </NavbarCollapsible>
    </Navbar>
  );
};
