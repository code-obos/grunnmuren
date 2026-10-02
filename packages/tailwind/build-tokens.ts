import { readFileSync } from 'node:fs';
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

// The roles `data-color` can point the short tokens at. Primary is what you get without it.
const DATA_COLORS = ['primary', 'accent', 'neutral'];

// Tailwind has `rounded-none` and `rounded-full` as fixed utilities, so those two are only
// in the source for Figma and never become variables.
const FIXED_RADII = new Set(['none', 'full']);

// Example themes for Storybook and the tests. Not published, an app writes its own
const THEMES = Object.keys(JSON.parse(readFileSync(SOURCE, 'utf8')).themes ?? {}).filter(
  (key) => !key.startsWith('$'),
);

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

  // A theme mirrors the defaults' `primitives` and `semantic`, so its tokens get the names
  // of the ones they override. `group` is the theme's name here.
  if (layer === 'themes') return toCssName(rest);

  if (layer === 'semantic' && group === 'color') return `gm-color-${rest.join('-')}`;

  if (layer === 'semantic' && group === 'typography') {
    const [level, variant, property] = rest;
    return variant === 'default' ? `gm-${level}-${property}` : `gm-${level}-${variant}-${property}`;
  }

  throw new Error(`No CSS name for \`${path.join('.')}\`, add it to toCssName`);
};

const isIn = (token: TransformedToken, ...prefix: Array<string>) =>
  prefix.every((part, index) => token.path[index] === part);

const isRadius = (token: TransformedToken) =>
  isIn(token, 'primitives', 'radius') && !FIXED_RADII.has(token.path[2]);
const isPrimitive = (token: TransformedToken) =>
  isIn(token, 'primitives') &&
  !isIn(token, 'primitives', 'motion') &&
  (!isIn(token, 'primitives', 'radius') || isRadius(token));
const isMotion = (token: TransformedToken) => isIn(token, 'primitives', 'motion');
const isDuration = (token: TransformedToken) => isIn(token, 'primitives', 'motion', 'duration');
const isRoleColor = (token: TransformedToken) => isIn(token, 'semantic', 'color');
const isTypography = (token: TransformedToken) => isIn(token, 'semantic', 'typography');
const isTheme = (theme: string) => (token: TransformedToken) => isIn(token, 'themes', theme);

const variables = (dictionary: Dictionary, indentation = '  ') =>
  formattedVariables({
    format: 'css',
    dictionary,
    outputReferences: true,
    usesDtcg: true,
    formatting: { commentStyle: 'none', indentation },
  });

const declarations = (entries: Array<[string, string]>) =>
  entries.map(([name, value]) => `  --${name}: ${value};`).join('\n');

// Every default sits in :where(), which gives it no specificity, so any rule an app
// writes wins over it whatever order the CSS loads in. Next's app router doesn't keep a
// stable order between CSS chunks, so "load your theme after Grunnmuren" can't be the rule.
const defaults = (...selectors: Array<string>) => `:where(${selectors.join(', ')})`;

// Primitives are plain values and inherit as they are, so a theme further down keeps what
// the page around it set, including an app's own `:root` overrides. Only
// `data-theme="default"` goes back to Grunnmuren's own values.
const PRIMITIVES = defaults(':root', '[data-theme="default"]');

// A custom property that points at another one is resolved on the element that declares
// it, and only the result is inherited. Declared on :root alone, a theme further down
// the tree would change the primitives and nothing that reads them. Declaring the tokens
// that point at others on every [data-theme] as well makes each theme work out its own
// values, which is the pattern Designsystemet uses for [data-color]:
// https://github.com/digdir/designsystemet (MIT, Copyright Digitaliseringsdirektoratet (Digdir))
const THEMED = defaults(':root', '[data-theme]');

/**
 * The short `--gm-color-{group}-{variant}` names, with each `data-color` role's full
 * token behind them. Throws if the roles don't declare the same set, since a short token
 * missing from one role would silently keep the previous role's value.
 */
