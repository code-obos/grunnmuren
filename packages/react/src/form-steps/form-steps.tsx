import { Check, Edit } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  isValidElement,
  type JSX,
  use,
  useId,
  useState,
} from 'react';
import { ProgressBarContext, Provider } from 'react-aria-components';
import { useClickOutsideRef, useComponentDidMount } from '../hooks';
import { _LinkContext } from '../link';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type FormStepProps = HTMLProps<HTMLLIElement> & {
  /**
   * Indicates whether the step is completed or not.
   * A completed step means that the user has filled out and submitted the corresponding section of the form.
   * And that all the data entered in that section is valid.
   * @default false
   */
  isCompleted?: boolean;
};

const _FormStepContext = createContext<{
  onTogglePrev?: () => void;
  onToggleNext?: () => void;
  isPrevStepsExpanded?: boolean;
  isNextStepsExpanded?: boolean;
  setIsPrevStepsExpanded?: (expanded: boolean) => void;
  setIsNextStepsExpanded?: (expanded: boolean) => void;
  isCurrent: boolean;
}>({
  onTogglePrev: undefined,
  onToggleNext: undefined,
  isPrevStepsExpanded: undefined,
  isNextStepsExpanded: undefined,
  setIsPrevStepsExpanded: undefined,
  setIsNextStepsExpanded: undefined,
  isCurrent: false,
});

const _FormStepProvider = _FormStepContext.Provider;

