import type { Meta } from '@storybook/react';

import * as icons from '@obosbbl/grunnmuren-icons-react';

const meta: Meta = {
  title: 'Icons',
};

export default meta;

export const Icons = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_100px)] content-center justify-center gap-6">
      {Object.entries(icons).map(([iconName, Icon]) => (
        <div key={iconName}>
          <Icon className="mx-auto mb-2" />
          <span className="block text-center text-sm">{iconName}</span>
        </div>
      ))}
    </div>
  );
};
