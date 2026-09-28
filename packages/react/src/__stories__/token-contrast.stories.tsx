import type { Meta } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

// The same minimums as packages/tailwind/tests/contrast.test.ts
const TEXT_MINIMUM = 4.5;
const FILL_MINIMUM = 3;

const RGB = /rgba?\((\d+),\s*(\d+),\s*(\d+)/;
const WHITE = 'rgb(255, 255, 255)';

const toLinear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const luminance = (color: string) => {
  const match = color.match(RGB);
  if (!match) return 1;
  const [, red, green, blue] = match.map(Number);
  return 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);
};

const contrast = (first: string, second: string) => {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

// Read from computed styles rather than hardcoded, so the numbers follow the tokens
// when the design team changes a value.
const useComputedContrast = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<{ text: number; fill: number; border?: number }>();

  useEffect(() => {
    if (!ref.current) return;
    const { color, backgroundColor, borderTopColor, borderTopWidth } = getComputedStyle(
      ref.current,
    );
    setRatios({
      text: contrast(color, backgroundColor),
      fill: contrast(backgroundColor, WHITE),
      // With a border it's the border that separates the button from the page, not the fill
      border: Number.parseFloat(borderTopWidth) > 0 ? contrast(borderTopColor, WHITE) : undefined,
    });
  }, []);

  return [ref, ratios] as const;
};

const Ratio = ({ label, value, minimum }: { label: string; value?: number; minimum: number }) => {
  if (value == null) return null;
  const passes = value >= minimum;

  return (
    <div className="flex items-baseline justify-between gap-3">
      <span>{label}</span>
      <span className={passes ? 'text-success-text-default' : 'text-danger-text-default'}>
        <strong>{value.toFixed(2)}:1</strong> {passes ? 'ok' : `under ${minimum}:1`}
      </span>
    </div>
  );
};

type SwatchProps = {
  title: string;
  className: string;
  tokens: string;
};

const Swatch = ({ title, className, tokens }: SwatchProps) => {
  const [ref, ratios] = useComputedContrast();

  return (
    <div className="grid gap-3">
      <div
        ref={ref}
        className={`flex min-h-12 items-center justify-center rounded-lg px-5 font-medium ${className}`}
      >
        Tekst i knappen
      </div>
      <div className="description grid gap-1">
        <strong>{title}</strong>
        <code className="text-gray-dark">{tokens}</code>
        <Ratio label="Tekst mot fyll" value={ratios?.text} minimum={TEXT_MINIMUM} />
        {ratios?.border == null ? (
          <Ratio label="Fyll mot siden" value={ratios?.fill} minimum={FILL_MINIMUM} />
        ) : (
          <Ratio label="Kant mot siden" value={ratios.border} minimum={FILL_MINIMUM} />
        )}
      </div>
    </div>
  );
};

export const WarningButtonToday = () => (
  <div className="grid gap-8">
    <div className="grid gap-2">
      <h1 className="heading-m">Warning-knappen med dagens tokens</h1>
      <p className="paragraph max-w-prose">
        De tre tilstandene til en solid warning-knapp, rett fra <code>warning-base-*</code>. Tallene
        regnes ut i nettleseren, så de følger tokenene hvis verdiene endres.
      </p>
    </div>
    <div className="grid gap-8 sm:grid-cols-3">
      <Swatch
        title="Hvile"
        className="bg-warning-base-default text-warning-base-contrast-default"
        tokens="base-default"
      />
      <Swatch
        title="Hover"
        className="bg-warning-base-hover text-warning-base-contrast-default"
        tokens="base-hover"
      />
      <Swatch
        title="Trykket"
        className="bg-warning-base-active text-warning-base-contrast-default"
        tokens="base-active"
      />
    </div>
    <div className="grid gap-2">
      <h2 className="heading-s">Prøv selv</h2>
      <button
        type="button"
        className="bg-warning-base-default text-warning-base-contrast-default hover:bg-warning-base-hover active:bg-warning-base-active min-h-11 w-fit cursor-pointer rounded-lg px-5 font-medium"
      >
        Hold inne for å se trykket tilstand
      </button>
    </div>
  </div>
);

