import { PortableText } from '@portabletext/react';
import { cx } from 'cva';
import type { COMPONENT_QUERY_RESULT } from 'sanity.types';
import { AnchorHeading } from './anchor-heading';
import { Code } from './code';
import { ComponentPreview } from './component-preview';
import { ImageWithCaption } from './image-with-caption';
import { StorybookEmbed } from './storybook-embed';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';

export type SanityContentProps = Pick<
  NonNullable<COMPONENT_QUERY_RESULT>,
  'content'
> & {
  className?: string;
};

export function SanityContent({ content, className }: SanityContentProps) {
  return (
    <div className={cx('prose', className)}>
      <PortableText
        value={content ?? []}
        components={{
          types: {
            'live-code-block': ({ value }) => (
              <ComponentPreview
                caption={value.caption}
                code={value.code.code}
              />
            ),
            'storybook-embed': ({ value }) => (
              <StorybookEmbed
                id={value._key}
                caption={value.caption}
                storyId={value.storyId}
              />
            ),
            'static-code-block': ({ value }) => (
              <Code
                code={value.code.code}
                language={value.code.language}
                caption={value.caption}
              />
            ),
            'image-with-caption': ({ value }) => (
              <ImageWithCaption asset={value} />
            ),
            table: ({ value: { rows } }) => {
              const [firstRow, ...restRows] = rows;
              return (
                <Table>
                  <TableHead>
                    {/**
                     * Due to limitations in the @sanity/table plugin,
                     * we just have to assume that the first row is the thead:
                     * https://www.sanity.io/answers/discussion-about-the-limitations-of-a-table-plugin-and-alternative-solutions-for-creating-tables-in-sanity-io-
                     */}
                    <TableRow key={firstRow._key}>
                      {firstRow.cells.map((cell) => (
                        <TableCell key={`${firstRow._key}-${cell}`}>
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {restRows.map((row) => (
                      <TableRow key={row._key}>
                        {row.cells.map((cell) => (
                          <TableCell key={`${row._key}-${cell}`}>
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              );
            },
          },
          block: {
            h2: ({ children, value }) => (
              <AnchorHeading
                level={2}
                id={value._key ?? ''}
                className="heading-m"
              >
                {children}
              </AnchorHeading>
            ),
            h3: ({ children, value }) => (
              <AnchorHeading
                level={3}
                id={value._key ?? ''}
                className="heading-s"
              >
                {children}
              </AnchorHeading>
            ),
            h4: ({ children, value }) => (
              <AnchorHeading
                level={4}
                id={value._key ?? ''}
                className="heading-xs"
              >
                {children}
              </AnchorHeading>
            ),
            h5: ({ children, value }) => (
              <AnchorHeading
                level={5}
                id={value._key ?? ''}
                className="font-weight-semibold"
              >
                {children}
              </AnchorHeading>
            ),
            hr: () => <hr />,
          },
        }}
      />
    </div>
  );
}
