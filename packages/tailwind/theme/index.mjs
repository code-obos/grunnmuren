// @ts-check
// Plain JavaScript because it runs from node_modules in the CLI, where Node won't strip
// types. The types are in index.d.mts.
import colors from '../tokens/colors.json' with { type: 'json' };
import { CONTRAST_PAIRS, contrastRatio, parseColor } from './contrast.mjs';

/**
 * @import { ContrastResult, ThemeIssue, ThemeResult } from './index.d.mts'
 * @typedef {{ color: string } | { ref: string }} TokenValue
 * @typedef {{ cssName: string; fallback: TokenValue }} Token
 * @typedef {{ color: string } | { cycle: Array<string> }} Resolved
 */

/**
 * Every colour token by the path a theme file uses, `blue.900` and `primary.base-default`,
 * in the order the CSS declares them: primitives first, then the roles.
 * @type {Map<string, Token>}
 */
const TOKENS = new Map([
  ...colors.primitives.flatMap(({ tokens }) =>
    tokens.map(
      /** @returns {[string, Token]} */
      ({ path, name, value }) => [path, { cssName: name, fallback: { color: value } }],
    ),
  ),
  ...colors.roles.flatMap(({ tokens }) =>
    tokens.map(
      /** @returns {[string, Token]} */
      ({ path, name, ref }) => [path, { cssName: name, fallback: { ref } }],
    ),
  ),
]);

/**
 * What a token ends up as with `theme` laid over the defaults.
 * @param {Map<string, TokenValue>} theme
 * @returns {(path: string, chain?: Array<string>) => Resolved}
 */
const resolveIn = (theme) => {
  /** @type {(path: string, chain?: Array<string>) => Resolved} */
  const resolve = (path, chain = []) => {
    if (chain.includes(path)) return { cycle: [...chain.slice(chain.indexOf(path)), path] };
    const value = theme.get(path) ?? /** @type {Token} */ (TOKENS.get(path)).fallback;
    return 'color' in value ? value : resolve(value.ref, [...chain, path]);
  };
  return resolve;
};

// Compared by channels, so `#002169`, `#002169ff` and `rgb(0 33 105)` count as the same colour
/** @param {string} color */
const sameColorKey = (color) => JSON.stringify(parseColor(color));

const resolveDefault = resolveIn(new Map());
const DEFAULT_COLORS = new Map(
  [...TOKENS.keys()].map((path) => {
    const resolved = /** @type {{ color: string }} */ (resolveDefault(path));
    return [path, sameColorKey(resolved.color)];
  }),
);

const REFERENCE = /^\{([^{}]+)\}$/;
// Designsystemet calls a role token `color.primary.base-default`
const DESIGNSYSTEMET_PREFIX = 'color.';
const THEME_NAME = /^[\w-]+$/;
// `data-theme="default"` is what puts Grunnmuren's own values back
const RESERVED_THEME_NAME = 'default';

/** @type {Record<string, string>} */
const TRANSLITERATIONS = { æ: 'ae', ø: 'o', å: 'a' };

/**
 * A theme name that works unquoted in `data-theme` and as a file name.
 * @param {string} input
 */
export const toThemeName = (input) =>
  input
    .toLowerCase()
    .replaceAll(/[æøå]/g, (letter) => TRANSLITERATIONS[letter])
    .replaceAll(/[^a-z0-9_-]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');

/** @param {unknown} value @returns {value is Record<string, unknown>} */
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Designsystemet's `{ light, dark }`, a colour for each colour scheme.
 * @param {unknown} value
 * @returns {value is { light?: unknown; dark?: unknown }}
 */
const isSchemeValue = (value) =>
  isRecord(value) &&
  Object.keys(value).length > 0 &&
  Object.keys(value).every((key) => key === 'light' || key === 'dark');

/**
 * The token a path in the file means, so Designsystemet's paths read as ours.
 * @param {string} path
 */
const toTokenPath = (path) => {
  const unprefixed = path.startsWith(DESIGNSYSTEMET_PREFIX)
    ? path.slice(DESIGNSYSTEMET_PREFIX.length)
    : path;
  return !TOKENS.has(path) && TOKENS.has(unprefixed) ? unprefixed : path;
};

/** @param {string} a @param {string} b */
const editDistance = (a, b) => {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length];
};