type OrangeRow = { name: string; className: string };

const ORANGES: Array<OrangeRow> = [
  { name: 'orange-500', className: 'bg-(--gm-orange-500)' },
  { name: 'orange-600', className: 'bg-(--gm-orange-600)' },
  { name: 'orange-700', className: 'bg-(--gm-orange-700)' },
];

const OrangeSample = ({ name, className }: OrangeRow) => {
  const [coalRef, coal] = useComputedContrast();
  const [whiteRef, white] = useComputedContrast();

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div
          ref={coalRef}
          className={`flex min-h-12 items-center justify-center rounded-lg text-(--gm-gray-900) ${className}`}
        >
          Coal
        </div>
        <div
          ref={whiteRef}
          className={`flex min-h-12 items-center justify-center rounded-lg text-white ${className}`}
        >
          Hvit
        </div>
      </div>
      <div className="description grid gap-1">
        <strong>{name}</strong>
        <Ratio label="Coal-tekst" value={coal?.text} minimum={TEXT_MINIMUM} />
        <Ratio label="Hvit tekst" value={white?.text} minimum={TEXT_MINIMUM} />
        <Ratio label="Mot hvit side" value={coal?.fill} minimum={FILL_MINIMUM} />
      </div>
    </div>
  );
};

export const EveryOrangeInThePalette = () => (
  <div className="grid gap-8">
    <div className="grid gap-2">
      <h1 className="heading-m">Ingen oransje funker til alt</h1>
      <p className="paragraph max-w-prose">
        En solid knapp trenger både lesbar tekst (4,5:1) og et fyll som skiller seg fra siden (3:1).
        Lys oransje gir god tekst, men forsvinner mot hvitt. Mørk oransje synes, men da blir teksten
        for svak. Ingen av de tre oransjene i paletten klarer begge.
      </p>
    </div>
    <div className="grid gap-8 sm:grid-cols-3">
      {ORANGES.map((orange) => (
        <OrangeSample key={orange.name} {...orange} />
      ))}
    </div>
  </div>
);

export const PossibleDirections = () => (
  <div className="grid gap-8">
    <div className="grid gap-2">
      <h1 className="heading-m">Mulige retninger</h1>
      <p className="paragraph max-w-prose">
        Retninger med verdiene vi allerede har, ikke forslag til nye verdier. Det er designerens
        avgjørelse.
      </p>
    </div>
    <div className="grid gap-8 sm:grid-cols-3">
      <Swatch
        title="1. Lys fyll og kant"
        className="bg-warning-base-default text-warning-base-contrast-default border-2 border-(--gm-orange-700)"
        tokens="base-default + kant i orange-700"
      />
      <Swatch
        title="2. Flate og kant, som Alertbox"
        className="bg-warning-surface-tinted text-warning-text-default border-warning-border-default border-2"
        tokens="surface-tinted + border-default"
      />
      <div className="grid content-start gap-3">
        <div className="border-gray text-gray-dark flex min-h-12 items-center justify-center rounded-lg border-2 border-dashed px-5 font-medium">
          Ny primitiv
        </div>
        <div className="description grid gap-1">
          <strong>3. Mørkere oransje med hvit tekst</strong>
          <span>
            Krever en ny primitiv. Hvit tekst er for svak på alle tre oransjene i dag, se forrige
            story.
          </span>
        </div>
      </div>
    </div>
    <p className="description max-w-prose">
      Kanten i retning 1 står for kontrasten mot siden (3,69:1), og fyllet kan da være lyst. Den
      løser ikke trykket tilstand: den mørkner fortsatt til <code>orange-700</code>. Retning 2
      krever ingen solid knapp i det hele tatt, og kanten i kortet måles som grafikk (3:1).
    </p>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Warning-kontrast',
  // Documentation for the contrast review, not a component. The values themselves are
  // covered by contrast.test.ts, so a screenshot per story would only add baselines.
  tags: ['!test'],
};

export default meta;