const FormStep = ({
  isCompleted = false,
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  const {
    onTogglePrev,
    onToggleNext,
    isPrevStepsExpanded,
    isNextStepsExpanded,
    setIsPrevStepsExpanded,
    setIsNextStepsExpanded,
    isCurrent,
  } = use(_FormStepContext);

  const state = isCompleted ? 'completed' : 'pending';

  const handleLinkPress = () => {
    setIsPrevStepsExpanded?.(false);
    setIsNextStepsExpanded?.(false);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The collapsed content is accessible through keyboard focus
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      data-is-current={isCurrent}
      id={id}
      onClick={onTogglePrev || onToggleNext}
      data-prev-steps-expanded={isPrevStepsExpanded}
      data-next-steps-expanded={isNextStepsExpanded}
    >
      <Provider
        values={[
          [
            _LinkContext,
            {
              'aria-current': isCurrent ? 'step' : undefined,
              role: state === 'pending' ? 'none' : undefined,
              onPress: handleLinkPress,
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
        {/*
         * Render an extra checkmark in the list item acting as the toggle for the collapsible steps (popover) on small screens.
         * This indicates (visually) that all collapsed steps are completed. Screen reader users will already be informed about completed steps through the individual step items.
         */}
        {onTogglePrev && <Check data-slot="toggle-prev-check-icon" />}
        {onToggleNext && <Check data-slot="toggle-next-check-icon" />}
        {children}
      </Provider>
    </li>
  );
};

type FormStepsProps = HTMLAttributes<HTMLDivElement> & {
  /** 3-8 <FormStep> children */
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

const FormSteps = ({ children, currentStep, ...restProps }: FormStepsProps) => {
  const locale = useLocale();
  const childCount = Children.count(children);

  if (currentStep > childCount) {
    console.error(
      `FormSteps: currentStep (${currentStep}) is greater than the number of children (${childCount})`,
    );
  }

  const isPrevStepsTogglable = childCount >= 5;
  const isNextStepsTogglable = childCount >= 7;

  // State to track whether the collapsible prev steps (popover) is expanded or collapsed
  const [isPrevStepsExpanded, setIsPrevStepsExpanded] = useState<
    boolean | undefined
  >(isPrevStepsTogglable ? false : undefined);

  // State to track whether the collapsible next steps (popover) is expanded or collapsed
  const [isNextStepsExpanded, setIsNextStepsExpanded] = useState<
    boolean | undefined
  >(isNextStepsTogglable ? false : undefined);

  // Handles toggling of the prev steps popover on small screens
  const onTogglePrev = () => {
    if (isPrevStepsTogglable) {
      setIsPrevStepsExpanded((prevState) => !prevState);
      setIsNextStepsExpanded(false);
    }
  };

  // Handles toggling of the next steps popover on small screens
  const onToggleNext = () => {
    if (isNextStepsTogglable) {
      setIsNextStepsExpanded((prevState) => !prevState);
      setIsPrevStepsExpanded(false);
    }
  };

  // Closes the popovers (if visible) when clicking outside the component
  const ref = useClickOutsideRef<HTMLOListElement>(() => {
    if (isPrevStepsTogglable) {
      setIsPrevStepsExpanded(false);
    }
    if (isNextStepsTogglable) {
      setIsNextStepsExpanded(false);
    }
  });

  // Closes the popovers (if visible) when focusing outside the popover itself.
  // We need these incase the user combines both mouse/touch and keyboard navigation.
  useComponentDidMount(() => {
    const focusOutsideHandler = () => {
      const focusedElement = document.activeElement;
      if (focusedElement) {
        const children = Array.from(ref.current?.children || []);

        if (isPrevStepsTogglable) {
          // If any of the completed steps (from 2nd step and onwards) does NOT contain the focused element, close the prev popover
          if (
            !children
              .slice(1, currentStep) // Only children between the 2nd step and the current step
              .filter((li) => li.getAttribute('data-state') === 'completed')
              .some((li) => li.contains(focusedElement))
          ) {
            setIsPrevStepsExpanded(false);
          }
        }

        if (isNextStepsTogglable) {
          // If any of the completed steps after the 4th step does NOT contain the focused element, close the next popover
          if (
            !children
              .slice(currentStep) // Only children after the current step
              .filter((li) => li.getAttribute('data-state') === 'completed')
              .some((li) => li.contains(focusedElement))
          ) {
            setIsNextStepsExpanded(false);
          }
        }
      }
    };

    document.addEventListener('focus', focusOutsideHandler, true);
    return () =>
      document.removeEventListener('focus', focusOutsideHandler, true);
  });

  return (
    <div data-slot="form-steps-container" {...restProps}>
      <ol
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        data-slot="form-steps"
        ref={ref}
      >
        {Children.map(children, (child, index) => {
          const isCurrent = index + 1 === currentStep;

          // The second list item acts as the toggle for the collapsible prev steps (popover) on small screens
          if (
            isPrevStepsTogglable &&
            index === 1 &&
            isValidElement<FormStepProps>(child)
          ) {
            return (
              <_FormStepProvider
                value={{
                  onTogglePrev,
                  isPrevStepsExpanded,
                  isCurrent,
                  setIsPrevStepsExpanded,
                  setIsNextStepsExpanded,
                }}
              >
                {cloneElement(child)}
              </_FormStepProvider>
            );
          }

          // The list item following the current step acts as the toggle for the collapsible next steps (popover) on small screens (currentStep is 1-based, index is 0-based)
          if (
            isNextStepsTogglable &&
            index === currentStep &&
            isValidElement<FormStepProps>(child)
          ) {
            return (
              <_FormStepProvider
                value={{
                  onToggleNext,
                  isNextStepsExpanded,
                  isCurrent,
                  setIsPrevStepsExpanded,
                  setIsNextStepsExpanded,
                }}
              >
                {cloneElement(child)}
              </_FormStepProvider>
            );
          }

          return (
            <_FormStepProvider
              value={{
                isCurrent,
                setIsPrevStepsExpanded,
                setIsNextStepsExpanded,
              }}
            >
              {child}
            </_FormStepProvider>
          );
        })}
      </ol>
    </div>
  );
};

export {
  FormStep as UNSAFE_FormStep,
  FormSteps as UNSAFE_FormSteps,
  type FormStepProps as UNSAFE_FormStepProps,
  type FormStepsProps as UNSAFE_FormStepsProps,
};