/**
 * The token someone most likely meant: a CSS name such as `--gm-blue-900`, a valid path
 * inside a group of their own (`color.primary.base-default`), or a near miss.
 * @param {string} path
 */
const suggest = (path) => {
  const cssName = path.replace(/^-+/, '');
  const byCssName = [...TOKENS].find(([, token]) => token.cssName === cssName)?.[0];
  if (byCssName) return byCssName;

  const paths = [...TOKENS.keys()];
  const wrapped = paths.find((valid) => path.endsWith(`.${valid}`));
  if (wrapped) return wrapped;

  const nearest = paths
    .map((valid) => ({ valid, distance: editDistance(path, valid) }))
    .reduce((best, next) => (next.distance < best.distance ? next : best));
  return nearest.distance <= 3 ? nearest.valid : undefined;
};

/** @param {string} message @param {string | undefined} suggestion */
const didYouMean = (message, suggestion) =>
  suggestion ? `${message}. Did you mean "${suggestion}"?` : message;

/**
 * The value of a plain or DTCG token. A DTCG colour object is read by its `hex`, which is
 * what Figma's export writes.
 * @param {unknown} token
 */
const rawValue = (token) => {
  const value = isRecord(token) && '$value' in token ? token.$value : token;
  if (!isRecord(value) || typeof value.hex !== 'string') return value;
  if (typeof value.alpha !== 'number' || value.alpha >= 1) return value.hex;
  return `${value.hex}${Math.round(value.alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

/**
 * Every token in a group as `[path, token]`. `$` keys are DTCG metadata, and an object
 * with a `$value`, or with `light` and `dark`, is a token rather than a group.
 * @param {Record<string, unknown>} group
 * @param {string} [prefix]
 * @returns {Array<[string, unknown]>}
 */
const flatten = (group, prefix) =>
  Object.entries(group).flatMap(([key, token]) => {
    if (key.startsWith('$')) return [];
    const path = prefix ? `${prefix}.${key}` : key;
    return isRecord(token) && !('$value' in token) && !isSchemeValue(token)
      ? flatten(token, path)
      : [[path, token]];
  });

/**
 * @param {string} path The path in the file, which issues are reported by
 * @param {unknown} token
 * @returns {TokenValue | ThemeIssue}
 */
const parseToken = (path, token) => {
  if (!TOKENS.has(toTokenPath(path))) {
    const suggestion = suggest(path);
    return {
      code: 'unknown-token',
      path,
      suggestion,
      message: didYouMean(`"${path}" isn't one of Grunnmuren's colour tokens`, suggestion),
    };
  }

  const value = rawValue(token);
  if (isSchemeValue(value)) {
    if ('dark' in value) {
      return {
        code: 'color-scheme',
        path,
        message: `"${path}" has a dark colour, but Grunnmuren has no dark mode yet. Leave out "dark", "light" is used as it is`,
      };
    }
    return parseToken(path, value.light);
  }
  if (typeof value !== 'string') {
    return {
      code: 'invalid-value',
      path,
      message: `"${path}" has to be a string, or a DTCG token with the colour in "$value"`,
    };
  }

  const reference = REFERENCE.exec(value.trim())?.[1].trim();
  if (reference == null) {
    if (parseColor(value)) return { color: value.trim() };
    return {
      code: 'invalid-color',
      path,
      message: `"${value}" in "${path}" isn't a colour. Use hex (#2d3a26), rgb() or a reference like {primary.base-default}`,
    };
  }

  if (TOKENS.has(toTokenPath(reference))) return { ref: toTokenPath(reference) };
  const suggestion = suggest(reference) && `{${suggest(reference)}}`;
  return {
    code: 'unresolved-reference',
    path,
    suggestion,
    message: didYouMean(
      `"${path}" points at {${reference}}, which isn't one of Grunnmuren's colour tokens`,
      suggestion,
    ),
  };
};

/** @param {ThemeIssue} error @returns {ThemeResult} */
const failed = (error) => ({ css: '', errors: [error], contrast: [] });

