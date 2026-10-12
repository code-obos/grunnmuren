// @ts-check
// Plain JavaScript because it runs from node_modules in the CLI, where Node won't strip
// types. The types are in index.d.mts.
import colors from '../tokens/docs/colors.json' with { type: 'json' };

/**
 * @import { ContrastPair, ContrastResult, ThemeIssue, ThemeResult } from './index.d.mts'
 * @typedef {{ red: number; green: number; blue: number; alpha: number }} Rgba
 * @typedef {{ color: string } | { ref: string }} TokenValue
 * @typedef {{ path: string; cssName: string; fallback: TokenValue }} Token
 * @typedef {{ color: string; touched: boolean } | { cycle: Array<string> }} Resolved
 */

// The page itself. Status roles don't declare a background of their own, since an alert
// sits on whatever the page is.
const PAGE = '--gm-white';

const CONTRAST_RULES = [
  // WCAG 2.2 AA 1.4.3
  {
    name: 'text on surface',
    minimum: 4.5,
    foregrounds: ['text-default', 'text-subtle'],
    backgrounds: ['background-default', 'background-tinted', 'surface-default', 'surface-tinted'],
  },
  {
    name: 'text in button',
    minimum: 4.5,
    foregrounds: ['base-contrast-default'],
    backgrounds: ['base-default', 'base-hover', 'base-active'],
  },
  // WCAG 2.2 AA 1.4.11
  // Every state, since a hovered or pressed button has to stand out from the page too
  {
    name: 'button on page',
    minimum: 3,
    foregrounds: ['base-default', 'base-hover', 'base-active'],
    backgrounds: [PAGE],
  },
  {
    name: 'graphics on page',
    minimum: 3,
    foregrounds: ['border-default', 'border-strong'],
    backgrounds: [PAGE],
  },
];

/** @type {ReadonlyArray<ContrastPair>} */
export const CONTRAST_PAIRS = colors.roles.flatMap(({ role, tokens }) => {
  const declared = new Set([PAGE, ...tokens.map((token) => `--${token.name}`)]);
  /** @param {string} name */
  const toToken = (name) => (name.startsWith('--') ? name : `--gm-color-${role}-${name}`);

  return CONTRAST_RULES.flatMap(({ name, minimum, foregrounds, backgrounds }) =>
    foregrounds.flatMap((foreground) =>
      backgrounds.map((background) => ({
        rule: name,
        minimum,
        foreground: toToken(foreground),
        background: toToken(background),
      })),
    ),
  ).filter(({ foreground, background }) => declared.has(foreground) && declared.has(background));
});

const HEX = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const RGB = /^rgba?\((.+)\)$/i;
const NUMBER = /^(\d*\.?\d+)(%?)$/;

/** @param {string} part @param {number} max */
const parseChannel = (part, max) => {
  const match = NUMBER.exec(part);
  if (!match) return undefined;
  const value = match[2] ? (Number(match[1]) / 100) * max : Number(match[1]);
  return value <= max ? value : undefined;
};

/**
 * A hex or `rgb()` colour as channels from 0 to 255 and alpha from 0 to 1, or undefined
 * when it's neither.
 * @param {string} value
 * @returns {Rgba | undefined}
 */
const parseColor = (value) => {
  const color = value.trim();

  if (HEX.test(color)) {
    const hex = color.length <= 5 ? color.slice(1).replaceAll(/./g, '$&$&') : color.slice(1);
    const [red, green, blue, alpha = 255] = (hex.match(/../g) ?? []).map((pair) =>
      Number.parseInt(pair, 16),
    );
    return { red, green, blue, alpha: alpha / 255 };
  }

  const parts =
    RGB.exec(color)?.[1]
      .trim()
      .split(/\s*[,/]\s*|\s+/) ?? [];
  if (parts.length !== 3 && parts.length !== 4) return undefined;

  const [red, green, blue] = parts.slice(0, 3).map((part) => parseChannel(part, 255));
  const alpha = parts[3] == null ? 1 : parseChannel(parts[3], 1);
  if (red == null || green == null || blue == null || alpha == null) return undefined;
  return { red, green, blue, alpha };
};

const WHITE = { red: 255, green: 255, blue: 255, alpha: 1 };

/** `top` laid over the opaque `bottom` @param {Rgba} top @param {Rgba} bottom */
const over = (top, bottom) => ({
  red: top.red * top.alpha + bottom.red * (1 - top.alpha),
  green: top.green * top.alpha + bottom.green * (1 - top.alpha),
  blue: top.blue * top.alpha + bottom.blue * (1 - top.alpha),
  alpha: 1,
});

// sRGB to linear light, as defined for relative luminance in WCAG 2.x
/** @param {number} channel */
const toLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

/** @param {Rgba} color */
const relativeLuminance = ({ red, green, blue }) =>
  0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

/** @param {string} value */
const parseOrThrow = (value) => {
  const color = parseColor(value);
  if (!color) throw new Error(`Expected a hex or rgb() colour, got \`${value}\``);
  return color;
};

/**
 * WCAG 2.x contrast ratio, from 1 to 21. A translucent background is laid over white and
 * the foreground over that. Deliberately not rounded: WCAG counts 4.499:1 as failing 4.5:1.
 * @param {string} foreground
 * @param {string} background
 */
