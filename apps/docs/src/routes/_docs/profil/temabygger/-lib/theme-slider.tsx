import { InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import {
  UNSAFE_Toggletip as Toggletip,
  UNSAFE_ToggletipContent as ToggletipContent,
  UNSAFE_ToggletipTrigger as ToggletipTrigger,
} from '@obosbbl/grunnmuren-react';
import { type ReactNode, startTransition, useId } from 'react';
import { Label, Slider, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components';

type ThemeSliderProps = {
  label: string;
  description: string;
  /** More about the setting, behind an info button next to the label */
  info?: ReactNode;
  value: number;
  onChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  step: number;
  /** The value as it's shown next to the slider, `4 px` or `0.25` */
  format: (value: number) => string;
};

/**
 * A setting in the Form tab. Grunnmuren has no slider of its own, so it's React Aria's.
 *
 * It keeps its own value while dragging and hands it on in a transition, the same way as
 * the colour picker: every step re-renders the whole builder, and the handle shouldn't
 * wait for that.
 */
export const ThemeSlider = ({
  label,
  description,
  info,
  value,
  onChange,
  minValue,
  maxValue,
  step,
  format,
}: ThemeSliderProps) => {
  const descriptionId = useId();

  return (
    <Slider
      defaultValue={value}
      onChange={(next) => startTransition(() => onChange(next))}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      aria-describedby={descriptionId}
      className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3"
    >
      <div className="col-span-full flex items-center gap-2">
        <Label className="paragraph font-medium">{label}</Label>
        {info && (
          <Toggletip>
            <ToggletipTrigger aria-label={`Mer om ${label.toLowerCase()}`} variant="info">
              <InfoCircle />
            </ToggletipTrigger>
            {/* Always below: flipped above, the docs page puts it off screen, since `bottom`
                ends up measured from the end of the page rather than the window */}
            <ToggletipContent
              aria-label={`Mer om ${label.toLowerCase()}`}
              placement="bottom"
              shouldFlip={false}
            >
              {info}
            </ToggletipContent>
          </Toggletip>
        )}
      </div>
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
        {({ state }) => format(state.getThumbValue(0))}
      </SliderOutput>
      <p id={descriptionId} className="description col-span-full">
        {description}
      </p>
    </Slider>
  );
};
