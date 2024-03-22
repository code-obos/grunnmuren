import React, { Children, useState, forwardRef, type Ref, useId } from 'react';
import { Provider } from 'react-aria-components';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

import { useClientLayoutEffect } from '../utils/useClientLayoutEffect';
import { HeadingContext, ContentContext } from '../content';

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
};

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  const { children, ...restProps } = props;

  const childCount = Children.count(children);

  return (
    <div {...restProps} ref={ref}>
      {Children.map(children, (child, index) => {
        return (
          <>
            {child}
            {index < childCount - 1 && (
              <hr className="border-gray-light" aria-hidden />
            )}
          </>
        );
      })}
    </div>
  );
}

function AccordionItem(props: AccordionItemProps, ref: Ref<HTMLDivElement>) {
  const {
    className,
    children,
    defaultOpen = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    ...restProps
  } = props;

  const contentId = useId();
  const buttonId = useId();

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
      className={cx('group relative py-3.5', className)}
      ref={ref}
      data-open={isOpen}
    >
      <Provider
        values={[
          [
            HeadingContext,
            {
              className: 'font-semibold leading-7',
              // Supply a default level here to make this typecheck ok. Will be overwritten with the consumers set heading level anyways
              level: 3,
              _innerWrapper: (children) => (
                <button
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  // the z-index is necessary for the focus ring to be drawn above the left border of the content
                  className="relative z-10 flex min-h-[44px] w-full items-center justify-between gap-1.5 rounded-sm text-left focus:outline-none focus-visible:ring focus-visible:ring-black"
                  id={buttonId}
                  onClick={handleOpenChange}
                >
                  {children}
                  <ChevronDown
                    className={cx(
                      'transition-transform duration-150 motion-reduce:transition-none',
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
              className:
                'text-sm font-light leading-6 px-3.5 py-1.5 overflow-hidden border-mint border-l-[3px] duration-300 group-data-[open="false"]:py-0 motion-reduce:transition-none',
              role: 'region',
              // @ts-expect-error TODO: remove this expect-error when we're on React 19 https://github.com/facebook/react/issues/17157#issuecomment-2003750544
              inert: isOpen ? undefined : 'true',
              'aria-labelledby': buttonId,
              _outerWrapper: (children) => (
                <div className="grid grid-rows-[0fr] transition-all duration-300 group-data-[open='true']:grid-rows-[1fr] motion-reduce:transition-none">
                  {children}
                </div>
              ),
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
