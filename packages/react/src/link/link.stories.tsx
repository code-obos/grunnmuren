import { Download, LinkExternal } from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';
import { Link } from './link';

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
    className="inline-flex items-center gap-1"
  >
    Ekstern lenke <LinkExternal />
  </Link>
);

export const WithIcon = () => (
  <Link
    download
    href="/document.pdf"
    className="inline-flex items-center gap-1"
  >
    Last ned dokument <Download />
  </Link>
);

export const WithLongerText = () => (
  <p>
    Dette er et avsnitt med en <Link href="/innebygd">lenke</Link> inni.
  </p>
);
