import { useState, forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};
type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  heading: string;
};

const defaultStyles = 'group bg-white flex flex-col gap-2 p-2';

function Accordion(props: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <div className={cx(defaultStyles, props.className)} ref={ref}>
      {props.children}
    </div>
  );
}

function AccordionItem(props: AccordionItemProps, ref: Ref<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-gray-light group-last:border-0"
      data-open={open}
      ref={ref}
    >
      <button
        onClick={() => setOpen(!open)}
        data-open={open}
        className={cx(
          'flex w-full items-center justify-between gap-2 rounded-md p-2',
        )}
      >
        <p className="flex-1 text-left font-semibold leading-7">
          {props.heading}
        </p>
        <ChevronDown
          className={cx(
            'text-base transition-transform duration-150 motion-reduce:transition-none',
            open && 'group-data-[open]:rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="m-2 border-l-[3px] border-mint px-3.5 py-1.5">
          {props.children}
        </div>
      )}
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
