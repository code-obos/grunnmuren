import { cva, cx } from 'cva';
import { type RefAttributes, useCallback } from 'react';
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
  ResizableTableContainer,
  type ResizableTableContainerProps,
} from 'react-aria-components';
import {
  ScrollButton,
  type ScrollDirection,
  useHorizontalScroll,
} from '../utils';

const tableVariants = cva({
  base: ['relative'],
  variants: {
    variant: {
      default: '',
      'zebra-striped': '',
    },
  },
});

const tableRowVariants = cva({
  base: [
    'data-focus-visible:outline-focus-inset',
    'group-data-[variant=zebra-striped]:odd:bg-white',
    'group-data-[variant=zebra-striped]:even:bg-sky-lightest',
  ],
});

type TableProps = Omit<RACTableProps, 'aria-label' | 'aria-labelledby'> &
  RefAttributes<HTMLTableElement> & {
    /**
     * Visual variant of the table
     * @default 'default'
     */
    variant?: 'default' | 'zebra-striped';
  } & (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

type TableHeaderProps = RACTableHeaderProps<object> &
  RefAttributes<HTMLTableSectionElement>;

type TableColumnProps = RACColumnProps &
  RefAttributes<HTMLTableCellElement> & {
    children: React.ReactNode;
  };

type TableBodyProps = RACTableBodyProps<object> &
  RefAttributes<HTMLTableSectionElement>;

type TableRowProps = RACRowProps<object> & RefAttributes<HTMLTableRowElement>;

type TableCellProps = RACCellProps &
  RefAttributes<HTMLTableCellElement> & {
    children: React.ReactNode;
  };

/**
 * A container component for displaying tabular data with horizontal scrolling support.
 */
function Table(props: TableProps) {
  const { className, children, variant = 'default', ...restProps } = props;

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    hasScrollingOccurred,
  } = useHorizontalScroll();

  const handleScroll = useCallback(
    (direction: ScrollDirection) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    },
    [scrollContainerRef],
  );
  return (
    <div className={tableVariants({ className, variant })}>
      <div className="relative overflow-hidden">
        <ScrollButton
          direction="left"
          onClick={() => handleScroll('left')}
          isVisible={canScrollLeft}
          hasScrollingOccurred={hasScrollingOccurred}
          className="-translate-y-1/2 absolute top-5 z-10 h-11 w-11"
          iconClassName="h-5 w-5"
        />

        <ScrollButton
          direction="right"
          onClick={() => handleScroll('right')}
          isVisible={canScrollRight}
          hasScrollingOccurred={hasScrollingOccurred}
          className="-translate-y-1/2 absolute top-5 z-10 h-11 w-11"
          iconClassName="h-5 w-5"
        />

        <div
          ref={scrollContainerRef}
          className="scrollbar-hidden overflow-x-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <RACTable
            {...restProps}
            className="group w-full min-w-fit"
            data-variant={variant}
          >
            {children}
          </RACTable>
        </div>
      </div>
    </div>
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
        'data-focus-visible:outline-focus-inset',
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
        'data-focus-visible:outline-focus-inset',
      )}
    >
      {children}
    </RACCell>
  );
}

type TableContainerProps = ResizableTableContainerProps;

const TableContainer = (props: ResizableTableContainerProps) => (
  <ResizableTableContainer {...props} />
);

export {
  Table as UNSAFE_Table,
  TableBody as UNSAFE_TableBody,
  TableCell as UNSAFE_TableCell,
  TableColumn as UNSAFE_TableColumn,
  TableContainer as UNSAFE_TableContainer,
  TableHeader as UNSAFE_TableHeader,
  TableRow as UNSAFE_TableRow,
  type TableBodyProps as UNSAFE_TableBodyProps,
  type TableCellProps as UNSAFE_TableCellProps,
  type TableColumnProps as UNSAFE_TableColumnProps,
  type TableContainerProps as UNSAFE_TableContainerProps,
  type TableHeaderProps as UNSAFE_TableHeaderProps,
  type TableProps as UNSAFE_TableProps,
  type TableRowProps as UNSAFE_TableRowProps,
};
