import type { Meta } from '@storybook/react';

export const Default = () => {
  return (
    <>
      <h1 className="h1">Grunnmuren</h1>
      <p className="lead">Grunnmuren er designsystemet til OBOS.</p>
      <h2 className="h2">Typografi</h2>
      <p className="body">Typografi defineres av tailwind-klasser.</p>
      <blockquote className="blockquote">
        Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt
      </blockquote>
    </>
  );
};

export const Headings = () => {
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

export const Lead = () => (
  <p className="lead">
    Dokumentavgift er en avgift som du må betale til staten når du kjøper en
    fast eiendom.
  </p>
);

export const Body = () => {
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

export const Blockquote = () => (
  <blockquote className="blockquote">
    Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo, virket
    det nesten umulig å komme inn på markedet. Jeg var på noen visninger, men
    det ble enten for lite eller for gammelt og slitt
  </blockquote>
);

const meta: Meta = {
  title: 'Typography',
};

export default meta;
