import { cva, cx } from 'cva';
import { type RefAttributes, useCallback, useState } from 'react';
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
import { ScrollButton, useHorizontalScroll } from '../utils';

const tableVariants = cva({
  base: ['relative'],
  variants: {
    variant: {
      default: '',
      zebra: '',
    },
  },
});

const tableRowVariants = cva({
  base: [
    'data-focus-visible:outline-focus-offset',
    'motion-safe:transition-colors motion-reduce:transition-none',
    'group-data-[variant=zebra]:odd:bg-white',
    'group-data-[variant=zebra]:even:bg-sky-lightest',
  ],
});

type TableProps = Omit<RACTableProps, 'className'> &
  RefAttributes<HTMLTableElement> & {
    className?: string;
    /**
     * Visual variant of the table
     * @default 'default'
     */
    variant?: 'default' | 'zebra';
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
  const { className, children, variant = 'default', ...restProps } = props;
  const [scrollPosition, setScrollPosition] = useState('start');

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    hasScrollingOccurred,
  } = useHorizontalScroll();

  const handleScroll = useCallback(
    (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      // Update scroll position for screen readers after scroll
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (scrollLeft === 0) {
          setScrollPosition('start');
        } else if (scrollLeft >= scrollWidth - clientWidth - 1) {
          setScrollPosition('end');
        } else {
          setScrollPosition('middle');
        }
      }, 150);
    },
    [scrollContainerRef],
  );
  return (
    <section
      className={tableVariants({ className, variant })}
      data-variant={variant}
    >
      <div className="relative overflow-hidden">
        {/* Screen reader live region for scroll announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {scrollPosition === 'start' && 'Tabell ved start'}
          {scrollPosition === 'middle' &&
            'Tabell scrollet, mer innhold tilgjengelig i begge retninger'}
          {scrollPosition === 'end' && 'Tabell ved slutt'}
        </div>

        <ScrollButton
          direction="left"
          onClick={() => handleScroll('left')}
          isVisible={canScrollLeft}
          hasScrollingOccurred={hasScrollingOccurred}
          className="-translate-y-1/2 -left-3 absolute top-5 z-10 h-11 w-11"
          iconClassName="h-5 w-5"
        />

        <ScrollButton
          direction="right"
          onClick={() => handleScroll('right')}
          isVisible={canScrollRight}
          hasScrollingOccurred={hasScrollingOccurred}
          className="-translate-y-1/2 -right-3 absolute top-5 z-10 h-11 w-11"
          iconClassName="h-5 w-5"
        />

        <section
          ref={scrollContainerRef}
          className="scrollbar-hidden overflow-x-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="Scrollbart tabellinnhold"
        >
          <RACTable {...restProps} className="group w-full min-w-fit">
            {children}
          </RACTable>
        </section>
      </div>
    </section>
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
    <RACRow {...restProps} className={tableRowVariants({ className })}>
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
        'align-top',
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
