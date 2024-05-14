import type { Meta, StoryObj } from '@storybook/react';

import { H1, H2, H3, H4, H5, H6, HeadingProps } from '.';

const HeadingsTemplate = (args: HeadingProps) => {
  return (
    <>
      <H1 {...args}>Overskrift nivå 1</H1>
      <H2 {...args}>Overskrift nivå 2</H2>
      <H3 {...args}>Overskrift nivå 3</H3>
      <H4 {...args}>Overskrift nivå 4</H4>
      <H5 {...args}>Overskrift nivå 5</H5>
      <H6 {...args}>Overskrift nivå 6</H6>
    </>
  );
};

const meta: Meta = {
  title: 'Typography',
};

export default meta;

const defaultProps = {} as const;

export const Headings: StoryObj = {
  render: HeadingsTemplate,
  args: defaultProps,
};
