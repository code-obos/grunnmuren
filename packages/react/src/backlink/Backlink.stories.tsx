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
    <Backlink href="#" iconStyle="text-green">
      Tillbake
    </Backlink>
  );
};
