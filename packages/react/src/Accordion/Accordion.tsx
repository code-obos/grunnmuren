import { createContext, useContext } from 'react';
import { ChevronDown } from '@obosbbl/grunnmuren-icons';
import useCollapse from 'react-collapsed';
import classNames from 'clsx';

import { usePrefersReducedMotion } from '../hooks';
import { UseCollapseOutput } from 'react-collapsed/dist/types';

export interface AccordionProps {
  heading: string;
  children: React.ReactNode;

  /* This is mostly used for GA Tracking */
  onClick?: () => void;
}

// export const Accordion = ({ heading, children, onClick }: AccordionProps) => {
//   return (
//     <section className="w-full" onClick={onClick}>
//       <h3 className="sr-only">{heading}</h3>
//       <details className="border-green open:border-green-dark group rounded-sm border-l-4 border-solid">
//         <summary
//           className={classNames(
//             'group-open:bg-green-dark group-open:border-b-transparent group-open:text-white',
//             'focus-visible:border-blue-dark group-open:focus-visible:border-b-blue-dark focus-visible:border-[3px] focus-visible:p-[15px]',
//             'border-gray-concrete flex cursor-pointer select-none list-none items-center justify-between border-2 border-solid border-x-transparent border-t-transparent p-4 text-lg font-semibold hover:bg-gray-100',
//           )}
//         >
//           {heading}
//           <ChevronDown className="duration-100 ease-linear group-open:rotate-180" />
//         </summary>
//         <div className="border-gray-concrete border-solid px-4 group-open:border-b-2">
//           {children}
//         </div>
//       </details>
//     </section>
//   );
// };

const DURATION_MS = 300;
const DURATION_TW = 'duration-300';

export const Accordion = () => {};

const AccordionContext = createContext<UseCollapseOutput>({
  isExpanded: false,
  setExpanded: () => {},
  // @ts-expect-error noop
  getCollapseProps: () => {},
  // @ts-expect-error noop
  getToggleProps: () => {},
});

export interface AccordionItemProps {
  className?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
}

export const AccordionItem = (props: AccordionItemProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { className, defaultOpen, open, ...rest } = props;
  const collapseContext = useCollapse({
    defaultExpanded: defaultOpen,
    isExpanded: open,
    duration: DURATION_MS,
    hasDisabledAnimation: prefersReducedMotion,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  });

  return (
    <AccordionContext.Provider value={collapseContext}>
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

interface AccordionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionHeader = (props: AccordionHeaderProps) => {
  const { className, ...rest } = props;
  const { getToggleProps, isExpanded } = useContext(AccordionContext);
  return (
    <h3>
      <button
        className={classNames(
          className,
          'focus-visible:outline-blue-dark flex w-full items-center justify-between p-4 text-left text-lg font-semibold focus:outline-none focus-visible:outline-4 focus-visible:outline-offset-0',
          isExpanded ? 'bg-green-dark text-white' : undefined,
        )}
        {...rest}
        {...getToggleProps()}
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
    </h3>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent = (props: AccordionContentProps) => {
  const { getCollapseProps } = useContext(AccordionContext);

  const { className, ...rest } = props;
  return (
    <div {...getCollapseProps()}>
      <div className={classNames(className, 'p-4')} {...rest} />
    </div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
