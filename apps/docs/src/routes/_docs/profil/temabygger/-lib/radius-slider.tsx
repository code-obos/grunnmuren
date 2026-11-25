import { startTransition } from 'react';
import { Label, Slider, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components';

type RadiusSliderProps = {
  value: number;
  onChange: (px: number) => void;
};

/**
 * `--gm-radius-base` in px. Grunnmuren has no slider of its own, so it's React Aria's.
 *
 * It keeps its own value while dragging and hands it on in a transition, the same way as
 * the colour picker: every step re-renders the whole builder, and the handle shouldn't
 * wait for that.
 */
export const RadiusSlider = ({ value, onChange }: RadiusSliderProps) => (
  <Slider
    defaultValue={value}
    onChange={(px) => startTransition(() => onChange(px))}
    minValue={0}
    maxValue={16}
    step={1}
    aria-describedby="hjorner-beskrivelse"
    className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3"
  >
    <Label className="paragraph col-span-full font-medium">Hjørner</Label>
    <SliderTrack className="relative h-5">
      {({ state }) => (
        <>
          <div className="bg-neutral-surface-active absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full" />
          <div
            className="bg-primary-base-default absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full"
            style={{ width: `${state.getThumbPercent(0) * 100}%` }}
          />
          <SliderThumb className="bg-primary-base-default data-focus-visible:outline-focus-offset top-1/2 size-4 cursor-grab rounded-full data-dragging:cursor-grabbing" />
        </>
      )}
    </SliderTrack>
    <SliderOutput className="paragraph min-w-12 text-right">
      {({ state }) => `${state.getThumbValue(0)} px`}
    </SliderOutput>
    <p id="hjorner-beskrivelse" className="description col-span-full">
      Dra slideren for å stille corner radius på komponentene.
    </p>
  </Slider>
);
