import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useLayoutEffect, useRef } from 'react';

import { Button } from '../button';
import { translations } from '../translations';
import { type Locale, useLocale } from '../use-locale';

// Lives here, not in `translations`, because it interpolates the hidden range
// — the static-string `translations` map doesn't support function values.
const HIDDEN_PAGES_LABEL: Record<Locale, (start: number, end: number) => string> = {
  nb: (start, end) =>
    start === end ? `Skjuler side ${start}` : `Skjuler side ${start} til ${end}`,
  sv: (start, end) => (start === end ? `Döljer sida ${start}` : `Döljer sida ${start} till ${end}`),
  en: (start, end) => (start === end ? `Hides page ${start}` : `Hides pages ${start} to ${end}`),
};

// Number of pages shown on each side of the current page on desktop. On
// narrow containers, CSS hides the outermost visible pages via the
// `data-outer` attribute so the entire pagination fits a 320px viewport
// without changing the rendered DOM.
const SIBLING_COUNT = 2;

type PaginationProps = {
  /** The current page (1-indexed). */
  page: number;
  /** The total number of pages. */
  count: number;
  /** Given a page number, returns the href for navigating to that page. The
   * value is set as the `href` attribute on the rendered link, enabling
   * right-click, middle-click and SEO. Client-side routing is set up via
   * `routerOptions` on `<GrunnmurenProvider />`. */
  getItemHref: (page: number) => string;
  /** Optional callback fired when the user activates a page link. Useful for
   * keeping local state in sync with the URL. Navigation still happens via
   * the link's href. */
  onChange?: (page: number) => void;
  /** Additional class name for the root `<ol>`. */
  className?: string;
};

/**
 * Returns the page numbers (1-indexed) that should be rendered between the
 * always-visible first page and the next/prev buttons. Mirrors v1's ellipsis
 * behaviour: only a single (left) ellipsis is ever shown, and the last page
 * is not guaranteed to be rendered.
 *
 * Page 1 is filtered out because it's rendered separately as a fixed slot —
 * keeping it here would duplicate when the special-case extension lands the
 * window on it.
 */
function getVisiblePages(currentPage: number, pageCount: number): number[] {
  const end = Math.min(Math.max(2 + SIBLING_COUNT * 2, currentPage + SIBLING_COUNT), pageCount);
  let start = Math.max(Math.min(currentPage - SIBLING_COUNT, end - SIBLING_COUNT * 2), 1);
  // When `start` lands exactly SIBLING_COUNT pages past page 1, we have room
  // to render one extra page to the left without needing an ellipsis.
  if (start - SIBLING_COUNT === 0) {
    start = start - 1;
  }
  const pages = Array.from({ length: end - start }, (_, i) => start + i + 1);
  return pages.filter((p) => p > 1);
}

/**
 * Returns the indices of the two visible pages farthest from `currentPage`.
 * These get marked with `data-outer` so the CSS container query can hide them
 * on narrow viewports, dropping the slot count from 8 to 6 without changing
 * the rendered DOM. Returns an empty set when there's nothing to gain.
 */
function getOuterIndices(visiblePages: number[], currentPage: number): Set<number> {
  if (visiblePages.length <= 3) {
    return new Set();
  }
  return new Set(
    visiblePages
      .map((p, i) => ({ i, distance: Math.abs(p - currentPage) }))
      .sort((a, b) => b.distance - a.distance)
      .slice(0, 2)
      .map((entry) => entry.i),
  );
}

const Pagination = (props: PaginationProps) => {
  const { page, count, getItemHref, onChange, className } = props;
  const locale = useLocale();

  const currentPage = Math.max(1, Math.min(page, Math.max(1, count)));
  const pageCount = Math.max(1, count);

  const visiblePages = getVisiblePages(currentPage, pageCount);
  const outerIndices = getOuterIndices(visiblePages, currentPage);
  // Show the left ellipsis whenever there's a gap between page 1 and the
  // first visible page. This matches v1 for SIBLING_COUNT=2.
  const showLeftEllipsis = visiblePages.length > 0 && visiblePages[0] > 2;
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pageCount;

  // Prev/next switches element type (<a> with href ↔ <button> without) when
  // crossing a boundary. React replaces the DOM node, so the browser blurs
  // the focused element — restore it manually after the re-render.
  const prevButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const restoreFocusToRef = useRef<'prev' | 'next' | null>(null);

  useLayoutEffect(() => {
    if (restoreFocusToRef.current === 'prev') {
      prevButtonRef.current?.focus();
    } else if (restoreFocusToRef.current === 'next') {
      nextButtonRef.current?.focus();
    }
    restoreFocusToRef.current = null;
  }, [currentPage]);

  return (
    <ol aria-label={translations.pagination[locale]} className={cx('gm-pagination', className)}>
      <li>
        {/* Active: <a href>. Boundary: <button aria-disabled>. We use manual
            aria-disabled (not RAC's isDisabled) so the boundary state keeps
            HTML focusability — isDisabled on a button sets the HTML disabled
            attribute, and on a link makes RAC render a non-focusable span. */}
        <Button
          aria-disabled={!canGoPrev}
          aria-label={translations.previousPage[locale]}
          color="white"
          href={canGoPrev ? getItemHref(currentPage - 1) : undefined}
          isIconOnly
          onPress={
            canGoPrev
              ? () => {
                  restoreFocusToRef.current = 'prev';
                  onChange?.(currentPage - 1);
                }
              : undefined
          }
          ref={prevButtonRef}
        >
          <ChevronLeft />
        </Button>
      </li>
      <PageItem
        getItemHref={getItemHref}
        isActive={currentPage === 1}
        onChange={onChange}
        page={1}
      />
      {showLeftEllipsis && (
        <li data-slot="ellipsis">
          <span aria-hidden="true">…</span>
          <span>{HIDDEN_PAGES_LABEL[locale](2, visiblePages[0] - 1)}</span>
        </li>
      )}
      {visiblePages.map((p, i) => (
        <PageItem
          getItemHref={getItemHref}
          isActive={p === currentPage}
          isOuter={outerIndices.has(i)}
          key={p}
          onChange={onChange}
          page={p}
        />
      ))}
      <li>
        <Button
          aria-disabled={!canGoNext}
          aria-label={translations.nextPage[locale]}
          color="white"
          href={canGoNext ? getItemHref(currentPage + 1) : undefined}
          isIconOnly
          onPress={
            canGoNext
              ? () => {
                  restoreFocusToRef.current = 'next';
                  onChange?.(currentPage + 1);
                }
              : undefined
          }
          ref={nextButtonRef}
        >
          <ChevronRight />
        </Button>
      </li>
    </ol>
  );
};

type PageItemProps = {
  page: number;
  isActive: boolean;
  isOuter?: boolean;
  getItemHref: (page: number) => string;
  onChange?: (page: number) => void;
};

const PageItem = ({ page, isActive, isOuter, getItemHref, onChange }: PageItemProps) => {
  return (
    <li data-outer={isOuter || undefined}>
      <Button
        aria-current={isActive ? 'page' : undefined}
        color={isActive ? 'blue' : 'white'}
        href={getItemHref(page)}
        onPress={() => onChange?.(page)}
      >
        {page}
      </Button>
    </li>
  );
};

export { Pagination as UNSAFE_Pagination, type PaginationProps as UNSAFE_PaginationProps };
