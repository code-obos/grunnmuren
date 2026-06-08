import type { Meta } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { UNSAFE_Pagination as Pagination } from './pagination';

const meta = {
  title: 'Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 30 },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

/**
 * Pagination renders real `<a>` links — `getItemHref` is required and the
 * caller owns the `page` state. Two common patterns:
 *
 * **URL-driven** (recommended for real apps): read the current page from the
 * URL, return matching hrefs. Browser/router navigation re-renders with the
 * new page. `onChange` is not needed.
 *
 * ```tsx
 * const page = Number(searchParams.get('page') ?? 1);
 * <Pagination
 *   page={page}
 *   count={totalPages}
 *   getItemHref={(p) => `?page=${p}`}
 * />
 * ```
 *
 * **Local state** (this demo): `useState` holds the page, `onChange` keeps it
 * in sync with link clicks. The hash in `getItemHref` lets right-click → "Open
 * in new tab" still land on the right page.
 */
export const Default = (props: { count: number }) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination count={props.count} getItemHref={(p) => `#${p}`} onChange={setPage} page={page} />
  );
};

Default.args = {
  count: 10,
};

/**
 * Mirrors the URL-driven pattern using the location hash: clicking a link
 * navigates (updating the hash), a `hashchange` listener feeds the new page
 * back into state, and no `onChange` is needed. Swap `window.location.hash`
 * for `useSearchParams()` (Next.js) or your router's equivalent in a real app
 * — the `<Pagination>` API stays the same.
 *
 * ```tsx
 * const [page, setPage] = useState(() =>
 *   Number(window.location.hash.slice(1)) || 1,
 * );
 * useEffect(() => {
 *   const handler = () => setPage(Number(window.location.hash.slice(1)) || 1);
 *   window.addEventListener('hashchange', handler);
 *   return () => window.removeEventListener('hashchange', handler);
 * }, []);
 * return <Pagination count={10} getItemHref={(p) => `#${p}`} page={page} />;
 * ```
 */
export const URLDrivenState = () => {
  const [page, setPage] = useState(() => Number(window.location.hash.slice(1)) || 1);

  useEffect(() => {
    const handler = () => setPage(Number(window.location.hash.slice(1)) || 1);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return <Pagination count={10} getItemHref={(p) => `#${p}`} page={page} />;
};

/** With currentPage past the sibling threshold, the left ellipsis appears. */
export const WithEllipsis = () => {
  const [page, setPage] = useState(8);
  return <Pagination count={20} getItemHref={(p) => `#${p}`} onChange={setPage} page={page} />;
};

/** Few pages: no ellipsis and no truncation. */
export const FewPages = () => {
  const [page, setPage] = useState(2);
  return <Pagination count={4} getItemHref={(p) => `#${p}`} onChange={setPage} page={page} />;
};

/** First page disables the previous-button. */
export const FirstPage = () => <Pagination count={10} getItemHref={(p) => `#${p}`} page={1} />;

/** Last page disables the next-button. */
export const LastPage = () => <Pagination count={10} getItemHref={(p) => `#${p}`} page={10} />;
