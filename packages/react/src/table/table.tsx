import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
import { createContext, type RefAttributes, useCallback, useContext, useState } from 'react';
import {
  Cell as RACCell,
  type CellProps as RACCellProps,
  Column as RACColumn,
  type ColumnProps as RACColumnProps,
  ColumnResizer as RACColumnResizer,
  type ColumnResizerProps as RACColumnResizerProps,
  Row as RACRow,
  type RowProps as RACRowProps,
  Table as RACTable,
  TableBody as RACTableBody,
  type TableBodyProps as RACTableBodyProps,
  TableHeader as RACTableHeader,
  type TableHeaderProps as RACTableHeaderProps,
  type TableProps as RACTableProps,
  ResizableTableContainer as RACResizableTableContainer,
  type ResizableTableContainerProps as RACResizableTableContainerProps,
} from 'react-aria-components/Table';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';

import { Button } from '../button';
import { ScrollButton, type ScrollDirection, useHorizontalScroll } from '../utils';

// Set by <ResizableTableContainer> to forward its props to the RAC container
// rendered inside <ScrollWrapper>. When <Table> is used without a
// <ResizableTableContainer>, this is null and <ScrollWrapper> falls back to
// a plain overflow div.
type _ResizableTableContainerContextValue = {
  resizableProps: Omit<RACResizableTableContainerProps, 'ref' | 'children'>;
} | null;

const _ResizableTableContainerContext = createContext<_ResizableTableContainerContextValue>(null);

const tableRowVariants = cva({
  base: [
    'group/row',
    'data-focus-visible:outline-focus-inset',
    'group-data-[variant=zebra-striped]/table:odd:bg-white',
    'group-data-[variant=zebra-striped]/table:even:bg-sky-lightest',
  ],
});

type TableVariant = 'default' | 'zebra-striped';

type TableProps = Omit<RACTableProps, 'aria-label' | 'aria-labelledby'> &
  RefAttributes<HTMLTableElement> & {
    /**
     * Visual variant of the table
     * @default 'default'
     */
    variant?: TableVariant;
  } & (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

type TableHeaderProps = RACTableHeaderProps<object> & RefAttributes<HTMLTableSectionElement>;

type TableColumnProps = RACColumnProps &
  RefAttributes<HTMLTableCellElement> & {
    children: React.ReactNode;
  };

type TableBodyProps = RACTableBodyProps<object> & RefAttributes<HTMLTableSectionElement>;

type TableRowProps = RACRowProps<object> & RefAttributes<HTMLTableRowElement>;

type TableCellProps = RACCellProps &
  RefAttributes<HTMLTableCellElement> & {
    children: React.ReactNode;
  };

type TableColumnResizerProps = RACColumnResizerProps;

type ResizableTableContainerProps = RACResizableTableContainerProps;

/**
 * Shared scroll wrapper that renders an overflow container with left/right
 * scroll indicators around the table. If it is rendered inside a
 * <ResizableTableContainer>, the overflow element is RAC's
 * <ResizableTableContainer> (required for column resizing to measure column
 * widths against the correct scroll viewport); otherwise it is a plain div.
 */
function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerCtx = useContext(_ResizableTableContainerContext);
  const [isResizing, setIsResizing] = useState(false);

  const { scrollContainerRef, canScrollLeft, canScrollRight, hasScrollingOccurred } =
    useHorizontalScroll<HTMLDivElement>([isResizing]);

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

  const scrollClasses = 'scrollbar-hidden overflow-x-auto';
  const touchStyle = { WebkitOverflowScrolling: 'touch' as const };

  return (
    <div className="relative overflow-hidden">
      {containerCtx ? (
        <RACResizableTableContainer
          {...containerCtx.resizableProps}
          ref={scrollContainerRef}
          className={cx(scrollClasses, containerCtx.resizableProps.className)}
          style={touchStyle}
          onResizeStart={(widths) => {
            setIsResizing(true);
            containerCtx.resizableProps.onResizeStart?.(widths);
          }}
          onResizeEnd={(widths) => {
            setIsResizing(false);
            containerCtx.resizableProps.onResizeEnd?.(widths);
          }}
        >
          {children}
        </RACResizableTableContainer>
      ) : (
        <div ref={scrollContainerRef} className={scrollClasses} style={touchStyle}>
          {children}
        </div>
      )}

      <ScrollButton
        direction="left"
        onClick={() => handleScroll('left')}
        isVisible={canScrollLeft}
        hasScrollingOccurred={hasScrollingOccurred}
      />

      <ScrollButton
        direction="right"
        onClick={() => handleScroll('right')}
        isVisible={canScrollRight}
        hasScrollingOccurred={hasScrollingOccurred}
      />
    </div>
  );
}

/**
 * A container component for displaying tabular data with horizontal scrolling support.
 */
