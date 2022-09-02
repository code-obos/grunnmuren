import { ChevronDown } from '@obosbbl/grunnmuren-icons';

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
        <summary className="border-gray-concrete group-open:bg-green-dark flex cursor-pointer select-none list-none items-center justify-between border-b-2 border-solid px-5 py-4 text-lg font-semibold hover:bg-gray-100 group-open:border-none group-open:text-white">
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
