import { ChevronDown } from '@obosbbl/grunnmuren-icons';
import classNames from 'clsx';

export interface AccordionProps {
  heading: string;
  children: React.ReactNode;

  /* This is mostly used for GA Tracking */
  onClick?: () => void;
}

export const Accordion = ({ heading, children, onClick }: AccordionProps) => {
  return (
    <section className="w-full" onClick={onClick}>
      <h3 className="sr-only">{heading}</h3>
      <details className="border-green open:border-green-dark group rounded-sm border-l-4 border-solid">
        <summary
          className={classNames(
            'group-open:bg-green-dark group-open:border-b-transparent group-open:text-white',
            'focus-visible:border-blue-dark group-open:focus-visible:border-b-blue-dark focus-visible:-mb-[1px] focus-visible:border-[3px]',
            'border-gray-concrete flex cursor-pointer select-none list-none items-center justify-between border-[3px] border-b-2 border-solid border-x-transparent border-t-transparent px-4 py-4 text-lg font-semibold hover:bg-gray-100',
          )}
        >
          {heading}
          <ChevronDown className="duration-100 ease-linear group-open:rotate-180" />
        </summary>
        <div className="border-gray-concrete border-solid px-4 group-open:border-b-2">
          {children}
        </div>
      </details>
    </section>
  );
};
