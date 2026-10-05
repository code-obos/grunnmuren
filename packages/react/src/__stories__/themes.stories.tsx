import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

const meta: Meta = {
  title: 'Temaer',
};

export default meta;

type PanelProps = {
  title: string;
  testId: string;
  theme?: string;
  color?: string;
  children?: ReactNode;
};

const Panel = ({ title, testId, theme, color, children }: PanelProps) => (
  <section
    data-theme={theme}
    data-color={color}
    className="bg-background-tinted text-text-default grid content-start gap-4 p-6"
  >
    <h2 className="heading-xs">{title}</h2>
    <div
      data-testid={testId}
      className="bg-base-default text-base-contrast-default rounded-lg px-4 py-3"
    >
      base-default
    </div>
    <div className="bg-surface-default border-border-default text-text-subtle rounded-lg border-2 px-4 py-3">
      surface-default
    </div>
    {children}
  </section>
);

// A theme the way an app writes one: primitives only, so the roles have to follow on
// their own. Loaded before Grunnmuren's CSS on purpose, since an app can't count on the
// order its CSS loads in.
const APP_THEME = `[data-theme='app'] { --gm-blue-900: #ff0000; --gm-radius-lg: 0px; }`;

const loadAppTheme = () => {
  if (document.getElementById('app-theme')) return;
  const style = document.createElement('style');
  style.id = 'app-theme';
  style.textContent = APP_THEME;
  document.head.prepend(style);
};

/**
 * Temaer side om side på samme side, som er det `data-theme` må tåle: et tema på en del av
 * siden, `default` inni et annet tema, og `data-color` innenfor et tema. Det første panelet
 * har ingen attributter, så det følger `theme` og `color` i toolbaren. Apptemaet setter
 * bare primitiver og lastes før Grunnmuren, sånn som en app sitt eget tema kan bli.
 */
export const SideBySide: StoryObj = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <Panel title="fra toolbaren" testId="toolbar" />
      <Panel title="default" testId="default" theme="default" />
      <Panel title="froen-hage" testId="froen-hage" theme="froen-hage">
        <Panel title="data-color=neutral" testId="froen-hage-neutral" color="neutral" />
        <Panel title="default inni froen-hage" testId="nested" theme="default" />
      </Panel>
      <Panel title="data-color=accent" testId="accent" theme="default" color="accent" />
      <Panel title="apptema" testId="app" theme="app" />
    </div>
  ),
  // The screenshot shows it, these say which value is the right one
  play: async ({ canvasElement }) => {
    loadAppTheme();
    const canvas = within(canvasElement);
    const style = (testId: string) => getComputedStyle(canvas.getByTestId(testId));

    await expect(style('default').backgroundColor).toBe('rgb(0, 33, 105)');
    await expect(style('froen-hage').backgroundColor).toBe('rgb(237, 234, 225)');
    // data-color inside a theme picks the theme's role, not the default one
    await expect(style('froen-hage-neutral').backgroundColor).toBe('rgb(99, 93, 76)');
    // data-theme="default" inside another theme goes back to the defaults
    await expect(style('nested').backgroundColor).toBe('rgb(0, 33, 105)');
    await expect(style('accent').backgroundColor).toBe('rgb(0, 82, 76)');

    // The app's theme only sets --gm-blue-900 and --gm-radius-lg. The roles and rounded-lg
    // follow on that subtree, and it wins although it loaded first
    await expect(style('app').backgroundColor).toBe('rgb(255, 0, 0)');
    await expect(style('app').borderRadius).toBe('0px');
  },
};

type ColorToken = { name: string; group: string };

const ROLES = ['primary', 'accent', 'neutral', 'success', 'danger', 'warning', 'info'];
const HEX = /^#[0-9a-f]{3,8}$/i;

/**
 * The colour tokens as the stylesheet declares them, so the page can't drift from the
 * source. Primitives are the hex values on the default `:root`, the roles and the short
 * tokens come from the rules the semantic layer declares them in.
 */
