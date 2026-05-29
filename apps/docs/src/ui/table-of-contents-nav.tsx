import { cx } from 'cva';

export type TableOfContentsSection = {
  href: string;
  text: string;
};

type TableOfContentsNavProps = {
  className?: string;
  sections: TableOfContentsSection[];
};

const TableOfContentsNav = ({ className, sections }: TableOfContentsNavProps) => {
  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Innholdsfortegnelse"
      className={cx(className, 'prose mb-12 grid gap-x-8 gap-y-3 sm:grid-cols-2 md:mb-6')}
    >
      {sections.map(({ href, text }) => (
        <div key={href} className="w-fit">
          <a
            href={href}
            className="flex w-fit items-center gap-2 font-medium no-underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
          >
            <span aria-hidden="true" className="shrink-0">
              ↳
            </span>
            {text}
          </a>
        </div>
      ))}
    </nav>
  );
};

export { type TableOfContentsNavProps, TableOfContentsNav };
