import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { __unstable__loadDesignSystem } from '@tailwindcss/node';

const TAILWIND_BASE_CSS = resolve(import.meta.dirname, '../tailwind-base.css');
const TOKENS_INDEX_CSS = resolve(import.meta.dirname, '../tokens/index.css');

// Tailwind flags theme entries that come from its own `@theme default` block with
// this bit. Everything without it is a token we declare ourselves.
const TAILWIND_DEFAULT_TOKEN = 4;

// `var(--a)` can resolve to a value that itself contains `var(--b)`, so resolution
// loops. The guard is only there so a circular token can't hang the test run.
const MAX_RESOLVE_DEPTH = 10;

// Only matches a plain reference. `var(--x, fallback)` is left alone, since the
// fallback is what the browser uses when the property isn't set at runtime.
const THEME_VARIABLE = /var\((--[\w-]+)\)/g;
const THEME_VARIABLE_REFERENCE = /var\((--[\w-]+)/g;

const CSS_COMMENT = /\/\*[\s\S]*?\*\//g;
const CSS_IMPORT = /@import\s+['"]([^'"]+)['"]/g;
const CUSTOM_PROPERTY = /^\s*(--[\w-]+)\s*:\s*([^;]+?)\s*$/;

// Tokens mix `#fff` and `#FFFFFF`. Normalising means two values only compare as
// different when the colour is, instead of when the spelling is.
const HEX_COLOR = /#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi;

// `--tw-*` are custom properties Tailwind sets on the element at runtime, not tokens.
const isThemeToken = (token: string) => !token.startsWith('--tw-');

type DesignSystem = Awaited<ReturnType<typeof __unstable__loadDesignSystem>>;
type AstNode = ReturnType<DesignSystem['candidatesToAst']>[number][number];

/** A single CSS declaration a utility compiles to, with theme variables resolved to literal values. */
export type ResolvedDeclaration = {
  /**
   * The at-rules and variant selector the declaration sits under, e.g. `@media (hover: hover) &:hover`,
   * with `&` standing in for the utility's own class. Empty at the top level.
   */
  condition: string;
  property: string;
  value: string;
};

let designSystem: Promise<DesignSystem> | undefined;

/**
 * Compiles `tailwind-base.css` in memory, imports and all. Cached, because it takes
 * about a second and the stylesheet can't change during a run.
 */
export const loadDesignSystem = () => {
  designSystem ??= readFile(TAILWIND_BASE_CSS, 'utf8').then((css) =>
    __unstable__loadDesignSystem(css, { base: dirname(TAILWIND_BASE_CSS) }),
  );
  return designSystem;
};

/**
 * Splits a stylesheet into its top-level blocks as `[prelude, body]`. Only goes one level
 * deep, which is all the token files need: an at-rule like `@media` comes back as a single
 * block, so the `:root` nested inside the reduced-motion query is never read.
 */
const topLevelBlocks = (css: string): Array<[string, string]> => {
  const blocks: Array<[string, string]> = [];
  let depth = 0;
  let start = 0;
  let prelude = '';

  for (let index = 0; index < css.length; index++) {
    if (css[index] === '{') {
      if (depth === 0) {
        // Statements like `@import` end in `;` and sit in front of the next selector
        prelude = css.slice(start, index).split(';').at(-1)?.trim() ?? '';
        start = index + 1;
      }
      depth++;
    } else if (css[index] === '}') {
      depth--;
      if (depth === 0) {
        blocks.push([prelude, css.slice(start, index)]);
        start = index + 1;
      }
    }
  }

  return blocks;
};

// The defaults are wrapped in `:where()` to keep their specificity at zero. That changes
// nothing about which elements they match, so it's unwrapped before comparing.
const WHERE = /^:where\(([\s\S]*)\)$/;

const selectors = (prelude: string) =>
  (prelude.match(WHERE)?.[1] ?? prelude).split(',').map((selector) => selector.trim());

const readCustomProperties = async (
  file: string,
  selector: string,
): Promise<Array<[string, string]>> => {
  const css = (await readFile(file, 'utf8')).replaceAll(CSS_COMMENT, '');

  return topLevelBlocks(css)
    .filter(([prelude]) => selectors(prelude).includes(selector))
    .flatMap(([, body]) =>
      body.split(';').flatMap((declaration): Array<[string, string]> => {
        const match = declaration.match(CUSTOM_PROPERTY);
        return match ? [[match[1], match[2]]] : [];
      }),
    );
};

let rootCustomProperties: Promise<Map<string, string>> | undefined;

/**
 * The `--gm-*` custom properties the token files declare on a top-level `:root`, in
 * import order. Tailwind's design system only models `@theme`, so without this every
 * `@theme inline` mapping would resolve to an unresolvable `var(--gm-…)`.
 *
 * Only rules that include `:root` are read, which is the defaults. A theme and the other
 * `data-color` roles are selectors of their own, and the reduced-motion values sit inside
 * an `@media`, so none of them leak in.
 */
export const loadRootCustomProperties = () => {
  rootCustomProperties ??= readFile(TOKENS_INDEX_CSS, 'utf8').then(async (index) => {
    const files = [...index.replaceAll(CSS_COMMENT, '').matchAll(CSS_IMPORT)].map(([, path]) =>
      resolve(dirname(TOKENS_INDEX_CSS), path),
    );
    // Later files win, same as the cascade does for two `:root` rules
    return new Map(
      (await Promise.all(files.map((file) => readCustomProperties(file, ':root')))).flat(),
    );
  });
  return rootCustomProperties;
};

/** What a theme in `tokens/themes/` sets on its `[data-theme]`, by the theme's name. */
export const loadThemeCustomProperties = async (theme: string) =>
  new Map(
    await readCustomProperties(
      resolve(dirname(TOKENS_INDEX_CSS), `themes/${theme}.css`),
      `[data-theme="${theme}"]`,
    ),
  );

const normalizeHexColors = (value: string) =>
  value.replaceAll(HEX_COLOR, (_, hex: string) => {
    const expanded = hex.length <= 4 ? hex.replaceAll(/./g, '$&$&') : hex;
    return `#${expanded.toLowerCase()}`;
  });

const resolveVariables = (
  designSystem: DesignSystem,
  rootProperties: Map<string, string>,
  value: string,
  depth = 0,
): string => {
  if (depth >= MAX_RESOLVE_DEPTH) return value;

  const resolved = value.replaceAll(
    THEME_VARIABLE,
    (variable, token: string) =>
      designSystem.resolveThemeValue(token) ?? rootProperties.get(token) ?? variable,
  );

  return resolved === value
    ? resolved
    : resolveVariables(designSystem, rootProperties, resolved, depth + 1);
};

const resolveThemeVariables = (
  designSystem: DesignSystem,
  rootProperties: Map<string, string>,
  value: string,
) => normalizeHexColors(resolveVariables(designSystem, rootProperties, value));

// Same escaping as `CSS.escape`, which isn't available in Node
const escapeClassName = (candidate: string) =>
  candidate
    .replaceAll(/[^\w-]/g, '\\$&')
    .replace(/^\d/, (digit) => `\\${digit.charCodeAt(0).toString(16)} `);

const toCondition = (...parts: Array<string>) => parts.filter(Boolean).join(' ');

const collectDeclarations = (
  designSystem: DesignSystem,
  rootProperties: Map<string, string>,
  nodes: Array<AstNode>,
  className: string,
  condition = '',
): Array<ResolvedDeclaration> =>
  nodes.flatMap((node): Array<ResolvedDeclaration> => {
    switch (node.kind) {
      case 'declaration':
        if (node.value == null) return [];
        return [
          {
            condition,
            property: node.property,
            value: resolveThemeVariables(designSystem, rootProperties, node.value),
          },
        ];

      // The utility's own class differs within every pair by definition, so only what
      // the variant adds to the selector (`:hover`, `.group:hover *`) is compared
      case 'rule': {
        if (!node.selector.includes(className)) {
          throw new Error(
            `Unexpected selector \`${node.selector}\`, expected it to contain \`${className}\``,
          );
        }
        const variantSelector = node.selector.replace(className, '&');
        return collectDeclarations(
          designSystem,
          rootProperties,
          node.nodes,
          className,
          variantSelector === '&' ? condition : toCondition(condition, variantSelector),
        );
      }

      case 'at-root':
      case 'context':
        return collectDeclarations(designSystem, rootProperties, node.nodes, className, condition);

      case 'at-rule':
        // `@property` only declares the contract for a `--tw-*` custom property,
        // it isn't part of what the utility computes to
        if (node.name === '@property') return [];
        return collectDeclarations(
          designSystem,
          rootProperties,
          node.nodes,
          className,
          toCondition(condition, `${node.name} ${node.params}`),
        );

      default:
        return [];
    }
  });

/**
 * Everything a utility class computes to, with theme variables resolved to literal
 * values. Throws when the candidate isn't a real utility, so a typo in the pair list
 * fails the test instead of silently comparing nothing.
 */
export const resolveUtility = async (candidate: string): Promise<Array<ResolvedDeclaration>> => {
  const [designSystem, rootProperties] = await Promise.all([
    loadDesignSystem(),
    loadRootCustomProperties(),
  ]);
  const [ast] = designSystem.candidatesToAst([candidate]);

  if (!ast || ast.length === 0) {
    throw new Error(`\`${candidate}\` does not compile to anything in tailwind-base.css`);
  }

  return collectDeclarations(designSystem, rootProperties, ast, `.${escapeClassName(candidate)}`);
};

/** Renders declarations as stable one-liners, for snapshots and assertion messages. */
export const formatDeclarations = (declarations: Array<ResolvedDeclaration>): Array<string> =>
  declarations.map(({ condition, property, value }) =>
    condition ? `${condition} { ${property}: ${value} }` : `${property}: ${value}`,
  );

/** The tokens Grunnmuren declares on top of Tailwind, without Tailwind's own palette and scales. */
export const getGrunnmurenTokens = async (): Promise<Record<string, string>> => {
  const [designSystem, rootProperties] = await Promise.all([
    loadDesignSystem(),
    loadRootCustomProperties(),
  ]);

  return Object.fromEntries(
    [...designSystem.theme.entries()]
      .filter(([, entry]) => (entry.options & TAILWIND_DEFAULT_TOKEN) === 0)
      .map(([token, entry]) => [
        token,
        resolveThemeVariables(designSystem, rootProperties, entry.value),
      ]),
  );
};

/**
 * A single token resolved to its literal value, whether it lives in `@theme` or is one of
 * the `--gm-*` custom properties. Throws when it resolves to nothing, so a typo in a test
 * fails instead of comparing an unresolved `var()` against itself.
 *
 * `overrides` are laid over the defaults before resolving, the way a theme's primitives
 * are on a `[data-theme]` element. Works because the token layers are declared again on
 * every `[data-theme]`, so the roles there are computed from the theme's primitives.
 */
export const resolveToken = async (
  token: string,
  overrides: Map<string, string> = new Map(),
): Promise<string> => {
  const [designSystem, rootProperties] = await Promise.all([
    loadDesignSystem(),
    loadRootCustomProperties(),
  ]);
  const value = resolveThemeVariables(
    designSystem,
    new Map([...rootProperties, ...overrides]),
    `var(${token})`,
  );

  if (value.includes('var(')) {
    throw new Error(`\`${token}\` does not resolve to a value, got \`${value}\``);
  }

  return value;
};

/**
 * Tokens whose value points at a token that doesn't exist, reported as `from -> to`.
 * Catches drift between the `@theme` block and whatever maps onto it, including an
 * `@theme inline` mapping that points at a `--gm-*` property nobody declared.
 */
export const findBrokenTokenReferences = async (): Promise<Array<string>> => {
  const designSystem = await loadDesignSystem();
  const tokens = await getGrunnmurenTokens();

  return Object.entries(tokens).flatMap(([token, value]) =>
    [...value.matchAll(THEME_VARIABLE_REFERENCE)]
      .map(([, reference]) => reference)
      .filter(
        (reference) => isThemeToken(reference) && designSystem.resolveThemeValue(reference) == null,
      )
      .map((reference) => `${token} -> ${reference}`),
  );
};
