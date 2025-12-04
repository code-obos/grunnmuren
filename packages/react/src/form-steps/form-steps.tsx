import { Check } from '@obosbbl/grunnmuren-icons-react';
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
   * Indicates whether the step is completed, current or pending.
   * @default 'pending'
   */
  state?: 'completed' | 'current' | 'pending';
};

const _FormStepContext = createContext<{
  onToggle?: () => void;
  isExpanded?: boolean;
}>({
  onToggle: undefined,
  isExpanded: undefined,
});

const _FormStepProvider = _FormStepContext.Provider;

const FormStep = ({
  state = 'pending',
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  const { onToggle, isExpanded } = use(_FormStepContext);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The collapsed content is accessible through keyboard focus
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      id={id}
      onClick={onToggle}
      data-expanded={isExpanded}
    >
      <Provider
        values={[
          [
            _LinkContext,
            {
              'aria-current': state === 'current' ? 'step' : undefined,
              role: state === 'pending' ? 'none' : undefined,
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
        {state === 'completed' && (
          <Check aria-label={translations.completed[locale]} />
        )}
        {/*
         * Render an extra checkmark in the list item acting as the toggle for the collapsible steps (popover) on small screens.
         * This indicates (visually) that all collapsed steps are completed. Screen reader users will already be informed about completed steps through the individual step items.
         */}
        {onToggle && <Check data-slot="toggle-check-icon" />}
        {children}
      </Provider>
    </li>
  );
};

type FormStepsProps = HTMLAttributes<HTMLOListElement> & {
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
};

const FormSteps = ({ children, ...restProps }: FormStepsProps) => {
  const locale = useLocale();
  const childCount = Children.count(children);

  const isTogglableOnSmallScreens = childCount >= 5;

  // State to track whether the collapsible steps (popover) is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(
    isTogglableOnSmallScreens ? false : undefined,
  );

  // Handles toggling of the collapsible steps (popover) on small screens
  const onToggle = () => {
    if (isTogglableOnSmallScreens) {
      setIsExpanded((prevState) => !prevState);
    }
  };

  // Closes the popover (if visible) when clicking outside the component
  const ref = useClickOutsideRef<HTMLOListElement>(() => {
    if (isTogglableOnSmallScreens) {
      setIsExpanded(false);
    }
  });

  // Closes the popover (if visible) when focusing outside the popover itself.
  // We need these incase the user combines both mouse/touch and keyboard navigation.
  useComponentDidMount(() => {
    const focusOutsideHandler = () => {
      if (isTogglableOnSmallScreens) {
        const focusedElement = document.activeElement;
        if (
          focusedElement &&
          // If any of the completed steps (from 2nd step and onwards) does NOT contain the focused element, close the popover
          !Array.from(ref.current?.children || [])
            .slice(1) // Skip first li child
            .filter((li) => li.getAttribute('data-state') === 'completed') // Only completed steps, counting from 2nd step can be collapsable
            .some((li) => li.contains(focusedElement))
        ) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('focus', focusOutsideHandler, true);
    return () =>
      document.removeEventListener('focus', focusOutsideHandler, true);
  });

  return (
    <div data-slot="form-steps-container">
      <ol
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        {...restProps}
        data-slot="form-steps"
        ref={ref}
      >
        {Children.map(children, (child, index) => {
          if (
            isTogglableOnSmallScreens &&
            index === 1 &&
            isValidElement<FormStepProps>(child)
          ) {
            return (
              // The second list item acts as the toggle for the collapsible steps (popover) on small screens
              <_FormStepProvider value={{ onToggle, isExpanded }}>
                {cloneElement(child)}
              </_FormStepProvider>
            );
          }
          return child;
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
