/**
 * Migrates Grunnmuren documentation from Sanity (Portable Text) to MDX files
 * committed in the repo, downloading and optimising the referenced images.
 *
 * Usage:
 *   node migration/sanity-to-mdx.ts                 # migrate all components + info docs
 *   node migration/sanity-to-mdx.ts component:card info:bildestil   # specific docs
 *
 * Output:
 *   src/content/komponenter/<slug>.mdx   (+ images/<slug>/<n>.webp)
 *   src/content/info/<slug>.mdx          (+ images/<slug>/<n>.webp)
 *
 * Images are converted to WebP and capped at 2000px wide to keep the repo
 * light; see `pnpm lint:images` and CONTRIBUTING for the size budget.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createClient } from '@sanity/client';
import sharp from 'sharp';

const PROJECT_ID = 'tq6w17ny';
const DATASET = 'grunnmuren';
const API_VERSION = '2026-04-27';
const MAX_WIDTH = 2000;
const MAX_BYTES = 250 * 1024;
const QUALITY_STEPS = [80, 72, 64, 56, 48];

const DIR_BY_TYPE: Record<string, string> = {
  component: 'komponenter',
  info: 'info',
};

const here = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(here, '..', 'src', 'content');

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
  perspective: 'published',
});

type Span = {
  _type: string;
  text?: string;
  marks?: string[];
};

type MarkDef = { _key: string; _type: string; href?: string };

type Block = {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Span[];
  markDefs?: MarkDef[];
  // custom blocks
  code?: { code?: string; language?: string };
  caption?: string;
  storyId?: string;
  alt?: string;
  // resolved image fields
  url?: string;
  w?: number;
  h?: number;
};

type Doc = {
  name?: string;
  slug?: string;
  componentState?: string;
  propsComponents?: string[];
  resourceLinks?: { linkType?: string; url?: string }[];
  content?: (Block | null)[];
};

type ImageRef = { url: string; w: number; h: number; index: number };

// --- text serialisation ------------------------------------------------------

/** Escape the characters that would otherwise be interpreted by MDX/markdown. */
function escapeText(text: string): string {
  return text
    .replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('<', '\\<')
    .replaceAll('{', '\\{');
}

