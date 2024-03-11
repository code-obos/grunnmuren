import React, { useState, forwardRef, type Ref, Children } from 'react';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '../content';

type AccordionProps = {
  children: React.JSX.Element[];
  className?: string;
};
type AccordionItemProps = {
  children: React.JSX.Element[];
  className?: string;
};

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-col gap-2 bg-white p-2', props.className)}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

function AccordionItem(props: AccordionItemProps, ref: Ref<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cx(
        'group border-b border-gray-light last:border-0',
        '[&_[data-slot="content"]]:m-2 [&_[data-slot="content"]]:hidden [&_[data-slot="content"]]:border-l-[3px] [&_[data-slot="content"]]:border-mint [&_[data-slot="content"]]:px-3.5 [&_[data-slot="content"]]:py-1.5',
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
            <Heading
              level={child.props.level}
              className='className="flex-1 text-left font-semibold leading-7'
            >
              <button
                onClick={() => setOpen(!open)}
                className={cx(
                  'flex w-full items-center justify-between gap-2 rounded-md p-2',
                )}
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
          return child;
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
