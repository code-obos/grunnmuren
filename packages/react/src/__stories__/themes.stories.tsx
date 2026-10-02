import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
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
const APP_THEME = `[data-theme='app'] { --gm-blue-500: #ff0000; --gm-radius-lg: 0px; }`;

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

    await expect(style('default').backgroundColor).toBe('rgb(0, 71, 186)');
    await expect(style('froen-hage').backgroundColor).toBe('rgb(237, 234, 225)');
    // data-color inside a theme picks the theme's role, not the default one
    await expect(style('froen-hage-neutral').backgroundColor).toBe('rgb(99, 93, 76)');
    // data-theme="default" inside another theme goes back to the defaults
    await expect(style('nested').backgroundColor).toBe('rgb(0, 71, 186)');
    await expect(style('accent').backgroundColor).toBe('rgb(0, 135, 97)');

    // The app's theme only sets --gm-blue-500 and --gm-radius-lg. The roles and rounded-lg
    // follow on that subtree, and it wins although it loaded first
    await expect(style('app').backgroundColor).toBe('rgb(255, 0, 0)');
    await expect(style('app').borderRadius).toBe('0px');
  },
};
