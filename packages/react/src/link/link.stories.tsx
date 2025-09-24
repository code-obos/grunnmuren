import { File } from '@obosbbl/grunnmuren-icons-react';
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
  <Link href="https://obos.no" target="_blank">
    Ekstern lenke
  </Link>
);

export const WithIcon = () => (
  <Link
    download
    href="/document.pdf"
    className="inline-flex items-center gap-1"
  >
    Last ned dokument <File />
  </Link>
);

export const WithCustomStyling = () => (
  <Link href="/tilpasset" className="text-blue hover:underline">
    Tilpasset lenke
  </Link>
);

export const WithLongerText = () => (
  <p>
    Dette er et avsnitt med en <Link href="/innebygd">lenke</Link> inni.
  </p>
);
