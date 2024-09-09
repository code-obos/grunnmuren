
import { cx } from 'cva';
import { RequireAtLeastOne } from 'type-fest';
import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { useLocale } from 'react-aria-components';
import { Button } from '../'

// Number of pagination items to show before and after the current page
const SIBLING_COUNT = 2;

type BasePaginationProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  currentPage: number;
  pageCount: number;

  className?: string;

}

const translations = {
  next: {
    nb: 'Neste',
    sv: 'Nästa',
    en: 'Next',
  },
  previous: {
    nb: 'Forrige',
    sv: 'Föregående',
    en: 'Previous',
  },
} as const;


// For accessibility reasons, aria-label or aria-labelledby is required.
type PaginationProps = RequireAtLeastOne<
  BasePaginationProps,
  'aria-label' | 'aria-labelledby'
>;

const Pagination = ({ className, currentPage: _currentPage, pageCount: _pageCount, ...props }: PaginationProps) => {

  const { locale } = useLocale();

  const pageCount = Math.max(1, _pageCount);
  const currentPage = Math.max(1, Math.min(_currentPage, pageCount));


  return (
    <nav className={cx(className, 'flex justify-center gap-1')} {...props}>
      <Button variant="tertiary"><ChevronLeft /><span className="max-md:sr-only"> {translations.previous[locale]}</span></Button>

      {/* Always render the first page */}
      <PageItem page={1} selected={currentPage === 1} />


      {/* Render the ellipsis if applicable */}
      {pageCount > 2 + SIBLING_COUNT * 2 &&
        currentPage > SIBLING_COUNT + 2 && <PaginationEllipsis />}

      <Pages
        currentPage={currentPage}
        pageCount={pageCount}
      >
        {(page) => (
          <PageItem
            // href={getItemHref(page)}
            // onClick={handleClick(page)}
            // aria-label={getItemAriaLabel(page)}
            page={page}
            key={page}
            selected={page === currentPage}
          />
        )}
      </Pages>
      <Button variant="tertiary"><span className="max-md:sr-only">{translations.next[locale]} </span><ChevronRight /></Button>
    </nav>
  )

}

const PaginationEllipsis = () => {
  return (
    <span className="flex h-9 w-9 cursor-default items-center justify-center border-2 border-transparent sm:h-10 sm:w-10">
      ...
    </span>
  );
};

const PageItem = (props) => {
  const { page, selected, ...rest } = props;

  return (
    <Button aria-current={selected ? 'page' : undefined} {...rest} variant={selected ? 'primary' : 'tertiary'}>
      {page}
    </Button>
  );
}

interface PagesProps {
  children: (page: number) => React.ReactElement<PageProps>;
  currentPage: number;
  pageCount: number;
}

const Pages = ({ children, currentPage, pageCount }: PagesProps) => {

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


export { Pagination, type PaginationProps };
