import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { __unstable__loadDesignSystem } from '@tailwindcss/node';

const TAILWIND_BASE_CSS = resolve(import.meta.dirname, '../tailwind-base.css');

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

// `--tw-*` are custom properties Tailwind sets on the element at runtime, not tokens.
const isThemeToken = (token: string) => !token.startsWith('--tw-');

type DesignSystem = Awaited<ReturnType<typeof __unstable__loadDesignSystem>>;
type AstNode = ReturnType<DesignSystem['candidatesToAst']>[number][number];

/** A single CSS declaration a utility compiles to, with theme variables resolved to literal values. */
export type ResolvedDeclaration = {
  /** The at-rule chain the declaration sits under, e.g. `@media (width >= 64rem)`. Empty at the top level. */
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

const resolveThemeVariables = (designSystem: DesignSystem, value: string, depth = 0): string => {
  if (depth >= MAX_RESOLVE_DEPTH) return value;

  const resolved = value.replaceAll(
    THEME_VARIABLE,
    (variable, token: string) => designSystem.resolveThemeValue(token) ?? variable,
  );

  return resolved === value ? resolved : resolveThemeVariables(designSystem, resolved, depth + 1);
};

const collectDeclarations = (
  designSystem: DesignSystem,
  nodes: Array<AstNode>,
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
            value: resolveThemeVariables(designSystem, node.value),
          },
        ];

      case 'rule':
      case 'at-root':
      case 'context':
        return collectDeclarations(designSystem, node.nodes, condition);

      case 'at-rule':
        // `@property` only declares the contract for a `--tw-*` custom property,
        // it isn't part of what the utility computes to
        if (node.name === '@property') return [];
        return collectDeclarations(
          designSystem,
          node.nodes,
          [condition, `${node.name} ${node.params}`].filter(Boolean).join(' '),
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
  const designSystem = await loadDesignSystem();
  const [ast] = designSystem.candidatesToAst([candidate]);

  if (!ast || ast.length === 0) {
    throw new Error(`\`${candidate}\` does not compile to anything in tailwind-base.css`);
  }

  return collectDeclarations(designSystem, ast);
};

/** Renders declarations as stable one-liners, for snapshots and assertion messages. */
export const formatDeclarations = (declarations: Array<ResolvedDeclaration>): Array<string> =>
  declarations.map(({ condition, property, value }) =>
    condition ? `${condition} { ${property}: ${value} }` : `${property}: ${value}`,
  );

/** The tokens Grunnmuren declares on top of Tailwind, without Tailwind's own palette and scales. */
export const getGrunnmurenTokens = async (): Promise<Record<string, string>> => {
  const designSystem = await loadDesignSystem();

  return Object.fromEntries(
    [...designSystem.theme.entries()]
      .filter(([, entry]) => (entry.options & TAILWIND_DEFAULT_TOKEN) === 0)
      .map(([token, entry]) => [token, resolveThemeVariables(designSystem, entry.value)]),
  );
};

/**
 * Tokens whose value points at a token that doesn't exist, reported as `from -> to`.
 * Catches drift between the `@theme` block and whatever maps onto it.
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