const readColorTokens = () => {
  const primitives: Array<ColorToken> = [];
  const roles: Array<ColorToken> = [];
  const short: Array<ColorToken> = [];

  for (const sheet of document.styleSheets) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      // A stylesheet from another origin can't be read, and has no tokens of ours anyway
      continue;
    }

    for (const rule of rules) {
      if (!(rule instanceof CSSStyleRule) || !rule.selectorText.includes(':root')) continue;
      const { selectorText, style } = rule;

      for (const name of style) {
        if (!name.startsWith('--gm-')) continue;
        const value = style.getPropertyValue(name).trim();

        if (selectorText.includes('[data-theme="default"]') && HEX.test(value)) {
          primitives.push({ name, group: name.replace(/^--gm-/, '').replace(/-\d+$/, '') });
        } else if (selectorText.includes('[data-color="primary"]')) {
          short.push({ name, group: name.replace(/^--gm-color-/, '').split('-')[0] });
        } else if (name.startsWith('--gm-color-')) {
          const role = ROLES.find((candidate) => name.startsWith(`--gm-color-${candidate}-`));
          if (role) roles.push({ name, group: role });
        }
      }
    }
  }

  return { primitives, roles, short };
};

const groupBy = (tokens: Array<ColorToken>) => Map.groupBy(tokens, (token) => token.group);

const toHex = (color: string) => {
  const channels = color
    .match(/\d+(\.\d+)?/g)
    ?.slice(0, 3)
    .map(Number);
  return channels?.length === 3
    ? `#${channels.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`
    : color;
};

const Swatch = ({ name }: { name: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  useLayoutEffect(() => {
    if (ref.current) setValue(toHex(getComputedStyle(ref.current).backgroundColor));
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div
        ref={ref}
        className="size-10 shrink-0 rounded-md border border-black/15"
        style={{ backgroundColor: `var(${name})` }}
      />
      <div className="min-w-0 text-sm">
        <code className="block truncate">{name}</code>
        <span className="text-gray-dark">{value}</span>
      </div>
    </div>
  );
};

const TokenGroups = ({ title, tokens }: { title: string; tokens: Array<ColorToken> }) => (
  <section className="grid gap-6">
    <h2 className="heading-m">{title}</h2>
    {[...groupBy(tokens)].map(([group, members]) => (
      <div key={group} className="grid gap-3">
        <h3 className="heading-xs">{group}</h3>
        <div className="grid grid-cols-4 gap-4">
          {members.map(({ name }) => (
            <Swatch key={name} name={name} />
          ))}
        </div>
      </div>
    ))}
  </section>
);

// The toolbar sets data-theme and data-color on <html>. Counting the changes and using it
// as a key makes every swatch read its value again.
const useDocumentThemeVersion = () => {
  const [version, setVersion] = useState(0);

  useLayoutEffect(() => {
    const observer = new MutationObserver(() => setVersion((current) => current + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-color'],
    });
    return () => observer.disconnect();
  }, []);

  return version;
};

const ColorTokens = () => {
  const [tokens, setTokens] = useState<ReturnType<typeof readColorTokens>>();
  const version = useDocumentThemeVersion();
  useLayoutEffect(() => setTokens(readColorTokens()), []);

  if (!tokens) return null;

  return (
    <div key={version} className="grid gap-12">
      <TokenGroups title="Roller" tokens={tokens.roles} />
      <TokenGroups title="Korte tokens (data-color)" tokens={tokens.short} />
      <TokenGroups title="Primitiver" tokens={tokens.primitives} />
    </div>
  );
};

/**
 * Alle fargetokens med navn og verdi. Følger `theme` og `color` i toolbaren, så du ser hva
 * et tema faktisk gir.
 */
export const Farger: StoryObj = {
  render: () => <ColorTokens />,
};
