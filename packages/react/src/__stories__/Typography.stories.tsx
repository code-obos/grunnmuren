import type { Meta, StoryObj } from '@storybook/react';

const Template = () => {
  return (
    <>
      <h1 className="h1">Grunnmuren</h1>
      <p className="lead">Grunnmuren er designsystemet til OBOS.</p>
      <h2 className="h2">Typografi</h2>
      <p className="body">
        Typografi defineres av både tailwind-klasser og react-komponenter.
      </p>
      <blockquote className="grid-cols-[32px_1fr] grid-rows-2 gap-x-[22px]">
        Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt
      </blockquote>
    </>
  );
};

const HeadingsTemplate = () => {
  return (
    <>
      <h1 className="h1">Overskrift nivå 1</h1>
      <h2 className="h2">Overskrift nivå 2</h2>
      <h3 className="h3">Overskrift nivå 3</h3>
      <h4 className="h4">Overskrift nivå 4</h4>
      <h5 className="h5">Overskrift nivå 5</h5>
      <h6 className="h6">Overskrift nivå 6</h6>
    </>
  );
};

const LeadTemplate = () => (
  <p className="lead">
    Dokumentavgift er en avgift som du må betale til staten når du kjøper en
    fast eiendom.
  </p>
);

const BodyTemplate = () => {
  return (
    <>
      <p className="body">
        Mange opplever at prisvekst og rentehevinger har fått store konsekvenser
        for økonomien. Førstegangskjøpere og de som tjener mindre, sliter med å
        komme seg inn på boligmarkedet.
      </p>
      <p className="body">
        – Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt,
        forteller boligkjøper Brita (30).
      </p>
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
