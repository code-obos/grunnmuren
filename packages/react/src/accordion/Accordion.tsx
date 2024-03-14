import React, { useState, forwardRef, type Ref, Children, useId } from 'react';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '../content';

type AccordionProps = {
  children: React.JSX.Element[] | React.JSX.Element;
  className?: string;
};
type AccordionItemProps = {
  children: React.JSX.Element[];
  className?: string;
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

  return (
    <div
      className={cx(
        'group relative px-2',
        '[&_[data-slot="content"]]:mb-[10px] [&_[data-slot="content"]]:hidden [&_[data-slot="content"]]:border-l-[3px] [&_[data-slot="content"]]:border-mint [&_[data-slot="content"]]:px-3.5 [&_[data-slot="content"]]:py-1.5',
        '[&_[data-slot="content"]]:data-[open]:block',
      )}
      data-open={open || undefined}
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
              aria-labelledby={contentId}
              role="region"
              className={cx(
                'after:absolute after:left-[9px] after:right-[9px] after:h-px after:bg-gray-light after:group-last:h-0',
              )}
            >
              {child}
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
