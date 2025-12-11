import { Check, Edit } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  type JSX,
  use,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';
import { ProgressBarContext, Provider } from 'react-aria-components';
import { _LinkContext } from '../link';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { ScrollButton, useHorizontalScroll } from '../utils';

type StepProps = HTMLProps<HTMLLIElement> & {
  /**
   * Indicates whether the step is completed or not.
   * A completed step means that the user has filled out and submitted the corresponding section of the form.
   * And that all the data entered in that section is valid.
   * @default false
   */
  isCompleted?: boolean;
};

const _StepContext = createContext<{
  isCurrent: boolean;
}>({
  isCurrent: false,
});

const _StepProvider = _StepContext.Provider;

const Step = ({ isCompleted = false, children, ...restProps }: StepProps) => {
  const locale = useLocale();
  const id = useId();
  const { isCurrent } = use(_StepContext);

  const state = isCompleted ? 'completed' : 'pending';

  return (
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      data-is-current={isCurrent}
      id={id}
    >
      <Provider
        values={[
          [
            _LinkContext,
            {
              'aria-current': isCurrent ? 'step' : undefined,
              role: state === 'pending' ? 'none' : undefined,
              className: 'underline',
            },
          ],
          [
            ProgressBarContext,
            {
              'aria-labelledby': id,
            },
          ],
        ]}
      >
        {state === 'completed' ? (
          <Check aria-label={translations.completed[locale]} />
        ) : (
          <Edit
            data-slot="in-progress-icon"
            aria-label={translations.pending[locale]}
          />
        )}
        {children}
      </Provider>
    </li>
  );
};

type StepperProps = HTMLAttributes<HTMLDivElement> & {
  /** 3-8 <Step> children */
  children: [
    JSX.Element,
    JSX.Element,
    JSX.Element,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
  ];
  currentStep: number;
};

const Stepper = ({
  children,
  currentStep,
  className,
  ...restProps
}: StepperProps) => {
  const locale = useLocale();
  const childCount = Children.count(children);

  if (currentStep > childCount) {
    console.error(
      `Stepper: currentStep (${currentStep}) is greater than the number of children (${childCount})`,
    );
  }

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
      if (!scrollContainer) return;

      const targetStepElement = scrollContainer.children[
        targetStep - 1
      ] as HTMLElement;
      if (!targetStepElement) return;

      // Calculate the scroll position to center the target step
      const stepOffsetLeft = targetStepElement.offsetLeft;
      const stepWidth = targetStepElement.offsetWidth;
      const containerWidth = scrollContainer.offsetWidth;
      const targetScroll = stepOffsetLeft - containerWidth / 2 + stepWidth / 2;

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

  // Scroll when the currentStep prop changes (only if not fully visible)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const targetStepElement = scrollContainer.children[
      currentStep - 1
    ] as HTMLElement;
    if (!targetStepElement) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const stepRect = targetStepElement.getBoundingClientRect();

    // Calculate if the step is fully visible
    const isFullyVisible =
      stepRect.left >= containerRect.left &&
      stepRect.right <= containerRect.right;

    if (!isFullyVisible) {
      performScroll(currentStep);
    }
  }, [currentStep, scrollContainerRef, performScroll]);

  // Triggered when next/prev "buttons" are clicked
  useEffect(() => {
    if (scrollToStep === null) return;

    performScroll(scrollToStep);
    setScrollToStep(null); // Reset after scrolling to setup for next scroll
  }, [scrollToStep, performScroll]);

  const onPrev = () => {
    if (!canScrollLeft) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

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
    if (!canScrollRight) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Find the last visible step and scroll one step after it
    const containerRect = scrollContainer.getBoundingClientRect();
    for (let i = scrollContainer.children.length - 1; i >= 0; i--) {
      const stepElement = scrollContainer.children[i] as HTMLElement;
      const stepRect = stepElement.getBoundingClientRect();
      if (stepRect.right <= containerRect.right) {
        const targetStep = Math.min(childCount, i + 2); // i is 0-indexed, steps are 1-indexed, +2 to go one after
        setScrollToStep(targetStep);
        break;
      }
    }
  };

  return (
    <div {...restProps} data-slot="form-steps-container">
      <ol
        ref={scrollContainerRef}
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        data-slot="form-steps"
      >
        {Children.map(children, (child, index) => {
          const isCurrent = index + 1 === currentStep;

          return (
            <_StepProvider
              value={{
                isCurrent,
              }}
            >
              {child}
            </_StepProvider>
          );
        })}
      </ol>
      <ScrollButton
        direction="left"
        onClick={onPrev}
        isVisible={canScrollLeft}
        hasScrollingOccurred={hasScrollingOccurred}
        className="absolute bottom-px size-11"
        iconClassName="mt-0.25 h-6 w-full text-black"
      />
      <ScrollButton
        direction="right"
        onClick={onNext}
        isVisible={canScrollRight}
        hasScrollingOccurred={hasScrollingOccurred}
        className="absolute bottom-px size-11"
        iconClassName="mt-0.25 h-6 w-full text-black"
      />
    </div>
  );
};

export {
  Step as UNSAFE_Step,
  Stepper as UNSAFE_Stepper,
  type StepperProps as UNSAFE_StepperProps,
  type StepProps as UNSAFE_StepProps,
};
