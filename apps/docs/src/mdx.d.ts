declare module '*.mdx' {
  import type { ComponentType } from 'react';

  import type { TocEntry } from '@/lib/mdx/remark-headings';

  /** Parsed YAML frontmatter, exposed via remark-mdx-frontmatter. */
  export const frontmatter: Record<string, unknown>;

  /** h2 sections, injected by the remark-headings plugin. */
  export const toc: TocEntry[];

  const MDXContent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXContent;
}
