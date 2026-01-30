import { Check, Edit } from '@obosbbl/grunnmuren-icons-react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  isValidElement,
  use,
  useEffect,
  useId,
  useState,
} from 'react';
import { LinkContext, Provider } from 'react-aria-components';
import { UNSAFE_ProgressBar as ProgressBar } from '../progress-bar';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { ScrollButton } from '../utils/horizontal-scroll';

type StepperProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** The active step, zero indexed.  */
  activeStep: number;
  /** Handler that is called when the step changes. */
  onStepChange?: (step: number) => void;
};

const StepperContext = createContext<{
  onStepChange?: (step: number) => void;
  activeStep: number;
  stepsCount: number;
}>({ activeStep: 0, stepsCount: 0 });

const Stepper = ({
  children,
  activeStep,
  onStepChange,
  ...restProps
}: StepperProps) => {
  const locale = useLocale();
  const stepsCount = Children.count(children);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: activeStep,
    dragFree: true,
    breakpoints: {
      // disable the carousel on large screens
      '(width >= 64rem)': { active: false },
    },
  });

  return (
    <div {...restProps} data-slot="stepper-container" ref={emblaRef}>
      <ol aria-label={translations.stepper[locale]} data-slot="stepper">
        <StepperContext.Provider
          value={{ onStepChange, activeStep, stepsCount }}
        >
          {Children.map(children, (child, index) => {
            return (
              isValidElement<StepProps>(child) &&
              cloneElement(child, {
                '~stepIndex': index,
              })
            );
          })}
        </StepperContext.Provider>
      </ol>
      <MobileScrollButtons emblaApi={emblaApi} />
    </div>
  );
};

const MobileScrollButtons = ({
  emblaApi,
}: {
  emblaApi: UseEmblaCarouselType[1];
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleSlidesInView = () => {
      setCanScrollLeft(emblaApi.canScrollPrev());
      setCanScrollRight(emblaApi.canScrollNext());
    };

    emblaApi.on('slidesInView', handleSlidesInView);

    return () => {
      emblaApi.off('slidesInView', handleSlidesInView);
    };
  }, [emblaApi]);

  return (
    <>
      <ScrollButton
        className="lg:hidden"
        direction="left"
        onClick={() => emblaApi?.scrollPrev()}
        isVisible={canScrollLeft}
        hasScrollingOccurred={false}
      />
      <ScrollButton
        className="lg:hidden"
        direction="right"
        isVisible={canScrollRight}
        onClick={() => emblaApi?.scrollNext()}
        hasScrollingOccurred={false}
      />
    </>
  );
};

type StepProps = HTMLProps<HTMLLIElement> & {
  /**
   * The state fo the step, whether the step is completed or not.
   */
  state?: 'completed';

  /**
   * Whether the step is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /** The current progress of the step, between 0 and 100. */
  progress?: number;

  /** @private */
  '~stepIndex'?: number;
};

const Step = ({
  isDisabled = false,
  state,
  children,
  '~stepIndex': stepIndex,
  progress,
  ...restProps
}: StepProps) => {
  const locale = useLocale();
  const id = useId();
  const { onStepChange, activeStep, stepsCount } = use(StepperContext);

  const isLastStep = stepIndex === stepsCount - 1;
  const isCurrent = stepIndex === activeStep;

  const iconText =
    state === 'completed' ? translations.completed[locale] : undefined;

  const icon = isCurrent ? (
    <Edit aria-label={iconText} />
  ) : (
    state === 'completed' && <Check aria-label={iconText} />
  );

  return (
    <li
      {...restProps}
      data-slot="step"
      data-state={state}
      data-current={isCurrent ? true : undefined}
      data-disabled={isDisabled ? true : undefined}
      id={id}
    >
      <Provider
        values={[
          [
            LinkContext,
            {
              // @ts-expect-error this works even though it's a type error
              'aria-current': isCurrent ? 'step' : undefined,
              isDisabled,
              className: 'underline',
              onPress: () => onStepChange?.(stepIndex as number),
            },
          ],
        ]}
      >
        {icon}

        {children}

        {!isLastStep && (
          <ProgressBar
            aria-labelledby={id}
            // Make sure that if the step is completed, the progress value is 100%
            value={state === 'completed' ? 100 : progress}
          />
        )}
      </Provider>
    </li>
  );
};

export {
  Step as UNSAFE_Step,
  Stepper as UNSAFE_Stepper,
  type StepperProps as UNSAFE_StepperProps,
  type StepProps as UNSAFE_StepProps,
};
