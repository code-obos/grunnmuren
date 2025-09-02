import { cx } from 'cva';
import type { COMPONENT_QUERYResult } from 'sanity.types';

type TableOfContentsNavProps = {
  className?: string;
  content: NonNullable<COMPONENT_QUERYResult>['content'];
  propsTables?: string[] | null;
};

const TableOfContentsNav = ({
  className,
  content,
  propsTables,
}: TableOfContentsNavProps) => {
  const sections: Array<{
    href: string;
    text: string;
    subSections: Array<{ href: string; text: string }>;
  }> = [];

  for (const block of content ?? []) {
    // a h2 marks the start of a new section
    if (block._type === 'block' && block.style === 'h2') {
      const section = {
        href: `#${block._key}`,
        text: block.children?.[0].text ?? '',
        subSections: [],
      };

      sections.push(section);
    }
  }

  if (propsTables && propsTables.length > 0) {
    sections.push({
      href: '#props',
      text: 'Props',
      subSections: propsTables.map((componentName) => ({
        href: `#${componentName.toLowerCase()}-props`,
        text: componentName,
      })),
    });
  }

  return (
    <nav
      aria-label="Innholdsfortegnelse"
      className={cx(
        className,
        'prose mb-12 flex w-fit flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 md:mb-6',
      )}
    >
      {sections?.map(({ href, text }) => (
        <div key={href} className="w-fit sm:basis-[calc(50%-1rem)]">
          <a
            href={href}
            className="flex w-fit items-center gap-2 font-medium no-underline focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
          >
            <span aria-hidden="true">↳</span>
            {text}
          </a>
        </div>
      ))}
    </nav>
  );
};

export { type TableOfContentsNavProps, TableOfContentsNav };
