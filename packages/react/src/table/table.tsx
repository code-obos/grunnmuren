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

interface BaseTableComponentProps {
  className?: string;
}

type TableProps = Omit<RACTableProps, 'className'> &
  RefAttributes<HTMLTableElement> &
  BaseTableComponentProps;

type TableHeaderProps = Omit<RACTableHeaderProps<object>, 'className'> &
  RefAttributes<HTMLTableSectionElement> &
  BaseTableComponentProps;

type TableColumnProps = Omit<RACColumnProps, 'className'> &
  RefAttributes<HTMLTableCellElement> &
  BaseTableComponentProps & {
    children: React.ReactNode;
  };

type TableBodyProps = Omit<RACTableBodyProps<object>, 'className'> &
  RefAttributes<HTMLTableSectionElement> &
  BaseTableComponentProps;

type TableRowProps = Omit<RACRowProps<object>, 'className'> &
  RefAttributes<HTMLTableRowElement> &
  BaseTableComponentProps;

type TableCellProps = Omit<RACCellProps, 'className'> &
  RefAttributes<HTMLTableCellElement> &
  BaseTableComponentProps & {
    children: React.ReactNode;
  };

/**
 * A container component for displaying tabular data with horizontal scrolling support.
 * Follows WCAG 2.1 AA accessibility guidelines.
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
  const position = direction === 'left' ? 'left-2' : 'right-2';
  const ariaLabel = `Scroll table ${direction}`;

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cx(
        '-translate-y-1/2 absolute top-6 z-10',
        position,
        'flex h-8 w-8 items-center justify-center', // Increased size for better touch target (WCAG 2.5.5)
        'cursor-pointer text-black transition-colors duration-150 ease-out',
        'bg-white/95 backdrop-blur-sm', // Higher opacity for better contrast
        'hover:bg-white hover:text-gray-dark',
        'active:text-gray-darker',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        'motion-safe:transition-all motion-reduce:transition-none', // Respect reduced motion preference
        canScroll ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      aria-label={ariaLabel}
      aria-hidden={!canScroll}
      tabIndex={canScroll ? 0 : -1}
      // Better contrast ratio for disabled state
      style={{
        color: canScroll ? 'inherit' : '#6B7280',
        backgroundColor: canScroll ? undefined : 'rgba(255,255,255,0.7)',
      }}
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
/**
 * An individual column header in the table.
 * Includes proper ARIA attributes for screen readers.
 */
function TableColumn(props: TableColumnProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACColumn
      {...restProps}
      className={cx(
        className,
        'px-4 py-3 text-left font-medium text-black text-sm',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset',
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
    <RACTableBody {...restProps} className={cx(className)}>
      {children}
    </RACTableBody>
  );
}

/**
 * An individual row in the table.
 * Enhanced with better focus management and hover states.
 */
function TableRow(props: TableRowProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACRow
      {...restProps}
      className={cx(
        className,
        // Alternating row backgrounds with better contrast ratios
        'odd:bg-white even:bg-blue-lightest/30',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset',
        'hover:bg-blue-lightest/50 motion-safe:transition-colors motion-reduce:transition-none',
      )}
    >
      {children}
    </RACRow>
  );
}

/**
 * An individual cell in the table.
 * Optimized for readability and accessibility.
 */
function TableCell(props: TableCellProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACCell
      {...restProps}
      className={cx(
        className,
        'px-4 py-3 text-black text-sm leading-relaxed', // Better line height for readability
        'min-w-fit whitespace-nowrap',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset',
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
