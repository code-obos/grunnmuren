import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
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
  style?: CSSProperties;
  children?: ReactNode;
};

const Panel = ({ title, testId, theme, color, style, children }: PanelProps) => (
  <section
    data-theme={theme}
    data-color={color}
    style={style}
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

/**
 * Temaer side om side på samme side, som er det `data-theme` må tåle: et tema på en del av
 * siden, et tema inni et annet, og `data-color` innenfor et tema. Det første panelet har
 * ingen attributter, så det følger `theme` og `color` i toolbaren.
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
      <Panel
        title="--gm-radius-lg: 0"
        testId="square"
        theme="default"
        style={{ '--gm-radius-lg': '0px' } as CSSProperties}
      />
    </div>
  ),
  // The screenshot shows it, these say which value is the right one
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const style = (testId: string) => getComputedStyle(canvas.getByTestId(testId));

    await expect(style('default').backgroundColor).toBe('rgb(0, 71, 186)');
    await expect(style('froen-hage').backgroundColor).toBe('rgb(237, 234, 225)');
    // data-color inside a theme picks the theme's role, not the default one
    await expect(style('froen-hage-neutral').backgroundColor).toBe('rgb(99, 93, 76)');
    // A theme inside another starts from the defaults rather than inheriting the outer one
    await expect(style('nested').backgroundColor).toBe('rgb(0, 71, 186)');
    await expect(style('accent').backgroundColor).toBe('rgb(0, 135, 97)');

    await expect(style('default').borderRadius).toBe('8px');
    await expect(style('square').borderRadius).toBe('0px');
  },
};
