import type { Meta } from '@storybook/react';

import { Backlink } from '.';

const meta: Meta<typeof Backlink> = {
  title: 'Backlink',
  component: Backlink,
};

export default meta;

export const Default = () => {
  return <Backlink href="#">Tillbake</Backlink>;
};

export const WithCustomIcon = () => {
  return (
    <Backlink href="#" className="text-green">
      Tillbake
    </Backlink>
  );
};

export const NoUnderline = () => {
  return (
    <Backlink href="#" className="no-underline">
      Tillbake
    </Backlink>
  );
};
