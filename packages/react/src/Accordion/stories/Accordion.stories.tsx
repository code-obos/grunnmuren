import { useState } from 'react';
import { Accordion } from '..';

export default {
  title: 'Accordion',
};

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Accordion.Item open={isOpen} onChange={(val) => setIsOpen(val)}>
      <Accordion.Header onClick={() => setIsOpen((val) => !val)}>
        Section title
      </Accordion.Header>
      <Accordion.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>
  );
};

export const Uncontrolled = () => {
  return (
    <Accordion.Item defaultOpen={true}>
      <Accordion.Header>Section title</Accordion.Header>
      <Accordion.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>
  );
};
