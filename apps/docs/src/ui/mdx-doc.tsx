import { Child, CircusTent, Wrench } from '@obosbbl/grunnmuren-icons-react';
import { Alertbox, Content } from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';

import type * as props from '@/component-props';
import type { DocFrontmatter, DocModule } from '@/lib/content';
import type { TocEntry } from '@/lib/mdx/remark-headings';
import { AnchorHeading } from '@/ui/anchor-heading';
import { mdxComponents } from '@/ui/mdx-components';
import { PropsTable } from '@/ui/props-table';
import { ResourceLink, type ResourceLinkProps, ResourceLinks } from '@/ui/resource-links';
import { ScrollToTop } from '@/ui/scroll-to-top';

type Section = { href: string; text: string };

function MdxToc({
  toc,
  propsComponents,
  className,
}: {
  toc: TocEntry[];
  propsComponents?: string[];
  className?: string;
}) {
  const sections: Section[] = toc.map((entry) => ({ href: `#${entry.id}`, text: entry.text }));
  if (propsComponents && propsComponents.length > 0) {
    sections.push({ href: '#props', text: 'Props' });
  }

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
}

function DocResourceLinks({ links }: { links?: DocFrontmatter['resourceLinks'] }) {
  if (!links || links.length === 0) {
    return null;
  }
  return (
    <ResourceLinks className="mb-12">
      {links.map(
        ({ linkType = 'other', url }) =>
          url && <ResourceLink key={url} type={linkType as ResourceLinkProps['type']} href={url} />,
      )}
    </ResourceLinks>
  );
}

export function MdxComponentPage({
  doc,
  toc,
  frontmatter,
}: {
  doc: DocModule;
  toc: TocEntry[];
  frontmatter: DocFrontmatter;
}) {
  const MDXContent = doc.default;
  const propsComponents = frontmatter.propsComponents ?? [];

  return (
    <>
      <h1 className="heading-l my-12">{frontmatter.name}</h1>

      <DocResourceLinks links={frontmatter.resourceLinks} />
      <MdxToc toc={toc} propsComponents={propsComponents} />

      <div className="lg:relative lg:flex lg:gap-4">
        <div>
          {frontmatter.componentState === 'unreleased' && (
            <Alertbox variant="info" className="mb-12 w-fit" icon={Wrench} role="none">
              <Content>
                <p>
                  Denne komponenten er under utvikling og er ennå ikke utgitt på npm. Den vises ikke
                  i venstremenyen eller komponentoversikten før første release.
                </p>
              </Content>
            </Alertbox>
          )}

          {frontmatter.componentState === 'new' && (
            <Alertbox variant="success" className="mb-12 w-fit" icon={Child} role="none">
              <Content>
                <p>Denne komponenten er ny eller har nylig fått større endringer.</p>
                <p>
                  Ta den i bruk og kom gjerne med innspill til oss på{' '}
                  <a href="https://obos.slack.com/archives/C03FR05FJ9F">Slack</a> hvordan du synes
                  den fungerer.
                </p>
              </Content>
            </Alertbox>
          )}

          {frontmatter.componentState === 'beta' && (
            <Alertbox variant="warning" className="mb-12 w-fit" icon={CircusTent} role="none">
              <Content>
                <p>Denne komponenten er under aktiv utvikling, og vi trenger din feedback!</p>
                <p>
                  Er du eventyrlysten, test den og kom med innspill til oss på{' '}
                  <a href="https://obos.slack.com/archives/C03FR05FJ9F">Slack</a>.
                </p>
              </Content>
            </Alertbox>
          )}

          <div className="prose mb-12">
            <MDXContent components={mdxComponents} />
          </div>

          {propsComponents.length > 0 && (
            <AnchorHeading className="heading-m" level={2} id="props">
              Props
            </AnchorHeading>
          )}
          {propsComponents.map((componentName) => (
            <PropsTable key={componentName} componentName={componentName as keyof typeof props} />
          ))}
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}

export function MdxInfoPage({
  doc,
  toc,
  frontmatter,
}: {
  doc: DocModule;
  toc: TocEntry[];
  frontmatter: DocFrontmatter;
}) {
  const MDXContent = doc.default;

  return (
    <>
      <h1 className="heading-l my-12">{frontmatter.name}</h1>
      <DocResourceLinks links={frontmatter.resourceLinks} />
      <MdxToc toc={toc} />
      <div className="lg:relative lg:flex lg:gap-4 lg:pt-9">
        <div className="prose mb-12 grow">
          <MDXContent components={mdxComponents} />
        </div>
        <ScrollToTop />
      </div>
    </>
  );
}
