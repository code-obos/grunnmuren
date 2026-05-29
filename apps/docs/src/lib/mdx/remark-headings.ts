import { valueToEstree } from 'estree-util-value-to-estree';
import { toString } from 'mdast-util-to-string';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

type HeadingNode = {
  depth: number;
  data?: { hProperties?: Record<string, unknown> };
};

export type TocEntry = {
  id: string;
  text: string;
  depth: number;
};

/** Produces stable, URL-safe ASCII ids from heading text. */
function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string): string => {
    const base = text
      .toLowerCase()
      .replaceAll('æ', 'a')
      .replaceAll('ø', 'o')
      .replaceAll('å', 'a')
      .normalize('NFD') // splits accented chars into base + combining mark, e.g. `é` → `e` + `́`
      .replace(/\p{Mark}/gu, '') // strips the combining marks left behind by NFD
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9_-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

/**
 * Assigns stable slug ids to headings (matching the anchor links the docs
 * render) and exports a `toc` array of the h2 sections, mirroring the
 * table-of-contents behaviour the Sanity-driven pages had.
 *
 * Doing both in one pass guarantees the toc ids and the heading ids stay in
 * sync — they come from the same slugger run in document order.
 */
export function remarkHeadings() {
  return (tree: Node) => {
    const slugify = createSlugger();
    const toc: TocEntry[] = [];

    visit(tree, 'heading', (node) => {
      const heading = node as unknown as HeadingNode;
      const text = toString(node);
      const id = slugify(text);

      heading.data ??= {};
      heading.data.hProperties ??= {};
      heading.data.hProperties.id = id;

      if (heading.depth === 2) {
        toc.push({ id, text, depth: heading.depth });
      }
    });

    const esmNode = {
      type: 'mdxjsEsm',
      value: `export const toc = ${JSON.stringify(toc)}`,
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              source: null,
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'toc' },
                    init: valueToEstree(toc),
                  },
                ],
              },
            },
          ],
        },
      },
    };

    (tree as unknown as { children: unknown[] }).children.unshift(esmNode);
  };
}