/** Escape a value used inside a JSX double-quoted attribute. */
function escapeAttr(text: string): string {
  return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

function serializeSpan(span: Span, markDefs: MarkDef[]): string {
  const marks = span.marks ?? [];
  // Collapse embedded newlines to spaces — they're whitespace in HTML rendering
  // and would otherwise break markdown line semantics inside a heading or paragraph.
  const raw = (span.text ?? '').replace(/\n+/g, ' ');

  // Don't wrap empty/whitespace spans — that would emit stray `****`, `__` etc.
  if (raw.trim() === '') {
    return raw;
  }

  let text = marks.includes('code') ? `\`${raw}\`` : escapeText(raw);

  if (marks.includes('em')) {
    text = `_${text}_`;
  }
  if (marks.includes('strong')) {
    text = `**${text}**`;
  }

  const linkKey = marks.find((m) => m !== 'code' && m !== 'em' && m !== 'strong');
  if (linkKey) {
    const def = markDefs.find((d) => d._key === linkKey);
    if (def?._type === 'link' && def.href) {
      text = `[${text}](${def.href})`;
    }
  }

  return text;
}

function blockText(block: Block): string {
  const markDefs = block.markDefs ?? [];
  return (block.children ?? [])
    .map((span) => serializeSpan(span, markDefs))
    .join('')
    .trim();
}

/** Pick a fence length longer than any backtick run inside the code. */
function fence(rawCode: string, lang: string, isLive: boolean, caption?: string): string {
  const code = rawCode.trim();
  const longestRun = Math.max(0, ...[...code.matchAll(/`+/g)].map((m) => m[0].length));
  const ticks = '`'.repeat(Math.max(3, longestRun + 1));
  const meta = [
    lang,
    isLive ? 'live' : '',
    caption ? `caption="${caption.replaceAll('"', "'")}"` : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `${ticks}${meta}\n${code}\n${ticks}`;
}

function tableToGfm(block: Block & { rows?: { cells?: string[] }[] }): string {
  const rows = block.rows ?? [];
  if (rows.length === 0) {
    return '';
  }
  const toRow = (cells: string[] = []) =>
    `| ${cells.map((c) => escapeText(c).replaceAll('|', '\\|')).join(' | ')} |`;
  const [header, ...rest] = rows;
  const headerCells = header.cells ?? [];
  const divider = `| ${headerCells.map(() => '---').join(' | ')} |`;
  return [toRow(headerCells), divider, ...rest.map((r) => toRow(r.cells))].join('\n');
}

function targetDimensions(w?: number, h?: number) {
  if (!w || !h) {
    return {};
  }
  if (w <= MAX_WIDTH) {
    return { width: w, height: h };
  }
  return { width: MAX_WIDTH, height: Math.round((h * MAX_WIDTH) / w) };
}

function imageTag(block: Block, images: ImageRef[]): string {
  if (!block.url) {
    return '';
  }
  const index = images.length;
  images.push({ url: block.url, w: block.w ?? 0, h: block.h ?? 0, index });
  const { width, height } = targetDimensions(block.w, block.h);
  const attrs = [
    `src={img${index}}`,
    `alt="${escapeAttr(block.alt ?? '')}"`,
    block.caption ? `caption="${escapeAttr(block.caption)}"` : '',
    width ? `width={${width}}` : '',
    height ? `height={${height}}` : '',
  ].filter(Boolean);
  return `<Image ${attrs.join(' ')} />`;
}

function serializeContent(blocks: (Block | null)[], images: ImageRef[]): string {
  const out: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    if (!block) {
      i++;
      continue;
    }

    if (block._type === 'block') {
      if (block.listItem) {
        const items: string[] = [];
        while (i < blocks.length) {
          const b = blocks[i];
          if (!b || b._type !== 'block' || !b.listItem) {
            break;
          }
          const indent = '  '.repeat((b.level ?? 1) - 1);
          const marker = b.listItem === 'number' ? '1.' : '-';
          items.push(`${indent}${marker} ${blockText(b)}`);
          i++;
        }
        out.push(items.join('\n'));
        continue;
      }

      const text = blockText(block);
      switch (block.style) {
        case 'h2':
          out.push(`## ${text}`);
          break;
        case 'h3':
          out.push(`### ${text}`);
          break;
        case 'h4':
          out.push(`#### ${text}`);
          break;
        case 'h5':
          out.push(`##### ${text}`);
          break;
        case 'blockquote':
          out.push(`> ${text}`);
          break;
        case 'hr':
          out.push('---');
          break;
        default:
          if (text.trim()) {
            out.push(text);
          }
      }
      i++;
      continue;
    }

    switch (block._type) {
      case 'live-code-block':
        out.push(fence(block.code?.code ?? '', 'tsx', true, block.caption));
        break;
      case 'static-code-block':
        out.push(
          fence(block.code?.code ?? '', block.code?.language ?? 'tsx', false, block.caption),
        );
        break;
      case 'storybook-embed':
        out.push(
          `<StorybookEmbed storyId="${block.storyId ?? ''}"${
            block.caption ? ` caption="${escapeAttr(block.caption)}"` : ''
          } />`,
        );
        break;
      case 'image-with-caption':
        out.push(imageTag(block, images));
        break;
      case 'table':
        out.push(tableToGfm(block));
        break;
      default:
        console.warn(`  ⚠ skipping unknown block type: ${block._type}`);
    }
    i++;
  }

  return out.join('\n\n');
}

// --- frontmatter -------------------------------------------------------------

function frontmatter(doc: Doc, type: string): string {
  const lines = [
    '---',
    `name: ${JSON.stringify(doc.name ?? '')}`,
    `slug: ${JSON.stringify(doc.slug)}`,
  ];

  if (type === 'component' && doc.componentState) {
    lines.push(`componentState: ${doc.componentState}`);
  }

  if (doc.propsComponents?.length) {
    lines.push('propsComponents:');
    for (const c of doc.propsComponents) lines.push(`  - ${JSON.stringify(c)}`);
  }

  if (doc.resourceLinks?.length) {
    lines.push('resourceLinks:');
    for (const link of doc.resourceLinks) {
      lines.push(`  - linkType: ${JSON.stringify(link.linkType ?? 'other')}`);
      lines.push(`    url: ${JSON.stringify(link.url ?? '')}`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

// --- images ------------------------------------------------------------------

async function processImage(image: ImageRef, destPath: string): Promise<number> {
  const res = await fetch(image.url);
  if (!res.ok) {
    throw new Error(`Failed to download ${image.url}: ${res.status}`);
  }
  const input = Buffer.from(await res.arrayBuffer());

  const base = image.w > MAX_WIDTH ? sharp(input).resize({ width: MAX_WIDTH }) : sharp(input);

  // Step the quality down until we're under the size budget, so committed
  // images always pass `pnpm lint:images`.
  let output = await base.clone().webp({ quality: QUALITY_STEPS[0] }).toBuffer();
  for (const quality of QUALITY_STEPS.slice(1)) {
    if (output.byteLength <= MAX_BYTES) {
      break;
    }
    output = await base.clone().webp({ quality }).toBuffer();
  }

  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, output);
  return output.byteLength;
}

// --- per-document migration --------------------------------------------------

const CONTENT_QUERY = `*[_type == $type && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  name, "slug": slug.current, componentState, propsComponents, resourceLinks,
  content[]{
    ...,
    _type == "image-with-caption" => {
      _type, _key, alt, caption,
      "url": asset->url,
      "w": asset->metadata.dimensions.width,
      "h": asset->metadata.dimensions.height
    }
  }
}`;

async function migrate(type: string, slug: string) {
  const doc: Doc | null = await client.fetch(CONTENT_QUERY, { type, slug });
  if (!doc) {
    console.error(`✗ ${type}:${slug} not found`);
    return;
  }

  const blocks = (doc.content ?? []).filter((block): block is Block => block != null);
  if (blocks.length === 0) {
    console.log(`- ${type}:${slug}: no content, skipping (likely a hardcoded route)`);
    return;
  }

  const dir = DIR_BY_TYPE[type];
  const images: ImageRef[] = [];
  const body = serializeContent(blocks, images);

  const imports = images
    .map((img) => `import img${img.index} from './images/${slug}/${img.index}.webp';`)
    .join('\n');

  const parts = [frontmatter(doc, type), imports, body].filter(Boolean);
  const mdxPath = join(contentRoot, dir, `${slug}.mdx`);
  await mkdir(dirname(mdxPath), { recursive: true });
  await writeFile(mdxPath, `${parts.join('\n\n')}\n`);

  let totalBytes = 0;
  for (const img of images) {
    const dest = join(contentRoot, dir, 'images', slug, `${img.index}.webp`);
    const bytes = await processImage(img, dest);
    totalBytes += bytes;
  }

  console.log(
    `✓ ${type}:${slug} → ${dir}/${slug}.mdx (${doc.content?.length ?? 0} blocks, ${images.length} images, ${(totalBytes / 1024).toFixed(0)} KB)`,
  );
}

async function listSlugs(type: string): Promise<string[]> {
  return client.fetch(`*[_type == $type && !(_id in path("drafts.**"))].slug.current`, { type });
}

async function main() {
  const args = process.argv.slice(2);

  let targets: { type: string; slug: string }[];
  if (args.length > 0) {
    targets = args.map((arg) => {
      const [type, slug] = arg.split(':');
      return { type, slug };
    });
  } else {
    targets = [];
    for (const type of ['component', 'info']) {
      const slugs = await listSlugs(type);
      for (const slug of slugs) if (slug) targets.push({ type, slug });
    }
  }

  console.log(`Migrating ${targets.length} document(s)…`);
  for (const { type, slug } of targets) {
    await migrate(type, slug);
  }
}

await main();
