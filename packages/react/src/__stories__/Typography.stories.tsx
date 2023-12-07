import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Typography',
};

export default meta;

export const Icons = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="h1">This is a H1 heading</h1>
      <h2 className="h2">This is a H2 heading</h2>
      <h3 className="h3">This is a H3 heading</h3>
      <h4 className="h4">This is a H4 heading</h4>
    </div>
  );
};