export const contrastRatio = (foreground, background) => {
  const below = over(parseOrThrow(background), WHITE);
  const a = relativeLuminance(over(parseOrThrow(foreground), below));
  const b = relativeLuminance(below);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

// Token paths as a theme file writes them, `blue.900` and `primary.base-default`, in the
// order the CSS declares them: primitives first, then the roles.
const primitives = colors.primitives.flatMap(({ family, tokens }) =>
  tokens.map(({ name, value }) => ({
    path: name === `gm-${family}` ? family : `${family}.${name.slice(`gm-${family}-`.length)}`,
    cssName: name,
    fallback: { color: value },
  })),
);
const primitivePaths = new Map(primitives.map(({ path, cssName }) => [cssName, path]));
const roles = colors.roles.flatMap(({ role, tokens }) =>
  tokens.map(({ name, ref }) => ({
    path: `${role}.${name.slice(`gm-color-${role}-`.length)}`,
    cssName: name,
    fallback: { ref: primitivePaths.get(ref) ?? ref },
  })),
);

/** @type {Map<string, Token>} */
const TOKENS = new Map([...primitives, ...roles].map((token) => [token.path, token]));
const pathByCssName = new Map([...TOKENS.values()].map(({ path, cssName }) => [cssName, path]));

const REFERENCE = /^\{([^{}]+)\}$/;
const THEME_NAME = /^[\w-]+$/;

/** @param {unknown} value @returns {value is Record<string, unknown>} */
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

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
  const byCssName = pathByCssName.get(path.replace(/^-+/, ''));
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
  const value = isRecord(token) ? token.$value : token;
  if (!isRecord(value) || typeof value.hex !== 'string') return value;
  if (typeof value.alpha !== 'number' || value.alpha >= 1) return value.hex;
  return `${value.hex}${Math.round(value.alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

/**
 * Every token in a group as `[path, token]`. `$` keys are DTCG metadata, and an object
 * with a `$value` is a token rather than a group.
 * @param {Record<string, unknown>} group
 * @param {string} [prefix]
 * @returns {Array<[string, unknown]>}
 */
const flatten = (group, prefix) =>
  Object.entries(group).flatMap(([key, token]) => {
    if (key.startsWith('$')) return [];
    const path = prefix ? `${prefix}.${key}` : key;
    return isRecord(token) && !('$value' in token) ? flatten(token, path) : [[path, token]];
  });

/**
 * @param {string} path
 * @param {unknown} token
 * @returns {TokenValue | ThemeIssue}
 */
const parseToken = (path, token) => {
  if (!TOKENS.has(path)) {
    const suggestion = suggest(path);
    return {
      code: 'unknown-token',
      path,
      suggestion,
      message: didYouMean(`"${path}" isn't one of Grunnmuren's colour tokens`, suggestion),
    };
  }

  const value = rawValue(token);
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

  if (TOKENS.has(reference)) return { ref: reference };
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
 * Only what the tokens set ends up in the CSS, the rest inherits. A reference resolves
 * against the file first and Grunnmuren's defaults after. The CSS is empty when there are
 * errors. Contrast is checked for every pair the theme changes, laid over the defaults.
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
  /** @type {Array<ThemeIssue>} */
  const errors = [];
  for (const [path, token] of flatten(input)) {
    const parsed = parseToken(path, token);
    if ('code' in parsed) errors.push(parsed);
    else theme.set(path, parsed);
  }

  /**
   * What a token ends up as on the theme, and whether the theme changed it.
   * @param {string} path
   * @param {Array<string>} [chain]
   * @returns {Resolved}
   */
  const resolve = (path, chain = []) => {
    if (chain.includes(path)) return { cycle: [...chain.slice(chain.indexOf(path)), path] };

    const value = theme.get(path) ?? /** @type {Token} */ (TOKENS.get(path)).fallback;
    if ('color' in value) return { color: value.color, touched: theme.has(path) };

    const target = resolve(value.ref, [...chain, path]);
    if ('cycle' in target) return target;
    return { color: target.color, touched: theme.has(path) || target.touched };
  };

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

  const declarations = [...TOKENS.values()].flatMap(({ path, cssName }) => {
    const value = theme.get(path);
    if (!value) return [];
    const css =
      'color' in value
        ? value.color
        : `var(--${/** @type {Token} */ (TOKENS.get(value.ref)).cssName})`;
    return [`  --${cssName}: ${css};\n`];
  });

  /** @type {Array<ContrastResult>} */
  const contrast = CONTRAST_PAIRS.flatMap(({ rule, minimum, ...pair }) => {
    const foreground = /** @type {string} */ (pathByCssName.get(pair.foreground.slice(2)));
    const background = /** @type {string} */ (pathByCssName.get(pair.background.slice(2)));
    const fg = resolve(foreground);
    const bg = resolve(background);
    // A partial theme isn't held to account for the defaults it leaves alone
    if ('cycle' in fg || 'cycle' in bg || (!fg.touched && !bg.touched)) return [];

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
  colors.roles.map(({ role }) => [
    role,
    Object.fromEntries(
      roles
        .filter(({ path }) => path.startsWith(`${role}.`))
        .map(({ path, fallback }) => [path.slice(role.length + 1), `{${fallback.ref}}`]),
    ),
  ]),
);
