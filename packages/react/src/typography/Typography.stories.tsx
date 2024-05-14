import type { Meta, StoryObj } from '@storybook/react';

import { Body, H1, H2, H3, H4, H5, H6, HeadingProps } from '.';

const Template = (args: HeadingProps) => {
  return (
    <>
      <H1 {...args}>Grunnmuren</H1>
      <Body>Grunnmuren er designsystemet til OBOS.</Body>
      <H2 {...args}>Typografi</H2>
      <Body>
        Typografi defineres av både tailwind-klasser og react-komponenter.
      </Body>
    </>
  );
};

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

const BodyTemplate = () => {
  return (
    <>
      <Body>
        Mange opplever at prisvekst og rentehevinger har fått store konsekvenser
        for økonomien. Førstegangskjøpere og de som tjener mindre, sliter med å
        komme seg inn på boligmarkedet.
      </Body>
      <Body>
        – Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt,
        forteller boligkjøper Brita (30).
      </Body>
    </>
  );
};

const meta: Meta = {
  title: 'Typography',
};

export default meta;

const defaultProps = {} as const;

export const Default: StoryObj = {
  render: Template,
  args: defaultProps,
};

export const Headings: StoryObj = {
  render: HeadingsTemplate,
  args: defaultProps,
};

export const Bodies: StoryObj = {
  render: BodyTemplate,
  args: defaultProps,
};
