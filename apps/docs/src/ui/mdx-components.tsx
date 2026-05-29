import type { ReactNode } from 'react';

import { AnchorHeading } from './anchor-heading';
import { Code } from './code';
import { ComponentPreview } from './component-preview';
import { Image } from './mdx-image';
import { StorybookEmbed } from './storybook-embed';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';

type WithChildren = { children?: ReactNode };
type HeadingProps = WithChildren & { id?: string };

/**
 * Component overrides passed to every rendered MDX document.
 *
 * - Headings become anchor headings (so the table of contents can link to
 *   them), matching the old Sanity Portable Text rendering.
 * - GFM table elements map onto the Grunnmuren table primitives.
 * - `ComponentPreview` / `Code` are produced by the remark-code-blocks plugin,
 *   while `Image` / `StorybookEmbed` are authored directly in the MDX.
 */
export const mdxComponents = {
  ComponentPreview,
  Code,
  Image,
  StorybookEmbed,

  h2: ({ children, id }: HeadingProps) => (
    <AnchorHeading level={2} id={id ?? ''} className="heading-m">
      {children}
    </AnchorHeading>
  ),
  h3: ({ children, id }: HeadingProps) => (
    <AnchorHeading level={3} id={id ?? ''} className="heading-s">
      {children}
    </AnchorHeading>
  ),
  h4: ({ children, id }: HeadingProps) => (
    <AnchorHeading level={4} id={id ?? ''} className="heading-xs">
      {children}
    </AnchorHeading>
  ),
  h5: ({ children, id }: HeadingProps) => (
    <AnchorHeading level={5} id={id ?? ''} className="font-weight-semibold">
      {children}
    </AnchorHeading>
  ),

  table: ({ children }: WithChildren) => <Table>{children}</Table>,
  thead: ({ children }: WithChildren) => <TableHead>{children}</TableHead>,
  tbody: ({ children }: WithChildren) => <TableBody>{children}</TableBody>,
  tr: ({ children }: WithChildren) => <TableRow>{children}</TableRow>,
  th: ({ children }: WithChildren) => <TableCell>{children}</TableCell>,
  td: ({ children }: WithChildren) => <TableCell>{children}</TableCell>,
};