const shortColorTokens = (dictionary: Dictionary) => {
  const roles = DATA_COLORS.map((role) => {
    const prefix = `gm-color-${role}-`;
    const names = dictionary.allTokens
      .filter((token) => token.name.startsWith(prefix))
      .map((token) => token.name.slice(prefix.length));
    return { role, names };
  });

  const [{ names }] = roles;
  for (const { role, names: other } of roles) {
    if (other.join() !== names.join()) {
      throw new Error(`\`${role}\` doesn't have the same tokens as \`${DATA_COLORS[0]}\``);
    }
  }

  return {
    names: names.map((name) => `gm-color-${name}`),
    roles: roles.map(({ role }) => ({
      role,
      entries: names.map((name): [string, string] => [
        `gm-color-${name}`,
        `var(--gm-color-${role}-${name})`,
      ]),
    })),
  };
};

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
      'gm/declare': ({ dictionary, options }) =>
        `${HEADER}${options.selector} {\n${variables(dictionary)}\n}\n`,

      'gm/semantic': ({ dictionary }) => {
        const [primary, ...others] = shortColorTokens(dictionary).roles;
        const short = others
          .map(({ role, entries }) => `[data-color="${role}"] {\n${declarations(entries)}\n}`)
          .join('\n\n');

        return `${HEADER}${THEMED} {
${variables(dictionary)}
}

/*
 * The short tokens point at whichever role \`data-color\` picks, so a component can be
 * written once against \`base-default\` and be primary, accent or neutral depending on
 * where it sits. Primary without the attribute. A [data-theme] starts over at primary
 * too, since it has to work the short tokens out again from its own roles.
 */
${defaults(':root', '[data-theme]', `[data-color="${primary.role}"]`)} {
${declarations(primary.entries)}
}

${short}
`;
      },

      'gm/motion': ({ dictionary }) => {
        const durations = dictionary.allTokens
          .filter(isDuration)
          .map((token) => `    --${token.name}: 0.01ms !important;`)
          .join('\n');

        return `${HEADER}${defaults(':root')} {
${variables(dictionary)}
}

/*
 * Reduced motion lives in the core, so a theme can pick its own easing and durations
 * without being able to build this away by accident. \`!important\` because every
 * default is in :where(), so any duration a theme sets would otherwise win.
 * Durations go to 0.01ms rather than 0 so transitionend still fires.
 */
@media (prefers-reduced-motion: reduce) {
  :root,
  [data-theme] {
${durations}
  }
}
`;
      },

      'gm/tailwind': ({ dictionary }) => {
        const roles = dictionary.allTokens.filter(isRoleColor).map((token) => token.name);
        const colors = [...roles, ...shortColorTokens(dictionary).names].map(
          (name): [string, string] => [name.replace(/^gm-/, ''), `var(--${name})`],
        );
        const radii = dictionary.allTokens
          .filter(isRadius)
          .map((token): [string, string] => [
            token.name.replace(/^gm-/, ''),
            `var(--${token.name})`,
          ]);

        return `${HEADER}
/*
 * \`inline\` is load-bearing. Without it Tailwind emits \`--color-x: var(--gm-x)\` on :root,
 * the var resolves there, and a theme override further down the tree never reaches the
 * utility. With it the utility reads \`var(--gm-x)\` directly.
 *
 * Spacing and type stay off Tailwind's own keys.
 */
@theme inline {
${declarations(colors)}
}

/*
 * Radius is Tailwind's own scale, so it can't be \`inline\`: that would stop Tailwind
 * emitting \`--radius-*\`, and anything reading \`var(--radius-lg)\` would break. Plain
 * \`@theme\` resolves on :root instead, so the mapping is declared again on every
 * [data-theme] for a theme's \`--gm-radius-*\` to reach \`rounded-*\`.
 */
@theme {
${declarations(radii)}
}

${defaults('[data-theme]')} {
${declarations(radii)}
}
`;
      },

      'gm/theme': ({ dictionary, options }) => `${HEADER}
/*
 * An example, not part of the package. A theme an app writes itself looks the same, and
 * can load in any order: the defaults are in :where(), so this wins either way.
 */
[data-theme="${options.theme}"] {
${variables(dictionary)}
}
`,
    },
  },
  platforms: {
    css: {
      transforms: ['name/gm', 'fontFamily/gm'],
      files: [
        {
          destination: 'primitives.css',
          format: 'gm/declare',
          filter: isPrimitive,
          options: { selector: PRIMITIVES },
        },
        { destination: 'semantic.css', format: 'gm/semantic', filter: isRoleColor },
        {
          destination: 'typography.css',
          format: 'gm/declare',
          filter: isTypography,
          options: { selector: THEMED },
        },
        { destination: 'motion.css', format: 'gm/motion', filter: isMotion },
        {
          destination: 'theme.css',
          format: 'gm/tailwind',
          filter: (token) => isRoleColor(token) || isRadius(token),
        },
        ...THEMES.map((theme) => ({
          destination: `themes/${theme}.css`,
          format: 'gm/theme',
          filter: isTheme(theme),
          options: { theme },
        })),
      ],
    },
  },
};

/**
 * Builds the token CSS from the source, in memory. Returns each file's contents keyed by
 * its path under `tokens/`. Throws when two tokens end up with the same CSS name, or a
 * theme sets something other than a primitive or a role colour.
 */
export const buildTokenCss = async (): Promise<Map<string, string>> => {
  const styleDictionary = new StyleDictionary(CONFIG);
  await styleDictionary.hasInitialized;

  const { allTokens } = await styleDictionary.getPlatformTokens('css');
  const themeable = new Set(
    allTokens
      .filter((token) => isPrimitive(token) || isRoleColor(token))
      .map((token) => token.name),
  );
  const seen = new Map<string, string>();

  for (const token of allTokens) {
    const path = token.path.join('.');
    const [layer, theme] = token.path;

    // Themes reuse the defaults' names on purpose, so names only have to be unique
    // within the defaults and within each theme
    const scope = layer === 'themes' ? theme : '';
    const other = seen.get(`${scope} ${token.name}`);
    if (other) throw new Error(`\`${path}\` and \`${other}\` both become --${token.name}`);
    seen.set(`${scope} ${token.name}`, path);

    // Guarded theming: a theme can change colours and the scales a theme is allowed to
    // change, and every role it ends up with is held to the same contrast checks as the
    // defaults. Typography and motion, reduced motion included, stay out of its reach.
    if (layer === 'themes' && !themeable.has(token.name)) {
      throw new Error(
        `\`${path}\` isn't a primitive or a role colour, which is all a theme can set`,
      );
    }
  }

  const outputs = await styleDictionary.formatPlatform('css');
  return new Map(outputs.map(({ destination, output }) => [destination ?? '', String(output)]));
};