function Table(props: TableProps) {
  const { className, children, variant = 'default', ...restProps } = props;

  return (
    <ScrollWrapper>
      <RACTable
        {...restProps}
        className={cx(className, 'group/table w-full min-w-fit')}
        data-variant={variant}
      >
        {children}
      </RACTable>
    </ScrollWrapper>
  );
}

/**
 * Container that enables column resizing and horizontal scrolling for the
 * nested <Table>. Use when you want resizable columns or want to apply
 * `maxWidth`/`minWidth` truncation on columns.
 */
function ResizableTableContainer({
  className,
  children,
  ...restProps
}: ResizableTableContainerProps) {
  return (
    <_ResizableTableContainerContext.Provider
      value={{
        resizableProps: {
          ...restProps,
          className: cx(
            className,
            '**:data-[slot=table-column]:overflow-hidden **:data-[slot=table-column]:text-ellipsis',
            '**:data-[slot=table-cell]:overflow-hidden **:data-[slot=table-cell]:text-ellipsis',
          ),
        },
      }}
    >
      {children}
    </_ResizableTableContainerContext.Provider>
  );
}

/**
 * Container for table column headers.
 */
function TableHeader({ className, children, ...restProps }: TableHeaderProps) {
  return (
    <RACTableHeader {...restProps} className={cx(className, 'border-b border-black')}>
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
        'px-4 py-3 text-left text-sm font-medium text-black',
        'data-focus-visible:outline-focus-inset',
        '[&_:not([data-slot="table-column-resizer"]):focus-visible]:outline-focus-offset',
        'min-w-fit whitespace-nowrap',
        'has-data-[slot=table-column-resizer]:*:data-[slot=content]:flex has-data-[slot=table-column-resizer]:*:data-[slot=content]:justify-between has-data-[slot=table-column-resizer]:*:data-[slot=content]:gap-2',
      )}
      data-slot="table-column"
    >
      {children}
    </RACColumn>
  );
}

const TableColumnResizer = ({ className, ...restProps }: TableColumnResizerProps) => (
  <RACColumnResizer
    {...restProps}
    className={cx(
      className,
      '-my-3 -mr-4.5 size-11 flex-none',
      'cursor-ew-resize',
      'relative after:absolute after:inset-y-2 after:right-5 after:w-px after:bg-black',
      'data-focused:after:outline-focus-offset',
    )}
    data-slot="table-column-resizer"
  />
);

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
        'px-4 py-3 text-sm/relaxed text-black',
        'min-w-fit whitespace-nowrap',
        'align-top',
        'data-focus-visible:outline-focus-inset',
        // When this cell is in the column designated by `treeColumn` and
        // its row has nested child rows, we render an expand/collapse button
        // (see composeRenderProps below). Use flex so the button lines up
        // nicely next to the cell content.
        'data-tree-column:flex data-tree-column:items-center data-tree-column:gap-2',
      )}
      data-slot="table-cell"
    >
      {composeRenderProps(children, (resolved, { isTreeColumn, hasChildItems }) => (
        <>
          {isTreeColumn && hasChildItems && (
            <Button
              slot="chevron"
              variant="tertiary"
              isIconOnly
              className="-my-1 group-data-expanded/row:[&_svg]:rotate-180"
            >
              <ChevronDown className="transition-transform duration-300 motion-reduce:transition-none" />
            </Button>
          )}
          {resolved}
        </>
      ))}
    </RACCell>
  );
}

// Deprecated aliases kept for backwards compatibility during the UNSAFE_ phase.
// Remove these once the Table component is stabilized and the UNSAFE_ prefix
// is dropped.
/** @deprecated Use `UNSAFE_ResizableTableContainer` instead. */
const UNSAFE_TableContainer = ResizableTableContainer;
/** @deprecated Use `UNSAFE_ResizableTableContainerProps` instead. */
type UNSAFE_TableContainerProps = ResizableTableContainerProps;

export {
  TableColumnResizer as UNSAFE_TableColumnResizer,
  Table as UNSAFE_Table,
  TableBody as UNSAFE_TableBody,
  TableCell as UNSAFE_TableCell,
  TableColumn as UNSAFE_TableColumn,
  ResizableTableContainer as UNSAFE_ResizableTableContainer,
  UNSAFE_TableContainer,
  TableHeader as UNSAFE_TableHeader,
  TableRow as UNSAFE_TableRow,
  type TableColumnResizerProps as UNSAFE_TableColumnResizerProps,
  type TableBodyProps as UNSAFE_TableBodyProps,
  type TableCellProps as UNSAFE_TableCellProps,
  type TableColumnProps as UNSAFE_TableColumnProps,
  type ResizableTableContainerProps as UNSAFE_ResizableTableContainerProps,
  type UNSAFE_TableContainerProps,
  type TableHeaderProps as UNSAFE_TableHeaderProps,
  type TableProps as UNSAFE_TableProps,
  type TableRowProps as UNSAFE_TableRowProps,
};