/**
 * Builds a Grunnmuren theme from colour tokens, and checks it.
 *
 * Only what the tokens set ends up in the CSS. A reference resolves against the file first
 * and Grunnmuren's defaults after. The CSS is empty when there are errors. Contrast is
 * checked for every pair where the theme changes a colour from the default.
 *
 * @param {unknown} input
 * @param {{ name: string }} options
 * @returns {ThemeResult}
 */
export const buildTheme = (input, { name }) => {
  if (!THEME_NAME.test(name)) {
    return failed({
      code: 'invalid-name',
      path: '',
      message: `"${name}" can't be a theme name. Use letters, digits, - and _`,
    });
  }
  if (name === RESERVED_THEME_NAME) {
    return failed({
      code: 'invalid-name',
      path: '',
      message: `"${name}" can't be a theme name, it's what resets to Grunnmuren's own values`,
    });
  }
  if (!isRecord(input)) {
    return failed({
      code: 'not-an-object',
      path: '',
      message:
        'The tokens have to be a JSON object, like { "primary": { "base-default": "#2d3a26" } }',
    });
  }

  /** @type {Map<string, TokenValue>} */
  const theme = new Map();
  /** Where in the file each token is set, by its path @type {Map<string, string>} */
  const setAt = new Map();
  /** @type {Array<ThemeIssue>} */
  const errors = [];
  for (const [filePath, token] of flatten(input)) {
    const parsed = parseToken(filePath, token);
    if ('code' in parsed) {
      errors.push(parsed);
      continue;
    }

    const path = toTokenPath(filePath);
    const earlier = setAt.get(path);
    if (earlier) {
      errors.push({
        code: 'duplicate-token',
        path: filePath,
        message: `"${filePath}" and "${earlier}" are the same token. Set it once`,
      });
      continue;
    }
    setAt.set(path, filePath);
    theme.set(path, parsed);
  }

  const resolve = resolveIn(theme);

  for (const path of theme.keys()) {
    const resolved = resolve(path);
    // Reported once for each token in the loop, not for everything that points into it
    if ('cycle' in resolved && resolved.cycle[0] === path) {
      errors.push({
        code: 'circular-reference',
        path,
        message: `"${path}" is part of a circular reference: ${resolved.cycle.join(' -> ')}`,
      });
    }
  }

  if (errors.length > 0) return { css: '', errors, contrast: [] };

  const declarations = [...TOKENS].flatMap(([path, { cssName }]) => {
    const value = theme.get(path);
    if (!value) return [];
    const css =
      'color' in value
        ? value.color
        : `var(--${/** @type {Token} */ (TOKENS.get(value.ref)).cssName})`;
    return [`  --${cssName}: ${css};\n`];
  });

  /** @type {Array<ContrastResult>} */
  const contrast = CONTRAST_PAIRS.flatMap(({ rule, minimum, foreground, background }) => {
    const fg = resolve(foreground);
    const bg = resolve(background);
    // Unreachable, a cycle is an error and returned above
    if ('cycle' in fg || 'cycle' in bg) return [];
    // A theme isn't held to account for the defaults it leaves as they are
    const changed =
      sameColorKey(fg.color) !== DEFAULT_COLORS.get(foreground) ||
      sameColorKey(bg.color) !== DEFAULT_COLORS.get(background);
    if (!changed) return [];

    const ratio = contrastRatio(fg.color, bg.color);
    return [{ rule, minimum, foreground, background, ratio, passes: ratio >= minimum }];
  });

  return { css: `[data-theme='${name}'] {\n${declarations.join('')}}\n`, errors: [], contrast };
};

/**
 * Every role token, pointing at the primitive it uses by default. Builds to a theme that
 * changes nothing, so it's a starting point to put your own colours in.
 * @type {Record<string, Record<string, string>>}
 */
export const EXAMPLE_TOKENS = Object.fromEntries(
  colors.roles.map(({ role, tokens }) => [
    role,
    Object.fromEntries(tokens.map(({ path, ref }) => [path.split('.')[1], `{${ref}}`])),
  ]),
);
