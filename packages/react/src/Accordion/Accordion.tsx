import React, { createContext, useContext } from 'react';
import { ChevronDown } from '@obosbbl/grunnmuren-icons';
import useCollapse from 'react-collapsed';
import classNames from 'clsx';

import { usePrefersReducedMotion } from '../hooks';

/**
 * See https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ for how to make an accordion/disclousre accessible
 *
 * React collapsed handles some of the accessibility aspects for us. However, we improve it by making
 * sure the toggle is rendered inside a heading, and then we connect the heading to the panel/content using
 * aria-labelledby and role="region"
 */

const DURATION_MS = 300;
const DURATION_TW = 'duration-300';

// Leaving this for now. In the future we might actually implement this to
// create a root component that automatically handles if multiple accordions
// can open or or only a single accordion.
export const Accordion = () => {};

type AccordionContextType = ReturnType<typeof useCollapse> & {
  onChange: (open: boolean) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  isExpanded: false,
  setExpanded: () => {},
  // @ts-expect-error noop
  getCollapseProps: () => {},
  // @ts-expect-error noop
  getToggleProps: () => {},
  onChange: () => {},
});

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onChange?: (open: boolean) => void;
}

export const AccordionItem = (props: AccordionItemProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { className, defaultOpen, onChange = () => {}, open, ...rest } = props;

  const collapseContext = useCollapse({
    defaultExpanded: defaultOpen,
    isExpanded: open,
    duration: DURATION_MS,
    hasDisabledAnimation: prefersReducedMotion,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  });

  return (
    <AccordionContext.Provider value={{ onChange, ...collapseContext }}>
      <div
        className={classNames(
          className,
          'border-b-gray-concrete rounded-sm border-b-2 border-l-4 border-solid',
          collapseContext.isExpanded ? 'border-l-green-dark' : 'border-l-green',
        )}
        {...rest}
      ></div>
    </AccordionContext.Provider>
  );
};

interface AccordionHeaderProps<T extends React.ElementType> {
  /**
   * The heading element that wraps the accordion item's button. Should always be an element with `role="heading"`
   * or a HTML heading tag. Change this to an appropriate heading level for your page.
   * @default h3 */
  as?: T;
  children: React.ReactNode;
  className?: string;
}

export const AccordionHeader = <T extends React.ElementType = 'h3'>(
  props: AccordionHeaderProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof AccordionHeaderProps<T>>,
) => {
  const { className, as: Heading = 'h3', ...rest } = props;

  const { getToggleProps, onChange, isExpanded } = useContext(AccordionContext);

  const toggleProps = getToggleProps({ onClick: () => onChange(!isExpanded) });

  return (
    <Heading>
      <button
        className={classNames(
          className,
          'focus-visible:outline-blue-dark flex w-full items-center justify-between p-4 text-left text-lg font-semibold focus:outline-none focus-visible:outline-4 focus-visible:outline-offset-0',
          isExpanded ? 'bg-green-dark text-white' : undefined,
        )}
        {...rest}
        {...toggleProps}
        id={getToggleId(toggleProps['aria-controls'])}
      >
        {props.children}
        <ChevronDown
          className={classNames(
            'shrink-0 text-sm',
            DURATION_TW,
            isExpanded ? 'rotate-180' : undefined,
          )}
        />
      </button>
    </Heading>
  );
};

interface AccordionContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const AccordionContent = (props: AccordionContentProps) => {
  const { getCollapseProps } = useContext(AccordionContext);

  const { className, ...rest } = props;

  const collapseProps = getCollapseProps();

  return (
    <div
      {...collapseProps}
      role="region"
      aria-labelledby={getToggleId(collapseProps.id)}
    >
      <div className={classNames(className, 'p-4')} {...rest} />
    </div>
  );
};

// We reuse the id create react-collapsed instead of making our own with useId.
// It is simpler this way, as then we can simply pass the output of useCollapsed()
// as context instead of dealing with memoization etc. ourselves
const getToggleId = (id: string) => id + 'toggle';

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
