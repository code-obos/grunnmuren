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

type AccordionContentProps = {
  children: React.JSX.Element;
  contentId: string;
  buttonId: string;
  open: boolean;
};

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <div
      className={cx(props.className, 'flex flex-col rounded-lg bg-white p-2')}
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
        props.className,
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
                className="flex w-full flex-1 items-center justify-between rounded-md py-[18px] text-left font-semibold leading-7"
                aria-expanded={open}
                id={buttonId}
                aria-controls={contentId}
              >
                {child.props.children}
                <ChevronDown
                  className={cx(
                    'text-base transition-transform duration-150 motion-reduce:transition-none',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </Heading>
          );
        } else {
          return (
            <AccordionContent
              contentId={contentId}
              buttonId={buttonId}
              open={open}
            >
              {child}
            </AccordionContent>
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

const AccordionContent = (props: AccordionContentProps) => {
  const { children, contentId, buttonId, open } = props;
  return (
    <div
      id={contentId}
      aria-labelledby={buttonId}
      role="region"
      className={cx(
        'text-sm font-light leading-6',
        '[&_[data-slot="content"]]:border-l-[3px] [&_[data-slot="content"]]:px-3.5 [&_[data-slot="content"]]:py-1.5',
        'grid transition-all duration-300 [&_[data-slot="content"]]:overflow-hidden [&_[data-slot="content"]]:transition-all [&_[data-slot="content"]]:duration-300',
        open
          ? 'mb-[10px] grid-rows-[1fr] [&_[data-slot="content"]]:border-mint'
          : '-mb-3 grid-rows-[0fr] [&_[data-slot="content"]]:border-transparent',
      )}
      // @ts-expect-error type error until this is added to react: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822
      inert={open ? undefined : 'true'}
    >
      {children}
    </div>
  );
};
