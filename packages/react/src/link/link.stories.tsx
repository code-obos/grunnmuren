import { Download, LinkExternal } from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';
import { UNSAFE_Link as Link } from './link';

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => <Link href="/bolig">Bolig</Link>;

export const External = () => (
  <Link
    href="https://obos.no"
    target="_blank"
    rel="noreferrer"
    className="group"
  >
    Ekstern lenke
    <LinkExternal className="shrink-0 transition-transform group-hover:motion-safe:translate-x-0.5 group-hover:motion-safe:-translate-y-0.5" />
  </Link>
);

export const WithIcon = () => (
  <Link download href="/document.pdf" className="group">
    Last ned dokument{' '}
    <Download className="shrink-0 transition-transform group-hover:motion-safe:translate-y-1" />
  </Link>
);

export const WithLongerText = () => (
  <p>
    Dette er et avsnitt med en <Link href="/innebygd">lenke</Link> inni.
  </p>
);

export const WithBgColor = () => (
  <div className="bg-blue-dark p-6 text-mint">
    <Link href="/ti-side">Lenke</Link>
  </div>
);
