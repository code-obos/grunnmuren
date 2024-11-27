import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '@obosbbl/grunnmuren-react';
import { Link } from '@tanstack/react-router';
import { Button, Disclosure, DisclosurePanel } from 'react-aria-components';

export const MainNav = () => (
  <nav
    className="h-fit w-72 max-w-full bg-sky-lightest px-5 py-9"
    aria-label="Navigasjonsmeny for grunnmuren"
  >
    <ul>
      <li>
        <Disclosure>
          <Heading level={2}>
            <Button
              slot="trigger"
              className="group flex w-full cursor-pointer place-items-center justify-between rounded-md p-3 focus-visible:outline-focus-inset data-[focus-visible]:outline-focus [&:not([data-focus-visible])]:outline-none"
            >
              Komponenter
              <ChevronDown className="flex-none transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none" />
            </Button>
          </Heading>
          <DisclosurePanel>
            <ul className="grid gap-y-3.5 px-3">
              <li>
                <Link
                  to="/ikoner"
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 focus-visible:outline-focus focus-visible:outline-focus-inset data-[status=active]:font-bold data-[status=active]:no-underline"
                >
                  Ikoner
                </Link>
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>
      </li>
    </ul>
  </nav>
);
