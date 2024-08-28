import React, { Children, useState, forwardRef, type Ref, useId } from 'react';
import { Provider } from 'react-aria-components';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

import { useClientLayoutEffect } from '../utils/useClientLayoutEffect';
import { HeadingContext, ContentContext, DescriptionContext } from '../content';

type AccordionProps = {
  children: React.ReactNode;

  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
};

type AccordionItemProps = {
  children?: React.ReactNode;

  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** Whether the accordion is open (controlled) */
  isOpen?: boolean;
  /** Whether the accordion is open by default (uncontrolled) */
  defaultOpen?: boolean;
  /** Handler that is called when the accordion's open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Disable mint border on the left side of the accordion content */
  noContentBorder?: boolean;
  /** Override the WAI-ARIA accordion pattern to handle the accordion panel content manually */
  noPanelContentAria?: boolean;
};

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  const { children, className, ...restProps } = props;

  const childCount = Children.count(children);

  return (
    <div
      {...restProps}
      ref={ref}
      className={cx('rounded-lg bg-white', className)}
    >
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < childCount - 1 && (
            // Margin is added to enable support for containers with a background color
            <hr className="mx-2 border-gray-light" aria-hidden />
          )}
        </>
      ))}
    </div>
  );
}

const collapsableClasses = cx(
  'grid transition-all duration-300 after:relative after:block after:transition-all after:duration-300 motion-reduce:transition-none',
);
const collapsedClasses = cx('grid-rows-[0fr] after:h-0');
const expandedClasses = cx('grid-rows-[1fr] after:h-3.5');

function AccordionItem(props: AccordionItemProps, ref: Ref<HTMLDivElement>) {
  const {
    className,
    children,
    defaultOpen = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    noContentBorder,
    noPanelContentAria,
    ...restProps
  } = props;

  const contentId = useId();
  const buttonId = useId();
  const [descriptionIds, setDescriptionIds] = useState<string[]>([]);

  const isControlled = controlledIsOpen != null;

  // This component has internal state that controls whether it is open or not,
  // regardless if we are controlled or uncontrolled.
  // If we are controlled, we use a layout effect to sync the controlled state
  // with the internal state.
  //
  const [isOpen, setIsOpen] = useState(
    // If we are controlled, use that open state, otherwise use the uncontrolled
    isControlled ? controlledIsOpen : defaultOpen,
  );

  useClientLayoutEffect(() => {
    if (isControlled) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen, isControlled]);

  const handleOpenChange = () => {
    const newOpenState = !isOpen;

    if (!isControlled) {
      setIsOpen(newOpenState);
    }

    // Always call the change handler, even if we're uncontrolled.
    // Easier to add stuff such as tracking etc.
    if (onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  return (
    <div
      {...restProps}
      className={cx('group relative px-2', className)}
      ref={ref}
      data-open={isOpen}
    >
      <Provider
        values={[
          [
            HeadingContext,
            {
              // Negative margin to strech the button to the entire with of the accordion (to support containers with a background color)
              className: 'font-semibold leading-7 -mx-2 text-base',
              // Supply a default level here to make this typecheck ok. Will be overwritten with the consumers set heading level anyways
              level: 3,
              _innerWrapper: (children) => (
                <button
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  // Use outline with offset as focus indicator, this does not cover the left mint border on the expanded content and works with or without a background color on the accordion container
                  className="flex min-h-[44px] w-full items-center justify-between gap-1.5 rounded-lg px-2 py-3.5 text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-black"
                  id={noPanelContentAria ? undefined : buttonId}
                  onClick={handleOpenChange}
                  aria-describedby={
                    !isOpen ? descriptionIds.join(' ') : undefined
                  }
                >
                  {children}
                  <ChevronDown
                    className={cx(
                      'flex-none transition-transform duration-300 motion-reduce:transition-none',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
              ),
            },
          ],
          [
            ContentContext,
            {
              // Uses pseudo element for vertical padding, since that doesn't affect the height when the accordion is closed
              className: cx(
                'relative overflow-hidden px-3.5 text-sm font-light leading-6  before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
                !noContentBorder && 'border-l-[3px] border-mint',
              ),
              role: noPanelContentAria ? undefined : 'region',
              // @ts-expect-error TODO: remove this expect-error when we're on React 19 https://github.com/facebook/react/issues/17157#issuecomment-2003750544
              inert: isOpen ? undefined : 'true',
              'aria-labelledby': noPanelContentAria ? undefined : buttonId,
              _outerWrapper: (children) => (
                <div
                  className={cx(
                    collapsableClasses,
                    isOpen ? expandedClasses : collapsedClasses,
                  )}
                >
                  {children}
                </div>
              ),
            },
          ],
          [
            DescriptionContext,
            {
              className: 'overflow-hidden',
              _onMount: (id) => {
                setDescriptionIds((prev) => [...prev, id]);
              },
              _outerWrapper: (children) => {
                return (
                  <div
                    className={cx(
                      collapsableClasses,
                      isOpen ? collapsedClasses : expandedClasses,
                    )}
                    // @ts-expect-error TODO: remove this expect-error when we're on React 19 https://github.com/facebook/react/issues/17157#issuecomment-2003750544
                    inert={isOpen ? 'true' : undefined}
                  >
                    {children}
                  </div>
                );
              },
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
}

const _Accordion = forwardRef(Accordion);
const _AccordionItem = forwardRef(AccordionItem);
export {
  _Accordion as Accordion,
  _AccordionItem as AccordionItem,
  type AccordionProps,
  type AccordionItemProps,
};
