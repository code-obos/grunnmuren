import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
import {
  type RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Cell as RACCell,
  type CellProps as RACCellProps,
  Column as RACColumn,
  type ColumnProps as RACColumnProps,
  Row as RACRow,
  type RowProps as RACRowProps,
  Table as RACTable,
  TableBody as RACTableBody,
  type TableBodyProps as RACTableBodyProps,
  TableHeader as RACTableHeader,
  type TableHeaderProps as RACTableHeaderProps,
  type TableProps as RACTableProps,
} from 'react-aria-components';
import { useDebouncedCallback } from 'use-debounce';

const tableVariants = cva({
  base: ['relative'],
});

type TableProps = Omit<RACTableProps, 'className'> &
  RefAttributes<HTMLTableElement> & {
    className?: string;
  };

type TableHeaderProps = Omit<RACTableHeaderProps<object>, 'className'> &
  RefAttributes<HTMLTableSectionElement> & {
    className?: string;
  };

type TableColumnProps = Omit<RACColumnProps, 'className'> &
  RefAttributes<HTMLTableCellElement> & {
    className?: string;
    children: React.ReactNode;
  };

type TableBodyProps = Omit<RACTableBodyProps<object>, 'className'> &
  RefAttributes<HTMLTableSectionElement> & {
    className?: string;
  };

type TableRowProps = Omit<RACRowProps<object>, 'className'> &
  RefAttributes<HTMLTableRowElement> & {
    className?: string;
  };

type TableCellProps = Omit<RACCellProps, 'className'> &
  RefAttributes<HTMLTableCellElement> & {
    className?: string;
    children: React.ReactNode;
  };

/**
 * A container component for displaying tabular data with horizontal scrolling support.
 */
function Table(props: TableProps) {
  const { className, children, ...restProps } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollPosition, setScrollPosition] = useState('start');

  const checkScrollOverflow = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const newCanScrollLeft = scrollLeft > 0;
    const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

    setCanScrollLeft(newCanScrollLeft);
    setCanScrollRight(newCanScrollRight);

    // Update scroll position for screen readers
    if (scrollLeft === 0) {
      setScrollPosition('start');
    } else if (scrollLeft >= scrollWidth - clientWidth - 1) {
      setScrollPosition('end');
    } else {
      setScrollPosition('middle');
    }
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, direction: 'left' | 'right') => {
      // Support Enter and Space for activation (WCAG 2.1.1)
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleScroll(direction);
      }
    },
    [handleScroll],
  );

  const scrollHandler = useDebouncedCallback(checkScrollOverflow, 100);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollOverflow();
    container.addEventListener('scroll', scrollHandler);

    const resizeObserver = new ResizeObserver(checkScrollOverflow);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', scrollHandler);
      resizeObserver.disconnect();
    };
  }, [checkScrollOverflow, scrollHandler]);

  return (
    <section
      className={tableVariants({ className })}
      aria-label="Data table with horizontal scrolling"
    >
      <div className="relative">
        {/* Screen reader live region for scroll announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {scrollPosition === 'start' && 'Table at start'}
          {scrollPosition === 'middle' &&
            'Table scrolled, more content available in both directions'}
          {scrollPosition === 'end' && 'Table at end'}
        </div>

        <NavigationButton
          direction="left"
          onClick={() => handleScroll('left')}
          onKeyDown={(e) => handleKeyDown(e, 'left')}
          canScroll={canScrollLeft}
        />

        <NavigationButton
          direction="right"
          onClick={() => handleScroll('right')}
          onKeyDown={(e) => handleKeyDown(e, 'right')}
          canScroll={canScrollRight}
        />

        <section
          ref={scrollContainerRef}
          className="scrollbar-hidden overflow-x-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="Scrollable table content"
        >
          <RACTable {...restProps} className="w-full min-w-fit">
            {children}
          </RACTable>
        </section>
      </div>
    </section>
  );
}

/**
 * Navigation button component for table scrolling
 * Supports keyboard interaction and proper WCAG compliance
 */
interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  canScroll: boolean;
}

function NavigationButton({
  direction,
  onClick,
  onKeyDown,
  canScroll,
}: NavigationButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const position = direction === 'left' ? 'left-0' : 'right-0';
  const ariaLabel = `Scroll table ${direction}`;
  const bg =
    direction === 'left'
      ? 'bg-[linear-gradient(90deg,white,white_calc(100%-10px),transparent)]'
      : 'bg-[linear-gradient(90deg,transparent,white_calc(10px),white)]';

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cx(
        '-translate-y-1/2 absolute top-5 z-10',
        position,
        'flex h-11 w-11 items-center justify-center',
        'cursor-pointer text-black transition-all duration-150 ease-out',
        bg,
        'hover:bg-white',
        'data-focus-visible:outline-focus-offset',
        'motion-safe:transition-all motion-reduce:transition-none',
        canScroll ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      aria-label={ariaLabel}
      aria-hidden={!canScroll}
      tabIndex={canScroll ? 0 : -1}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/**
 * Container for table column headers.
 */
function TableHeader({ className, children, ...restProps }: TableHeaderProps) {
  return (
    <RACTableHeader
      {...restProps}
      className={cx(className, 'border-black border-b')}
    >
      {children}
    </RACTableHeader>
  );
}
function TableColumn(props: TableColumnProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACColumn
      {...restProps}
      className={cx(
        className,
        'px-4 py-3 text-left font-medium text-black text-sm',
        'data-focus-visible:outline-focus-offset',
        'min-w-fit whitespace-nowrap',
      )}
    >
      {children}
    </RACColumn>
  );
}

/**
 * Container for table rows.
 */
function TableBody({ className, children, ...restProps }: TableBodyProps) {
  return (
    <RACTableBody {...restProps} className={className}>
      {children}
    </RACTableBody>
  );
}

function TableRow(props: TableRowProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACRow
      {...restProps}
      className={cx(
        className,
        'odd:bg-white even:bg-sky-lightest/50',
        'data-focus-visible:outline-focus-offset',
        'motion-safe:transition-colors motion-reduce:transition-none',
      )}
    >
      {children}
    </RACRow>
  );
}

function TableCell(props: TableCellProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACCell
      {...restProps}
      className={cx(
        className,
        'px-4 py-3 text-black text-sm leading-relaxed',
        'min-w-fit whitespace-nowrap',
        'data-focus-visible:outline-focus-offset',
      )}
    >
      {children}
    </RACCell>
  );
}

export {
  Table as UNSAFE_Table,
  TableBody as UNSAFE_TableBody,
  TableCell as UNSAFE_TableCell,
  TableColumn as UNSAFE_TableColumn,
  TableHeader as UNSAFE_TableHeader,
  TableRow as UNSAFE_TableRow,
  type TableBodyProps as UNSAFE_TableBodyProps,
  type TableCellProps as UNSAFE_TableCellProps,
  type TableColumnProps as UNSAFE_TableColumnProps,
  type TableHeaderProps as UNSAFE_TableHeaderProps,
  type TableProps as UNSAFE_TableProps,
  type TableRowProps as UNSAFE_TableRowProps,
};
