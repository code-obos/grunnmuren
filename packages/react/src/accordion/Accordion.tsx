import React, { useState, forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};
type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  heading: React.ReactNode;
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
      <button
        onClick={() => setOpen(!open)}
        className={cx(
          'flex w-full items-center justify-between gap-2 rounded-md p-2',
        )}
      >
        <p className="flex-1 text-left font-semibold leading-7">
          {props.heading}
        </p>
        <ChevronDown
          className={cx(
            'text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none',
          )}
        />
      </button>
      {props.children}
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
