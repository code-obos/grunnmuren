import { resolve } from 'node:path';

import StyleDictionary from 'style-dictionary';
import type { Config, Dictionary, TransformedToken } from 'style-dictionary/types';
import { formattedVariables } from 'style-dictionary/utils';

const SOURCE = resolve(import.meta.dirname, 'tokens/source/grunnmuren-tokens.json');

const HEADER = `/*
 * Generated from tokens/source/grunnmuren-tokens.json by build-tokens.ts. Don't edit by
 * hand: change the source and run \`pnpm tokens:build\`.
 */
`;

// The source names families the way Figma knows the fonts. The @font-face rules and the
// CLS fallbacks in font.css register them without the space, so the raw name would fall
// through to the next font in the stack.
const FONT_STACKS: Record<string, string> = {
  'OBOS Text': 'OBOSText, __OBOSText_Fallback, sans-serif',
  'OBOS Display': 'OBOSDisplay, __OBOSDisplay_Fallback, sans-serif',
};

/**
 * The CSS name for a token path, without the leading `--`. Written out rather than
 * derived, since the source is named for Figma and a few groups are called something
 * else in CSS (`spacing` is `space`, `easing` is `ease`, typography drops `default`).
 */
const toCssName = (path: Array<string>): string => {
  const [layer, group, ...rest] = path;

  if (layer === 'primitives') {
    switch (group) {
      case 'color':
        return `gm-${rest.join('-')}`;
      case 'spacing':
        return `gm-space-${rest.join('-')}`;
      case 'font-family':
        return rest[0] === 'text' ? 'gm-font-family' : `gm-font-family-${rest.join('-')}`;
      case 'motion': {
        const [kind, ...name] = rest;
        return `gm-${kind === 'easing' ? 'ease' : kind}-${name.join('-')}`;
      }
      default:
        return `gm-${group}-${rest.join('-')}`;
    }
  }

  if (layer === 'semantic' && group === 'color') return `gm-color-${rest.join('-')}`;

  if (layer === 'semantic' && group === 'typography') {
    const [level, variant, property] = rest;
    return variant === 'default' ? `gm-${level}-${property}` : `gm-${level}-${variant}-${property}`;
  }

  throw new Error(`No CSS name for \`${path.join('.')}\`, add it to toCssName`);
};

const isIn = (token: TransformedToken, ...prefix: Array<string>) =>
  prefix.every((part, index) => token.path[index] === part);

// Radius waits for the theme seam, where it comes back as --gm-radius-* with Tailwind's
// values and Tailwind's own --radius-* pointing at it. Tenants aren't built yet either.
const isPrimitive = (token: TransformedToken) =>
  isIn(token, 'primitives') &&
  !isIn(token, 'primitives', 'radius') &&
  !isIn(token, 'primitives', 'motion');
const isMotion = (token: TransformedToken) => isIn(token, 'primitives', 'motion');
const isDuration = (token: TransformedToken) => isIn(token, 'primitives', 'motion', 'duration');
const isRoleColor = (token: TransformedToken) => isIn(token, 'semantic', 'color');
const isTypography = (token: TransformedToken) => isIn(token, 'semantic', 'typography');

const variables = (dictionary: Dictionary, indentation = '  ') =>
  formattedVariables({
    format: 'css',
    dictionary,
    outputReferences: true,
    usesDtcg: true,
    formatting: { commentStyle: 'none', indentation },
  });

const CONFIG: Config = {
  source: [SOURCE],
  usesDtcg: true,
  // Warnings are off because every file references tokens that live in another file
  // (semantic.css points at primitives.css), which Style Dictionary warns about. Broken
  // references still throw, and name collisions are checked below instead.
  log: { verbosity: 'silent', warnings: 'disabled' },
  hooks: {
    transforms: {
      'name/gm': {
        type: 'name',
        transform: (token) => toCssName(token.path),
      },
      'fontFamily/gm': {
        type: 'value',
        filter: (token) => token.$type === 'fontFamily',
        transform: (token) => {
          const stack = FONT_STACKS[token.$value];
          if (!stack)
            throw new Error(`No font stack for \`${token.$value}\`, add it to FONT_STACKS`);
          return stack;
        },
      },
    },
    formats: {
      'gm/root': ({ dictionary }) => `${HEADER}:root {\n${variables(dictionary)}\n}\n`,

      'gm/motion': ({ dictionary }) => {
        const durations = dictionary.allTokens
          .filter(isDuration)
          .map((token) => `    --${token.name}: 0.01ms;`)
          .join('\n');

        return `${HEADER}:root {
${variables(dictionary)}
}

/*
 * Reduced motion lives in the core, so a theme can pick its own easing and durations
 * without being able to build this away by accident. Durations go to 0.01ms rather than
 * 0 so transitionend still fires.
 */
@media (prefers-reduced-motion: reduce) {
  :root {
${durations}
  }
}
`;
      },

      'gm/theme-inline': ({ dictionary }) => {
        const mappings = dictionary.allTokens
          .map((token) => `  --${token.name.replace(/^gm-/, '')}: var(--${token.name});`)
          .join('\n');

        return `${HEADER}
/*
 * \`inline\` is load-bearing. Without it Tailwind emits \`--color-x: var(--gm-x)\` on :root,
 * the var resolves there, and a theme override further down the tree never reaches the
 * utility. With it the utility reads \`var(--gm-x)\` directly.
 *
 * Only the full role tokens are mapped. The short ones behind \`data-color\` land with the
 * theme seam, and spacing and type stay off Tailwind's own keys. Radius uses Tailwind's
 * scale as it is.
 */
@theme inline {
${mappings}
}
`;
      },
    },
  },
  platforms: {
    css: {
      transforms: ['name/gm', 'fontFamily/gm'],
      files: [
        { destination: 'primitives.css', format: 'gm/root', filter: isPrimitive },
        { destination: 'semantic.css', format: 'gm/root', filter: isRoleColor },
        { destination: 'typography.css', format: 'gm/root', filter: isTypography },
        { destination: 'motion.css', format: 'gm/motion', filter: isMotion },
        { destination: 'theme.css', format: 'gm/theme-inline', filter: isRoleColor },
      ],
    },
  },
};

/**
 * Builds the token CSS from the source, in memory. Returns each file's contents keyed by
 * its name under `tokens/`. Throws when two tokens end up with the same CSS name.
 */
export const buildTokenCss = async (): Promise<Map<string, string>> => {
  const styleDictionary = new StyleDictionary(CONFIG);
  await styleDictionary.hasInitialized;

  const { allTokens } = await styleDictionary.getPlatformTokens('css');
  const seen = new Map<string, string>();
  for (const token of allTokens) {
    const path = token.path.join('.');
    const other = seen.get(token.name);
    if (other) throw new Error(`\`${path}\` and \`${other}\` both become --${token.name}`);
    seen.set(token.name, path);
  }

  const outputs = await styleDictionary.formatPlatform('css');
  return new Map(outputs.map(({ destination, output }) => [destination ?? '', String(output)]));
};
