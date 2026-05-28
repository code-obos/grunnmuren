import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

type CodeNode = {
  lang?: string | null;
  meta?: string | null;
  value: string;
};

type JsxAttribute = {
  type: 'mdxJsxAttribute';
  name: string;
  value: string;
};

function parseMeta(meta: string | null | undefined) {
  const value = meta ?? '';
  const isLive = /(?:^|\s)live(?:\s|$)/.test(value);
  const captionMatch = value.match(/caption="([^"]*)"/);
  return { isLive, caption: captionMatch?.[1] };
}

/**
 * Turns fenced code blocks into the docs' interactive components:
 * - ```tsx live  → <ComponentPreview> (react-live editable preview)
 * - ```tsx | ```bash  → <Code> (static, syntax highlighted with copy button)
 *
 * The code lives literally inside the fence, so special characters
 * (`<`, `{`, quotes, newlines) need no escaping in the MDX source — we
 * build the JSX node from the raw fence value and let the MDX compiler
 * emit a properly escaped string literal.
 *
 * An optional caption is read from the fence meta: ```tsx live caption="…"
 */
export function remarkCodeBlocks() {
  return (tree: Node) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index == null) {
        return;
      }

      const code = node as unknown as CodeNode;
      const { isLive, caption } = parseMeta(code.meta);

      const attributes: JsxAttribute[] = [
        { type: 'mdxJsxAttribute', name: 'code', value: code.value },
      ];

      if (!isLive) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'language',
          value: code.lang ?? 'tsx',
        });
      }

      if (caption) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'caption', value: caption });
      }

      (parent as unknown as { children: unknown[] }).children[index] = {
        type: 'mdxJsxFlowElement',
        name: isLive ? 'ComponentPreview' : 'Code',
        attributes,
        children: [],
      };
    });
  };
}
