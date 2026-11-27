import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { FormStepper } from './form-stepper';
import { StepNavigation } from './step-navigation';
import { SummaryCard, SummaryItem } from './summary';

const steps = [
  { id: 'contact', label: 'Kontakt' },
  { id: 'details', label: 'Detaljer' },
  { id: 'summary', label: 'Oppsummering' },
];

function render(children: ReactNode, locale: Locale = 'nb') {
  return renderToStaticMarkup(<GrunnmurenProvider locale={locale}>{children}</GrunnmurenProvider>);
}

function stepElements(html: string) {
  return html.split('<li').slice(1);
}

test('FormStepper: later steps are disabled, completed ones are marked, the active one is current', () => {
  const html = render(
    <FormStepper steps={steps} activeIndex={0} isCompleted={() => false} goTo={() => undefined} />,
  );
  const [contact, details, summary] = stepElements(html);
  expect(contact).toContain('data-current');
  expect(contact).not.toContain('data-disabled="true"');
  expect(details).toContain('data-disabled="true"');
  expect(summary).toContain('data-disabled="true"');
});

test('FormStepper: a completed later step is enabled', () => {
  const html = render(
    <FormStepper
      steps={steps}
      activeIndex={0}
      isCompleted={(id) => id === 'details'}
      goTo={() => undefined}
    />,
  );
  const [, details, summary] = stepElements(html);
  expect(details).toContain('data-state="completed"');
  expect(details).not.toContain('data-disabled="true"');
  expect(summary).toContain('data-disabled="true"');
});

test('FormStepper: disableNavigation disables every step', () => {
  const html = render(
    <FormStepper
      steps={steps}
      activeIndex={1}
      isCompleted={(id) => id === 'contact'}
      goTo={() => undefined}
      disableNavigation
    />,
  );
  expect(stepElements(html).every((step) => step.includes('data-disabled="true"'))).toBe(true);
});

test('FormStepper: extra props go on the nav, hook-only keys do not', () => {
  const html = render(
    <FormStepper
      steps={steps}
      activeIndex={0}
      isCompleted={() => false}
      goTo={() => undefined}
      isFirst
      goToNext={() => undefined}
      className="lg:w-64"
      data-testid="stepper"
    />,
  );
  expect(html).toContain('class="lg:w-64"');
  expect(html).toContain('data-testid="stepper"');
  expect(html).not.toContain('isFirst');
  expect(html).not.toContain('gotonext');
});

test.each([
  ['nb', 'Progressindikator'],
  ['sv', 'Framstegsindikator'],
  ['en', 'Progress'],
] as const)('FormStepper %s: localized nav label', (locale, label) => {
  const html = render(
    <FormStepper steps={steps} activeIndex={0} isCompleted={() => false} goTo={() => undefined} />,
    locale,
  );
  expect(html).toContain(`<nav aria-label="${label}"`);
});

test('FormStepper: aria-label can be overridden', () => {
  const html = render(
    <FormStepper
      steps={steps}
      activeIndex={0}
      isCompleted={() => false}
      goTo={() => undefined}
      aria-label="Søknad"
    />,
  );
  expect(html).toContain('<nav aria-label="Søknad"');
});

test.each([
  ['nb', 'Forrige steg', 'Neste steg'],
  ['sv', 'Föregående steg', 'Nästa steg'],
  ['en', 'Previous step', 'Next step'],
] as const)('StepNavigation %s: default labels and test ids', (locale, previous, next) => {
  const html = render(<StepNavigation />, locale);
  expect(html).toContain(previous);
  expect(html).toContain(next);
  expect(html).toContain('data-testid="step-previous-button"');
  expect(html).toContain('data-testid="step-next-button"');
  expect(html).toMatch(
    /type="button"[^>]*data-testid="step-previous-button"|data-testid="step-previous-button"[^>]*type="button"/,
  );
  expect(html).toMatch(
    /type="submit"[^>]*data-testid="step-next-button"|data-testid="step-next-button"[^>]*type="submit"/,
  );
});

test('StepNavigation: custom labels, and Back can be hidden', () => {
  const html = render(
    <StepNavigation showPrevious={false} nextLabel="Send inn" previousLabel="Tilbake" />,
  );
  expect(html).toContain('Send inn');
  expect(html).not.toContain('Tilbake');
  expect(html).not.toContain('step-previous-button');
});

test('StepNavigation: pending Next is marked busy', () => {
  expect(render(<StepNavigation isPending />)).toContain('data-pending');
});

test.each([
  ['nb', 'Endre'],
  ['sv', 'Ändra'],
  ['en', 'Edit'],
] as const)('SummaryCard %s: title, content and localized edit button', (locale, edit) => {
  const html = render(
    <SummaryCard title="Kontaktinformasjon" onEdit={() => undefined}>
      <SummaryItem label="E-post" value="ola@example.com" />
    </SummaryCard>,
    locale,
  );
  expect(html).toContain('<h3 class="heading-s">Kontaktinformasjon</h3>');
  expect(html).toContain(edit);
  expect(html).toContain('ola@example.com');
});

test('SummaryCard: editAction replaces the button, and no action means no divider', () => {
  const custom = render(
    <SummaryCard editAction={<a href="/min-side">Endre på Min side</a>}>x</SummaryCard>,
  );
  expect(custom).toContain('Endre på Min side');
  expect(custom).not.toContain('>Endre<');

  const none = render(<SummaryCard>x</SummaryCard>);
  expect(none).not.toContain('<hr');
  expect(none).not.toContain('<button');
});

test('SummaryItem: label and value in one paragraph', () => {
  const html = render(<SummaryItem label="Mobil" value="12345678" />);
  expect(html).toContain(
    '<p><span class="block font-semibold sm:inline">Mobil</span> 12345678</p>',
  );
});
