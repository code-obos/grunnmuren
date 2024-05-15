import type { Meta, StoryObj } from '@storybook/react';

import { Body, H1, H2, H3, H4, H5, H6, Lead } from '.';

const Template = () => {
  return (
    <>
      <H1>Grunnmuren</H1>
      <Lead>Grunnmuren er designsystemet til OBOS.</Lead>
      <H2>Typografi</H2>
      <Body>
        Typografi defineres av både tailwind-klasser og react-komponenter.
      </Body>
    </>
  );
};

const HeadingsTemplate = () => {
  return (
    <>
      <H1>Overskrift nivå 1</H1>
      <H2>Overskrift nivå 2</H2>
      <H3>Overskrift nivå 3</H3>
      <H4>Overskrift nivå 4</H4>
      <H5>Overskrift nivå 5</H5>
      <H6>Overskrift nivå 6</H6>
    </>
  );
};

const LeadTemplate = () => (
  <Lead>
    Dokumentavgift er en avgift som du må betale til staten når du kjøper en
    fast eiendom.
  </Lead>
);

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

export const Leads: StoryObj = {
  render: LeadTemplate,
  args: defaultProps,
};

export const Bodies: StoryObj = {
  render: BodyTemplate,
  args: defaultProps,
};
