import { Button, TextField } from '@obosbbl/grunnmuren-react';
import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from 'react';

/**
 * A length as `--spacing` times the step, the same thing `p-4` or `gap-4` compiles to. Written
 * as a style rather than a class, since Tailwind can't see a class put together from a number.
 */
const steps = (step: number) => `calc(var(--spacing) * ${step})`;

/** What an element measures right now in px, kept up to date as the theme changes it */
const useMeasured = (dimension: 'width' | 'height') => {
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState<number>();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setPx(
          Math.round(
            entry.borderBoxSize[0]?.[dimension === 'width' ? 'inlineSize' : 'blockSize'] ?? 0,
          ),
        );
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [dimension]);

  return [ref, px] as const;
};

/** `gap-6 · 24 px`, the class and what it comes to under the theme */
const MarkerLabel = ({ utility, px }: { utility: string; px?: number }) => (
  <span className="description text-danger-text-default font-mono whitespace-nowrap">
    {utility}
    {px != null && ` · ${px} px`}
  </span>
);

/** The space between two components, drawn like the spacing overlay in Figma */
const Gap = ({ step, utility = `gap-${step}` }: { step: number; utility?: string }) => {
  const [ref, px] = useMeasured('height');
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <div
        ref={ref}
        className="bg-danger-base-default/15 border-danger-base-default/40 grow border-y border-dashed"
        style={{ height: steps(step) }}
      />
      <div className="w-32 flex-none">
        <MarkerLabel utility={utility} px={px} />
      </div>
    </div>
  );
};

/** A component, with the label column the gaps have, so everything lines up */
const Item = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3">
    <div className="grow">{children}</div>
    <div className="w-32 flex-none" />
  </div>
);

/** The padding inside a box, drawn as the hatched band around its content */
const Padding = ({ step, children }: { step: number; children: ReactNode }) => {
  const [ref, px] = useMeasured('height');
  const hatch: CSSProperties = {
    padding: steps(step),
    backgroundImage:
      'repeating-linear-gradient(45deg, transparent 0 6px, color-mix(in oklab, var(--gm-color-danger-base-default) 18%, transparent) 6px 8px)',
  };
  return (
    <div className="grid gap-2">
      <MarkerLabel utility={`p-${step}`} px={px} />
      <div
        className="border-danger-base-default/40 relative rounded-lg border border-dashed"
        style={hatch}
      >
        {/* Measures one side of the padding: a band as tall as the padding itself */}
        <div
          ref={ref}
          aria-hidden
          className="absolute top-0 left-0"
          style={{ height: steps(step) }}
        />
        {children}
      </div>
    </div>
  );
};

const RULER = [1, 2, 3, 4, 6, 8, 12, 16];

const RulerRow = ({ step }: { step: number }) => {
  const [ref, px] = useMeasured('width');
  return (
    <div className="grid grid-cols-[3rem_1fr_4rem] items-center gap-3">
      <span className="description font-mono">{step}</span>
      <div ref={ref} className="bg-base-default h-3 rounded-sm" style={{ width: steps(step) }} />
      <span className="description text-right font-mono">{px} px</span>
    </div>
  );
};

/**
 * What the Avstand slider changes: the space between components, the padding inside them and
 * the scale it all comes from. Every number is measured from the page, so it's what the theme
 * really gives, not worked out on the side.
 */
export const SpacingExample = () => (
  <div className="grid gap-12 lg:grid-cols-2">
    <div className="grid content-start gap-3">
      <p className="paragraph font-medium">Mellom komponenter</p>
      <div className="grid">
        <Item>
          <p className="heading-s">Meld interesse</p>
        </Item>
        <Gap step={2} />
        <Item>
          <p className="description">
            Vi tar kontakt når leilighetene i blokk B legges ut for salg.
          </p>
        </Item>
        <Gap step={6} />
        <Item>
          <TextField label="Navn" />
        </Item>
        <Gap step={4} />
        <Item>
          <TextField label="E-post" type="email" />
        </Item>
        <Gap step={8} />
        <Item>
          <Button>Send</Button>
        </Item>
      </div>
    </div>

    <div className="grid content-start gap-12">
      <div className="grid gap-3">
        <p className="paragraph font-medium">Inni en komponent</p>
        <Padding step={6}>
          <div className="bg-surface-default grid gap-2 rounded-md p-4">
            <p className="paragraph font-medium">Leilighet 402</p>
            <p className="description">72 m², 4. etasje, ledig</p>
          </div>
        </Padding>
      </div>

      <div className="grid gap-3">
        <p className="paragraph font-medium">Skalaen</p>
        <p className="description">
          Hvert trinn er grunnenheten ganger tallet, sånn at <code>p-4</code>, <code>gap-4</code> og{' '}
          <code>mt-4</code> blir det samme.
        </p>
        <div className="grid gap-2">
          {RULER.map((step) => (
            <RulerRow key={step} step={step} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
