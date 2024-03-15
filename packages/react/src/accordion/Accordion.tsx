import React, { useState, forwardRef, type Ref, Children, useId } from 'react';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '../content';

type AccordionProps = {
  children: React.JSX.Element[] | React.JSX.Element;

  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
};
type AccordionItemProps = {
  children: React.JSX.Element[];

  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
};

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-col rounded-lg bg-white p-2', props.className)}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

function AccordionItem(props: AccordionItemProps, ref: Ref<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const buttonId = useId();

  return (
    <div
      className={cx(
        'group relative px-2',
        /** Pseudoelement for the gray bottom border */
        'after:absolute after:left-[9px] after:right-[9px] after:h-px after:bg-gray-light after:last:h-0',
      )}
      ref={ref}
    >
      {Children.map(props.children, (child) => {
        /** Since we are using <Heading> and <Content> from Grunnmuren to
         * render the accordion item, we can use the level-prop to identify the heading component */
        if (child.props.level) {
          return (
            <Heading level={child.props.level}>
              <button
                onClick={() => setOpen(!open)}
                className={cx(
                  'flex w-full flex-1 items-center justify-between rounded-md py-[18px] text-left font-semibold leading-7',
                )}
                aria-expanded={open}
                id={buttonId}
                aria-controls={contentId}
              >
                {child.props.children}
                <ChevronDown
                  className={cx(
                    'text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none',
                  )}
                />
              </button>
            </Heading>
          );
        } else {
          return (
            <div
              id={contentId}
              aria-labelledby={buttonId}
              role="region"
              className={cx(
                '[&_[data-slot="content"]]:mb-[10px] [&_[data-slot="content"]]:border-l-[3px] [&_[data-slot="content"]]:border-mint [&_[data-slot="content"]]:px-3.5 [&_[data-slot="content"]]:py-1.5',
                'grid transition-all duration-300',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
              // @ts-expect-error type error until this is added to react: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822
              inert={open || undefined}
            >
              <div className="overflow-hidden">{child}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

const _Accordion = forwardRef(Accordion);
const _AccordionItem = forwardRef(AccordionItem);
export {
  _Accordion as Accordion,
  _AccordionItem as AccordionItem,
  type AccordionProps,
};
