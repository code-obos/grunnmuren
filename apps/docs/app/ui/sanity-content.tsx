import { PortableText } from '@portabletext/react';
import { cx } from 'cva';
import type { COMPONENT_QUERYResult } from 'sanity.types';
import { AnchorHeading } from './anchor-heading';
import { Code } from './code';
import { ComponentPreview } from './component-preview';
import { ImageWithCaption } from './image-with-caption';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';

export type SanityContentProps = Pick<
  NonNullable<COMPONENT_QUERYResult>,
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
            'static-code-block': ({ value }) => (
              <Code value={value.code.code as string} />
            ),
            'image-with-caption': ({ value }) => (
              <ImageWithCaption
                src={value.asset.url}
                alt={value.alt ?? ''}
                caption={value.caption ?? ''}
              />
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
              <AnchorHeading level={2} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h3: ({ children, value }) => (
              <AnchorHeading level={3} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h4: ({ children, value }) => (
              <AnchorHeading level={4} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h5: ({ children, value }) => (
              <AnchorHeading level={5} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-medium">{children}</strong>
            ),
          },
        }}
      />
    </div>
  );
}
