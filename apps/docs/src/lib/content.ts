import type { ComponentType } from 'react';

import type { TocEntry } from './mdx/remark-headings';

export type ResourceLinkData = { linkType?: string; url?: string };

export type DocFrontmatter = {
  name?: string;
  slug?: string;
  /**
   * Lifecycle of a component. `unreleased` hides the page from the left nav
   * and the components overview (page is still reachable by URL) and is
   * rewritten to `new` automatically when changesets cuts a release — see
   * `apps/docs/scripts/strip-unreleased.ts`.
   */
  componentState?: 'unreleased' | 'new' | 'beta' | 'stable' | 'deprecated';
  propsComponents?: string[];
  resourceLinks?: ResourceLinkData[];
};

export type DocModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter: DocFrontmatter;
  toc: TocEntry[];
};

function bySlug(modules: Record<string, unknown>): Record<string, DocModule> {
  const map: Record<string, DocModule> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const slug = path.split('/').pop()?.replace('.mdx', '');
    if (slug) {
      map[slug] = mod as DocModule;
    }
  }
  return map;
}

/** All migrated docs, keyed by slug. Sanity is used as fallback for the rest. */
export const componentDocs = bySlug(
  import.meta.glob('../content/komponenter/*.mdx', { eager: true }),
);
export const infoDocs = bySlug(import.meta.glob('../content/info/*.mdx', { eager: true }));
