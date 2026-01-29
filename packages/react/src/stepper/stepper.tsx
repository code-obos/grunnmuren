import { Check, Edit } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  isValidElement,
  use,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';
import { LinkContext, Provider } from 'react-aria-components';
import { UNSAFE_ProgressBar as ProgressBar } from '../progress-bar';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { ScrollButton, useHorizontalScroll } from '../utils';

type StepperProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  activeStep: number;
  onStepChange?: (step: number) => void;
};

const StepperContext = createContext<{
  /** Handler that is called when the step chages.. */
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

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    hasScrollingOccurred,
  } = useHorizontalScroll<HTMLOListElement>();

  // Internal state for scroll target step (null means use currentStep)
  const [scrollToStep, setScrollToStep] = useState<number | null>(null);

  // Shared function to scroll to a specific step
  const performScroll = useCallback(
    (targetStep: number) => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) {
        return;
      }

      const targetStepElement = scrollContainer.children[
        targetStep - 1
      ] as HTMLElement;
      if (!targetStepElement) {
        return;
      }

      // Calculate the scroll position to center the target step
      const stepOffsetLeft = targetStepElement.offsetLeft;
      const halfStepWidth = targetStepElement.offsetWidth / 2;
      const halfContainerWidth = scrollContainer.offsetWidth / 2;
      const targetScroll = stepOffsetLeft - halfContainerWidth + halfStepWidth;

      // Respect reduced motion preferences
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      scrollContainer.scrollTo({
        left: targetScroll,
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
    },
    [scrollContainerRef],
  );

  // Scroll when the currentStep prop changes
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const targetStepElement = scrollContainer.children[
      activeStep - 1
    ] as HTMLElement;
    if (!targetStepElement) {
      return;
    }

    performScroll(activeStep);
  }, [activeStep, scrollContainerRef, performScroll]);

  // Scroll focused links into view when they receive focus-visible
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-focus-visible'
        ) {
          const target = mutation.target as HTMLElement;

          // Check if the element has focus-visible (data-focus-visible attribute present)
          const hasFocusVisible = target.hasAttribute('data-focus-visible');
          if (!hasFocusVisible) {
            continue;
          }

          // Find which step this link belongs to
          const step = target.closest('[data-slot="step"]') as HTMLElement;
          if (!step) {
            continue;
          }

          // Find which step number this is
          const stepIndex = Array.from(scrollContainer.children).indexOf(step);
          if (stepIndex === -1) {
            continue;
          }

          const stepNumber = stepIndex + 1;

          performScroll(stepNumber);
        }
      }
    });

    // Observe all link elements within the scroll container
    const steps = scrollContainer.querySelectorAll('[data-slot="step"]');
    for (const step of steps) {
      const links = step.querySelectorAll('[data-slot="link"]');
      for (const link of links) {
        observer.observe(link, {
          attributes: true,
          attributeFilter: ['data-focus-visible'],
        });
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [scrollContainerRef, performScroll]);

  // Triggered when next/prev "buttons" are clicked
  useEffect(() => {
    if (scrollToStep === null) {
      return;
    }

    performScroll(scrollToStep);
    setScrollToStep(null); // Reset after scrolling to setup for next scroll
  }, [scrollToStep, performScroll]);

  const onPrev = () => {
    if (!canScrollLeft) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    // Find the first visible step and scroll one step before it
    const containerRect = scrollContainer.getBoundingClientRect();
    for (let i = 0; i < scrollContainer.children.length; i++) {
      const stepElement = scrollContainer.children[i] as HTMLElement;
      const stepRect = stepElement.getBoundingClientRect();
      if (stepRect.left >= containerRect.left) {
        const targetStep = Math.max(1, i); // i is 0-indexed, steps are 1-indexed
        setScrollToStep(targetStep);
        break;
      }
    }
  };

  const onNext = () => {
    if (!canScrollRight) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    // Find the last visible step and scroll one step after it
    const containerRect = scrollContainer.getBoundingClientRect();
    for (let i = scrollContainer.children.length - 1; i >= 0; i--) {
      const stepElement = scrollContainer.children[i] as HTMLElement;
      const stepRect = stepElement.getBoundingClientRect();
      if (stepRect.right <= containerRect.right) {
        const targetStep = Math.min(stepsCount, i + 2); // i is 0-indexed, steps are 1-indexed, +2 to go one after
        setScrollToStep(targetStep);
        break;
      }
    }
  };

  return (
    <div {...restProps} data-slot="stepper-container">
      <ol
        ref={scrollContainerRef}
        aria-label={translations.stepper[locale]}
        data-slot="stepper"
      >
        <StepperContext.Provider
          value={{ onStepChange, activeStep, stepsCount }}
        >
          {Children.map(children, (child, index) => {
            return (
              isValidElement<StepProps>(child) &&
              cloneElement(child, {
                '~stepNumber': index + 1,
              })
            );
          })}
        </StepperContext.Provider>
      </ol>
      <ScrollButton
        direction="left"
        onClick={onPrev}
        isVisible={canScrollLeft}
        hasScrollingOccurred={hasScrollingOccurred}
      />
      <ScrollButton
        direction="right"
        onClick={onNext}
        isVisible={canScrollRight}
        hasScrollingOccurred={hasScrollingOccurred}
      />
    </div>
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
  '~stepNumber'?: number;
};

const Step = ({
  isDisabled = false,
  state,
  children,
  '~stepNumber': stepNumber,
  progress,
  ...restProps
}: StepProps) => {
  const locale = useLocale();
  const id = useId();
  const { onStepChange, activeStep, stepsCount } = use(StepperContext);

  const isLastStep = stepNumber === stepsCount;
  const isCurrent = stepNumber === activeStep;

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
              onPress: () => onStepChange?.(stepNumber as number),
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
