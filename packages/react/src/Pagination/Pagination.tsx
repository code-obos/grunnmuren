import { createContext, useContext, useMemo, forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons';
import { cx } from '@/utils';

// Number of pagination items to show before and after the current page
const SIBLING_COUNT = 2;

const PaginationContext = createContext<{
  currentPage: number;
  pageCount: number;
}>({ currentPage: 0, pageCount: 0 });

interface PaginationProps
  extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  /** The current page number.
   * @note Starts at 1
   */
  page: number;

  /** The total number of pages. */
  count: number;

  /**  Given a page number, should return a valid href string. */
  createHref: (page: number) => string;

  /**  Given a page number, should return a valid href string. */
  createAriaLabel: (page: number) => string;
  /** Aria label for the next page button link */
  nextPageAriaLabel: string;
  /** Aria label for the previous page button link */
  prevPageAriaLabel: string;

  /** Handler that is called with the page number to navigate to. `event.preventDefault` is called for you. Fallbacks to default browser behavior if undefined. */
  onChange?: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    page: currentPage,
    count: pageCount,
    onChange,
    createHref,
    createAriaLabel,
    nextPageAriaLabel,
    prevPageAriaLabel,
    ...rest
  } = props;

  const context = useMemo(
    () => ({
      currentPage: Math.max(1, Math.min(currentPage, pageCount)),
      pageCount: Math.max(1, pageCount),
    }),
    [currentPage, pageCount],
  );

  const handleClick =
    (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onChange) {
        event.preventDefault();

        onChange(page);
      }
    };

  return (
    <PaginationContext.Provider value={context}>
      <nav
        className={cx('flex justify-center gap-2 sm:gap-4', className)}
        {...rest}
      >
        <PrevPage
          aria-label={prevPageAriaLabel}
          href={createHref(currentPage - 1)}
          onClick={handleClick(currentPage - 1)}
        />
        {/* Always render the first page */}
        <Page
          page={1}
          href={createHref(1)}
          onClick={handleClick(1)}
          aria-label={createAriaLabel(1)}
          selected={currentPage === 1}
        />
        {pageCount > 2 + SIBLING_COUNT * 2 &&
          currentPage > SIBLING_COUNT + 2 && <PaginationEllipsis />}
        {/* @ts-expect-error gaaha ts, come on*/}
        <Pages>
          {(page) => (
            <Page
              href={createHref(page)}
              onClick={handleClick(page)}
              aria-label={createAriaLabel(page)}
              page={page}
              key={page}
              selected={page === currentPage}
            />
          )}
        </Pages>
        <NextPage
          aria-label={nextPageAriaLabel}
          href={createHref(currentPage + 1)}
          onClick={handleClick(currentPage + 1)}
        />
      </nav>
    </PaginationContext.Provider>
  );
};

const NextPage = forwardRef<HTMLAnchorElement, PageLinkProps>((props, ref) => {
  const { currentPage, pageCount } = useContext(PaginationContext);

  const hide = currentPage >= pageCount;

  return (
    <PageLink
      aria-hidden={hide}
      className={hide ? 'invisible' : undefined}
      ref={ref}
      rel="next"
      {...props}
    >
      <ChevronRight />
    </PageLink>
  );
});

const PrevPage = forwardRef<HTMLAnchorElement, PageLinkProps>((props, ref) => {
  const { currentPage } = useContext(PaginationContext);

  const hide = currentPage <= 1;

  return (
    <PageLink
      aria-hidden={hide}
      className={hide ? 'invisible' : undefined}
      ref={ref}
      rel="prev"
      {...props}
    >
      <ChevronLeft />
    </PageLink>
  );
});

interface PageLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  'aria-label': string;
}

const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <a
      className={cx(
        className,
        'aria-[current]:border-green hover:bg-gray-concrete flex h-9 w-9 items-center justify-center rounded-lg border-2 border-transparent no-underline sm:h-10 sm:w-10',
      )}
      ref={ref}
      {...rest}
    />
  );
});

const PaginationEllipsis = () => {
  return (
    <span className="flex h-9 w-9 cursor-default items-center justify-center border-2 border-transparent sm:h-10 sm:w-10">
      ...
    </span>
  );
};

interface PagesProps {
  children: (page: number) => React.ReactElement<PageProps>;
}
const Pages = ({ children }: PagesProps) => {
  const { currentPage, pageCount } = useContext(PaginationContext);

  const end = Math.min(
    Math.max(2 + SIBLING_COUNT * 2, currentPage + SIBLING_COUNT),
    pageCount,
  );

  let start = Math.max(
    Math.min(currentPage - SIBLING_COUNT, end - SIBLING_COUNT * 2),
    1,
  );

  // Since we are showing 6 items (+ arrow buttons)
  // we don't necessarily have the same number of items to either side of the active
  // page.. Therefore we need to special handling for that one particular case
  if (start - SIBLING_COUNT === 0) {
    start = start - 1;
  }

  const pages = Array.from({ length: end - start }, (_, i) => start + i + 1);

  return pages.map((page) => children(page));
};

interface PageProps extends PageLinkProps {
  page: number;
  selected?: boolean;
}

const Page = forwardRef<HTMLAnchorElement, PageProps>((props, ref) => {
  const { page, selected, ...rest } = props;

  return (
    <PageLink aria-current={selected ? 'page' : undefined} ref={ref} {...rest}>
      {page}
    </PageLink>
  );
});

Pagination.NextPage = NextPage;
Pagination.PrevPage = PrevPage;
Pagination.Ellipsis = PaginationEllipsis;
Pagination.Page = Page;
